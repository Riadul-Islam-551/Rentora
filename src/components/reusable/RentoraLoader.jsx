import React from "react";

export default function RentoraLoader({ text = "Finding your next home..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-80vh w-full p-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Spinning Ring */}
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>

        {/* Inner House Icon */}
        <div className="absolute text-emerald-600 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 11-1.06 1.06l-.92-.92V19a2.25 2.25 0 01-2.25 2.25H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V20.25a.75.75 0 01-.75.75H6.75A2.25 2.25 0 014.5 19v-6.33l-.92.92a.75.75 0 01-1.06-1.06l8.69-8.69z" />
          </svg>
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">
        {text}
      </p>
    </div>
  );
}
