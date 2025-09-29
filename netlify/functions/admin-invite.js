// netlify/functions/admin-invite.js
const { getServiceClient, getUserFromRequest } = require("./_supabase");

function json(body, status = 200) {
  return { statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

exports.handler = async (req) => {
  if (req.httpMethod !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  try {
    const actor = await getUserFromRequest(req);
    if (!actor) return json({ ok: false, error: "Unauthorized" }, 401);

    const { email, org_id = null, role, expires_days = 7 } = JSON.parse(req.body || "{}");
    if (!email || !role) return json({ ok: false, error: "email and role are required" }, 400);

    const svc = getServiceClient();

    // --- Authorize actor ---
    // Is platform admin?
    const { data: isAdminData } = await svc.rpc("is_platform_admin", { uid: actor.id });
    const isPlatformAdmin = !!isAdminData;

    let allowed = false;
    if (isPlatformAdmin) {
      allowed = true;
    } else if (org_id) {
      // Check if actor is owner/manager in that org
      const { data: mem } = await svc
        .from("org_members")
        .select("role")
        .eq("org_id", org_id)
        .eq("user_id", actor.id)
        .maybeSingle();

      const actorRole = mem?.role || null;
      // owners can invite owner/manager/employee/viewer; managers -> employee/viewer
      const canInvite =
        (actorRole === "owner" && ["owner","manager","employee","viewer"].includes(role)) ||
        (actorRole === "manager" && ["employee","viewer"].includes(role));

      allowed = !!canInvite;
    }

    if (!allowed) return json({ ok: false, error: "Forbidden" }, 403);

    // --- Generate Supabase invite link ---
    const { data: linkData, error: linkErr } = await svc.auth.admin.generateLink({
      type: "invite",
      email,
      options: {
        // Pass metadata we’ll need after accept
        data: { org_id, role },
        redirectTo: `${process.env.PUBLIC_SITE_URL || "http://localhost:5173"}/accept-invite`
      }
    });
    if (linkErr) return json({ ok: false, error: linkErr.message }, 500);

    const action_link = linkData?.properties?.action_link || linkData?.action_link || null;
    if (!action_link) return json({ ok: false, error: "No action_link from Supabase" }, 500);

    // --- Store invitation row ---
    const expires_at = new Date(Date.now() + (expires_days || 7) * 24 * 3600 * 1000).toISOString();
    const { data: invite, error: invErr } = await svc
      .from("invitations")
      .insert({
        org_id,
        email: email.toLowerCase(),
        role,
        invited_by: actor.id,
        action_link,
        expires_at
      })
      .select("*")
      .single();

    if (invErr) return json({ ok: false, error: invErr.message }, 500);

    // If SMTP is configured in Supabase, the invite email may already be sent.
    // Otherwise, you can surface action_link in the UI (mock now).
    return json({ ok: true, invitation: invite });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
};
