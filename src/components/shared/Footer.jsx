import Link from "next/link";
import { MdPets } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-500 mb-4">
              <MdPets size={28} />
              PetAdopt
            </Link>
            <p className="text-gray-400">
              Connecting loving families with pets in need. Adopt, don't shop!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link href="/pets" className="hover:text-orange-500 transition">All Pets</Link></li>
              <li><Link href="/login" className="hover:text-orange-500 transition">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">Email: info@petadopt.com</p>
            <p className="text-gray-400 mb-4">Phone: +1 234 567 890</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} PetAdopt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
