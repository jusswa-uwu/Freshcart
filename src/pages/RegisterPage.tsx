import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TextField from "../components/TextField.tsx";
import PasswordField from "../components/PasswordField";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRe = /^(09\d{9}|\+639\d{9})$/; // 09xx xxx xxxx or +639xx xxx xxxx

type Field = "fullName" | "email" | "mobile" | "password" | "confirm" | "agree";
type Errors = Partial<Record<Field, string>>;

function passwordScore(pw: string) {
  return [
    pw.length >= 8,
    /\d/.test(pw),
    /[A-Z]/.test(pw),
    /[^A-Za-z0-9]/.test(pw),
  ].filter(Boolean).length;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [seconds, setSeconds] = useState(30);

  const cleanMobile = mobile.replace(/[\s-]/g, "");
  const score = passwordScore(password);

  // Resend-code countdown on the verify step
  useEffect(() => {
    if (step !== "verify" || seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, seconds]);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    const next: Errors = {};
    if (fullName.trim().length < 2) next.fullName = "Enter your full name.";
    if (!emailRe.test(email)) next.email = "Enter a valid email address.";
    if (!mobileRe.test(cleanMobile))
      next.mobile =
        "Use a Philippine mobile number, like 0917 123 4567 or +63 917 123 4567.";
    if (password.length < 8 || !/\d/.test(password))
      next.password = "Use at least 8 characters, including a number.";
    if (confirm !== password) next.confirm = "Passwords don’t match.";
    if (!agree)
      next.agree = "Please accept the Terms & Conditions to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      // TODO: POST /api/auth/register { fullName, email, mobile: cleanMobile, password }
      // The server should reject a duplicate email (HTTP 409) and send the SMS code.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSeconds(30);
      setStep("verify");
    } catch {
      setErrors({ email: "An account with this email already exists." });
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setCodeError("Enter the 6-digit code we sent you.");
      return;
    }
    setCodeError("");
    setLoading(true);
    try {
      // TODO: POST /api/auth/verify-mobile { mobile: cleanMobile, code }
      await new Promise((resolve) => setTimeout(resolve, 600));
      navigate("/");
    } catch {
      setCodeError("That code didn’t work. Check it and try again.");
    } finally {
      setLoading(false);
    }
  }

  function resend() {
    // TODO: POST /api/auth/resend-code { mobile: cleanMobile }
    setSeconds(30);
  }

  /* ---------- Step 2: verify mobile number ---------- */
  if (step === "verify") {
    return (
      <>
        <h1 className="text-4xl font-bold tracking-tight">Check your phone.</h1>
        <p className="mt-2 text-muted">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-ink">
            ••••••{cleanMobile.slice(-3)}
          </span>
          .
        </p>

        <form
          onSubmit={handleVerify}
          noValidate
          className="mt-8 space-y-5 rounded-2xl border border-line bg-white p-8"
        >
          <TextField
            label="Verification code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className="text-center text-xl tracking-[0.5em]"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            error={codeError}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
          >
            {loading ? (
              "Verifying…"
            ) : (
              <>
                Verify and continue <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="font-semibold text-brand hover:underline"
            >
              Use a different number
            </button>
            {seconds > 0 ? (
              <span className="text-muted">Resend in {seconds}s</span>
            ) : (
              <button
                type="button"
                onClick={resend}
                className="font-semibold text-brand hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        </form>
      </>
    );
  }

  /* ---------- Step 1: create account ---------- */
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight">
        Create your account.
      </h1>
      <p className="mt-2 text-muted">
        Fresh groceries, delivered when it suits you.
      </p>

      <form
        onSubmit={handleRegister}
        noValidate
        className="mt-8 space-y-5 rounded-2xl border border-line bg-white p-8"
      >
        <TextField
          label="Full name"
          autoComplete="name"
          placeholder="Alex Reyes"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
        />

        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <TextField
          label="Mobile number"
          type="tel"
          autoComplete="tel"
          placeholder="0917 123 4567"
          hint="We’ll text a code to confirm it, and send order updates here."
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          error={errors.mobile}
        />

        <div>
          <PasswordField
            label="Password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          {password && (
            <div className="mt-2 flex items-center gap-3" aria-live="polite">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i <= score ? "bg-brand" : "bg-line"}`}
                  />
                ))}
              </div>
              <span className="w-12 text-xs text-muted">
                {["", "Weak", "Fair", "Good", "Strong"][score]}
              </span>
            </div>
          )}
        </div>

        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 size-4 accent-brand"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-semibold text-brand hover:underline">
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-brand hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.agree && (
            <p className="mt-1.5 text-xs text-[#b42318]">{errors.agree}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60"
        >
          {loading ? (
            "Creating account…"
          ) : (
            <>
              Create account <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
