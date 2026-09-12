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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop: Lighter shadow in light mode, darker in dark mode */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm animate-[fadeIn_150ms_ease-out]" />

      {/* Card: Tighter max-width to match the compact square-like proportion of the image */}
      <div className="relative w-full max-w-[320px] rounded-2xl bg-white dark:bg-[#262426] p-10 shadow-2xl animate-[popIn_180ms_ease-out] flex flex-col items-center text-center transition-colors duration-300">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/Aib-logo.png"
            alt="AIB Logo"
            className="h-14 w-14 object-contain"
          />
        </div>

        {/* Spinner: Adjusted strokeWidth to 2 for the thin look in the reference image */}
        <div className="mb-6">
          <svg
            className="animate-spin h-10 w-10 text-gray-800 dark:text-white"
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
              strokeWidth="2"
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
          className="text-[14px] font-medium text-gray-900 dark:text-white tracking-wide"
        >
          Authenticating your phone
        </h2>

        {/* Device specific subtext */}
        <p className="mt-4 text-[12px] text-gray-500 dark:text-[#a1a1aa] leading-snug">
          Request sent to:
          <br />
          <span className="text-gray-800 dark:text-[#e4e4e7] font-medium">
            Your Device
          </span>
        </p>
      </div>
    </div>
  );
}
