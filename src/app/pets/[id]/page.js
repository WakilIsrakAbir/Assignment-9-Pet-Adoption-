"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function PetDetails() {
  const params = useParams();
  const { id } = params;
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  // Form State
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPet = async () => {
      try {
        const res = await axios.get(`/api/pets/${id}`);
        setPet(res.data);
      } catch (error) {
        toast.error("Failed to load pet details");
        router.push("/pets");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id, router]);

  const handleAdoptClick = () => {
    if (!user) {
      toast.error("Please login to adopt a pet");
      router.push("/login");
      return;
    }
    if (user.email === pet.ownerEmail) {
      toast.error("You cannot adopt your own pet");
      return;
    }
    setIsModalOpen(true);
  };

  const submitAdoption = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/requests", {
        petId: pet._id,
        pickupDate,
        message,
        ownerEmail: pet.ownerEmail
      });
      toast.success("Adoption request submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
    </div>
  );

  if (!pet) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/pets" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 font-medium">
          ← Back to all pets
        </Link>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 h-[400px] md:h-auto relative">
            <img src={pet.imageUrl} alt={pet.petName} className="w-full h-full object-cover" />
            {pet.status === "adopted" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-6 py-3 rounded-lg text-2xl font-bold transform -rotate-12 border-4 border-white shadow-xl">ADOPTED</span>
              </div>
            )}
          </div>
          
          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{pet.petName}</h1>
                <div className="flex gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">{pet.species}</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">{pet.gender}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Adoption Fee</p>
                <p className="text-3xl font-black text-orange-500">${pet.adoptionFee}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div><span className="font-semibold block text-gray-900 text-sm">Age</span> {pet.age} years</div>
              <div><span className="font-semibold block text-gray-900 text-sm">Breed</span> {pet.breed}</div>
              <div><span className="font-semibold block text-gray-900 text-sm">Health</span> {pet.healthStatus}</div>
              <div><span className="font-semibold block text-gray-900 text-sm">Vaccination</span> {pet.vaccinationStatus}</div>
              <div className="col-span-2"><span className="font-semibold block text-gray-900 text-sm">Location</span> {pet.location}</div>
            </div>

            <div className="mb-8 flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {pet.petName}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{pet.description}</p>
            </div>

            <div className="mt-auto">
              {pet.status === "available" ? (
                <button 
                  onClick={handleAdoptClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 text-lg"
                >
                  Adopt {pet.petName} Now
                </button>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-4 px-8 rounded-xl cursor-not-allowed text-lg">
                  Already Adopted
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="bg-orange-500 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">Adoption Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={submitAdoption} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
                <input type="text" value={pet.petName} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" value={user?.name || ""} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input type="email" value={user?.email || ""} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                <input 
                  type="date" 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message to Owner (Optional)</label>
                <textarea 
                  rows="3" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Why would you be a great owner for this pet?"
                ></textarea>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-md cursor-pointer">
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
