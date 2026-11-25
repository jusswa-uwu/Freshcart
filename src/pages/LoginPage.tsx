import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TextField from "../components/TextField.tsx";
import PasswordField from "../components/PasswordField";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const next: typeof errors = {};
    if (!emailRe.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      // TODO: replace with POST /api/auth/login { email, password, remember }
      // and store the returned token (HttpOnly cookie is safest).
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log({ email, remember });
      navigate("/");
    } catch {
      setServerError(
        "We couldn’t sign you in. Check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">Welcome back.</h1>
      <p className="mt-2 text-muted">Sign in to keep shopping fresh.</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-5 rounded-2xl border border-line bg-white p-8"
      >
        {serverError && (
          <div
            role="alert"
            className="rounded-lg bg-[#fdecea] px-4 py-3 text-sm text-[#b42318]"
          >
            {serverError}
          </div>
        )}

        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 accent-brand"
            />
            Keep me signed in
          </label>
          <a href="#" className="font-semibold text-brand hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
        >
          {loading ? (
            "Signing in…"
          ) : (
            <>
              Sign in <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        New to FreshCart?{" "}
        <Link
          to="/register"
          className="font-semibold text-brand hover:underline"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
