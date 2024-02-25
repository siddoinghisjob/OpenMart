export default function E404() {
  return (
    <div className="bg-slate-900 text-white flex-1 flex justify-center items-center h-full w-full">
      <div className="w-full h-full grid place-items-center">
        <svg
          className="text-red-600 h-32 w-32"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <div className="w-full h-full font-sans text-2xl text-center font-semibold">
          Page you are looking for does&apos;nt exist.
        </div>
      </div>
    </div>
  );
}
