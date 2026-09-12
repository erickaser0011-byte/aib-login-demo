import { useEffect } from "react";

export default function Modal({ open }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]" />

      {/* Card matching the reference design */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#282427] p-8 shadow-2xl ring-1 ring-slate-700/80 animate-[popIn_180ms_ease-out] flex flex-col items-center text-center">
        {/* Logo at the top */}
        <div className="mb-6">
          <img
            src="/Aib_logo.jpeg"
            alt="AIB Logo"
            className="h-16 w-16 object-cover shadow-sm"
          />
        </div>

        {/* Big White Loading Ring */}
        <div className="my-4">
          <svg
            className="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {/* Authentication Status Text */}
        <h2
          id="modal-title"
          className="mt-2 text-base font-medium text-white tracking-wide"
        >
          Authenticating your phone
        </h2>

        <p className="mt-3 text-xs text-slate-400">
          Request sent to:
          <br />
          <span className="text-slate-300 font-medium">Your Device</span>
        </p>
      </div>
    </div>
  );
}
