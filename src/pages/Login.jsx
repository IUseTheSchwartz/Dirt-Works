import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block bg-[linear-gradient(135deg,#0F1115,30%,#23262B)] p-10">
        <div className="text-2xl font-bold">
          Dirt <span className="text-accent">Workz</span>
        </div>
        <div className="mt-24">
          <h1 className="text-4xl font-extrabold leading-tight">Move more metal.</h1>
          <p className="mt-3 text-white/70">
            Fast, focused CRM for dirt bikes, side-by-sides, and sport bikes.
          </p>
        </div>
      </div>

      <div className="p-10 flex items-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold">Log in</h2>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e)=>{e.preventDefault(); navigate("/app");}}
          >
            <div>
              <div className="label">Email</div>
              <input type="email" className="input" />
            </div>
            <div>
              <div className="label">Password</div>
              <input type="password" className="input" />
            </div>
            <button className="btn w-full">Log In</button>
            <div className="text-sm text-white/60 flex justify-between">
              <a href="#" className="hover:underline">Forgot password?</a>
              <Link to="/demo" className="hover:underline">Request a Demo</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
