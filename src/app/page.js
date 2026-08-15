"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get("/api/pets");
        setFeaturedPets(res.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch pets", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
            >
              Find Your Perfect <span className="text-orange-500">Furry Friend</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-700 mb-8 max-w-lg"
            >
              Give a pet a second chance at happiness. Adopt a rescue animal today and bring unconditional love into your home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/pets" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1 inline-block">
                Adopt Now
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 z-10 relative">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Happy dog" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Pets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet some of our adorable animals waiting for their forever homes. Every adoption makes a difference.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
              <motion.div 
                key={pet._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition-shadow"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={pet.imageUrl} alt={pet.petName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {pet.species}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{pet.petName}</h3>
                    <span className="text-orange-500 font-bold">${pet.adoptionFee}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-6 flex-grow space-y-1">
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px]">🐾</span> {pet.breed}</p>
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px]">📅</span> {pet.age} years old</p>
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px]">📍</span> {pet.location}</p>
                  </div>
                  <Link href={`/pets/${pet._id}`} className="block w-full text-center bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {featuredPets.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-96 w-full"></div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/pets" className="inline-block bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full transition-colors shadow-sm">
              View All Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-orange-200 transform translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pet care" className="rounded-2xl shadow-lg w-full object-cover h-[400px]" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Adopt a Pet?</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Save a life</h4>
                    <p className="text-gray-600 mt-1">Every year, millions of adoptable dogs and cats are euthanized. You can save a life by adopting.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Unconditional love</h4>
                    <p className="text-gray-600 mt-1">Pets provide endless affection and companionship, improving your mental and physical health.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">Stop cruel breeding</h4>
                    <p className="text-gray-600 mt-1">Adopting helps fight puppy mills and unethical breeding facilities by reducing demand.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
