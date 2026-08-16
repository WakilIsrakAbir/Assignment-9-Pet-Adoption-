export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">

        <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>

        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center text-orange-500 text-3xl">
          🐾
        </div>
      </div>
      <p className="mt-4 text-orange-600 font-bold animate-pulse">
        Loading amazing pets...
      </p>
    </div>
  );
}
