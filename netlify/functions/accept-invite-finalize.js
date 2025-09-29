// netlify/functions/accept-invite-finalize.js
const { getServiceClient, getUserFromRequest } = require("./_supabase");

function json(body, status = 200) {
  return { statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}

exports.handler = async (req) => {
  if (req.httpMethod !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  try {
    const user = await getUserFromRequest(req);
    if (!user) return json({ ok: false, error: "Unauthorized" }, 401);

    const { invitation_id } = JSON.parse(req.body || "{}");
    if (!invitation_id) return json({ ok: false, error: "invitation_id required" }, 400);

    const svc = getServiceClient();

    // Load invitation
    const { data: inv, error: invErr } = await svc
      .from("invitations")
      .select("*")
      .eq("id", invitation_id)
      .single();

    if (invErr || !inv) return json({ ok: false, error: "Invite not found" }, 404);
    if (inv.status !== "pending") return json({ ok: false, error: "Invite not pending" }, 400);

    // Email must match invite
    if (inv.email.toLowerCase() !== (user.email || "").toLowerCase()) {
      return json({ ok: false, error: "Invite email mismatch" }, 400);
    }

    // Platform admin grant
    if (inv.role === "platform_admin") {
      await svc.from("platform_admins").insert({ user_id: user.id }).onConflict("user_id").ignore();
    }

    // Org membership
    if (inv.org_id) {
      // Upsert membership
      await svc
        .from("org_members")
        .upsert({ org_id: inv.org_id, user_id: user.id, role: inv.role }, { onConflict: "org_id,user_id" });
    }

    // Mark accepted
    await svc.from("invitations").update({ status: "accepted" }).eq("id", inv.id);

    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
};
