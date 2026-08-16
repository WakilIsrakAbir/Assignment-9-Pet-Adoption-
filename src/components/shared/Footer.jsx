import Link from "next/link";
import { MdPets, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-orange-100 p-1.5 rounded-lg">
                <MdPets className="text-orange-500" size={24} />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Pet<span className="text-orange-500">Adopt</span></span>
            </Link>
            <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Connecting loving families with pets in need. Adopt, don&apos;t shop! Give a pet a second chance at happiness.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-orange-50 hover:text-orange-500 transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors">Home</Link></li>
              <li><Link href="/pets" className="text-gray-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors">All Pets</Link></li>
              <li><Link href="/login" className="text-gray-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors">Login</Link></li>
              <li><Link href="/register" className="text-gray-500 dark:text-slate-400 hover:text-orange-500 text-sm transition-colors">Register</Link></li>
            </ul>
          </div>



          <div className="col-span-1">
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdLocationOn className="text-orange-500 shrink-0 mt-0.5" size={18} />
                <span className="text-gray-500 dark:text-slate-400 text-sm">315 / 5 East Nakhalpara, Tejgaon, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-500 dark:text-slate-400 text-sm">+8801849846805</span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-500 dark:text-slate-400 text-sm">wakilisrakabir@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-500 dark:text-slate-400 text-sm text-center w-full">
            © {new Date().getFullYear()} PetAdopt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
