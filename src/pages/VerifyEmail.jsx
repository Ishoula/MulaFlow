import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/authApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const emailParam = searchParams.get("email") || "";
  const tokenParam = searchParams.get("token");

  const handleVerify = async (token) => {
    try {
      setStatus("loading");
      const res = await verifyEmail(token);

      if (res.status >= 200 && res.status < 300) {
        setStatus("success");
        setMessage("Email verified successfully!");
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to verify email. The link may have expired."
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tokenParam) {
        handleVerify(tokenParam);
      } else if (emailParam) {
        setStatus("waiting");
      } else {
        setStatus("error");
        setMessage("Invalid verification link.");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [tokenParam, emailParam]);

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <button
          className="auth-brand"
          type="button"
          onClick={() => navigate("/")}
        >
          <span>M</span>
          MulaFlow
        </button>

        <div className="auth-copy">
          <p className="auth-kicker">Email verification</p>
          <h1>Confirm your email</h1>
          <p>
            Verify your email address to complete your MulaFlow account setup and start tracking expenses.
          </p>
        </div>
      </section>

      <main className="auth-form-wrap">
        <div className="auth-form">
          <div className="auth-form-header">
            <p className="auth-kicker">Verification</p>
            <h2>Verify your email</h2>
          </div>

          {status === "loading" && (
            <div className="flex flex-col items-center py-8">
              <Skeleton />
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-800 font-medium mb-6">{message}</p>
              <button
                className="auth-submit"
                onClick={() => navigate("/login")}
              >
                Continue to login
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col py-4">
              {message && <div className="error-banner mb-4">{message}</div>}

              <p className="auth-switch mt-4">
                Remember your email is already verified?
                <button type="button" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </p>
            </div>
          )}

          {status === "waiting" && (
            <div className="flex flex-col py-4">
              <p className="text-gray-700 mb-6">
                We've sent a verification email to <strong>{emailParam}</strong>. Please check your inbox and click the verification link.
              </p>

              {message && <div className="error-banner mb-4">{message}</div>}

              <p className="auth-switch mt-4">
                Already verified?
                <button type="button" onClick={() => navigate("/login")}>
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
