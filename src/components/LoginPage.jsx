import { useState } from "react";
import Spinner from "./Spinner";
import Modal from "./Modal";

function validate({ registrationNumber, password }) {
  const errors = {};

  const cleanRegNo = registrationNumber.trim();
  if (!cleanRegNo) {
    errors.registrationNumber = "Please enter your registration number.";
  } else if (!/^[A-Za-z0-9\-_]{4,20}$/.test(cleanRegNo)) {
    errors.registrationNumber = "Please enter a valid registration number.";
  }

  if (!password) {
    errors.password = "Please enter your PAC.";
  } else if (password.length < 5) {
    errors.password = "PAC must be at least 5 characters.";
  }

  return errors;
}

export default function LoginPage() {
  const [form, setForm] = useState({ registrationNumber: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationNumber: form.registrationNumber,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowModal(true);
      } else {
        alert("Failed to clock in. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error connecting to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#282427] sm:bg-black flex flex-col items-center justify-center p-0 sm:p-6 text-slate-100">
      {/* 
        Container adjustments:
        - Mobile: p-4 px-3 (tight horizontal spacing so fields stretch almost edge-to-edge)
        - Desktop (sm:): increased vertical padding (sm:py-16) to make the card height taller, and side-by-side buttons 
      */}
      <div className="w-full sm:max-w-md bg-[#282427] sm:rounded-xl p-4 sm:px-8 sm:py-16 sm:shadow-2xl flex flex-col justify-between min-h-screen sm:min-h-0">
        <div className="w-full">
          {/* Logo untouched */}
          <div className="flex flex-col items-center text-center mb-6 pt-6 sm:pt-0">
            <img
              src="/Aib_logo.jpeg"
              alt="AIB Logo"
              className="h-20 w-20 object-cover mb-5"
            />
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Log in
            </h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-sm font-normal text-slate-300 mb-1.5"
              >
                Registration number*
              </label>
              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                autoComplete="username"
                value={form.registrationNumber}
                onChange={handleChange}
                disabled={loading}
                className={`w-full rounded-lg border bg-[#2b2a2e] px-3.5 py-3 text-white placeholder-slate-500 shadow-inner outline-none transition
                focus:ring-2 focus:ring-[#02856A]/40 focus:border-[#02856A] disabled:opacity-50
                ${
                  errors.registrationNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-700/60"
                }`}
              />
              {errors.registrationNumber && (
                <p className="mt-1.5 text-sm text-red-400">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-normal text-slate-300 mb-1.5"
              >
                5-digit Personal Access Code (PAC)*
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full rounded-lg border bg-[#2b2a2e] px-3.5 py-3 pr-12 text-white placeholder-slate-500 shadow-inner outline-none transition
                  focus:ring-2 focus:ring-[#02856A]/40 focus:border-[#02856A] disabled:opacity-50
                  ${
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-700/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={loading}
                  className="absolute inset-y-0 right-0 px-3.5 flex items-center text-slate-400 hover:text-slate-200 disabled:opacity-50 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Buttons: Stacked on mobile (Login top, Cancel bottom), side-by-side on desktop */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row-reverse sm:gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#02856A] px-4 py-3 text-base font-semibold text-white shadow-sm
                hover:bg-[#027056] focus:outline-none focus:ring-2 focus:ring-[#02856A] focus:ring-offset-2 focus:ring-offset-[#282427]
                disabled:cursor-not-allowed disabled:opacity-70 transition"
              >
                {loading ? (
                  <>
                    <Spinner className="h-5 w-5" />
                    Logging in…
                  </>
                ) : (
                  "Log in"
                )}
              </button>

              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="w-full sm:w-1/2 rounded-lg bg-[#3a393e] px-4 py-3 text-base font-semibold text-slate-200 shadow-sm hover:bg-[#45444a] transition"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button
              type="button"
              className="text-sm font-medium text-[#f472b6] hover:underline underline"
              onClick={(e) => e.preventDefault()}
            >
              Trouble logging in?
            </button>
          </div>
        </div>

        <div className="mt-8 pb-6 sm:pb-0 text-center text-xs text-slate-400 space-x-2">
          <a
            href="#terms"
            onClick={(e) => e.preventDefault()}
            className="underline hover:text-slate-200"
          >
            Terms
          </a>
          <span>|</span>
          <a
            href="#help"
            onClick={(e) => e.preventDefault()}
            className="underline hover:text-slate-200"
          >
            Help
          </a>
        </div>
      </div>

      <Modal open={showModal} />
    </main>
  );
}
