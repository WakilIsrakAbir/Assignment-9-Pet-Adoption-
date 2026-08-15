import Link from "next/link";
import { MdPets } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <MdPets className="text-orange-500 mb-6 opacity-20" size={120} />
      <h1 className="text-6xl font-black text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Oops! Looks like this pet wandered off...</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved. 
      </p>
      <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
        Back to Home
      </Link>
    </div>
  );
}
