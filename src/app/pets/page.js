"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/pets?";
      if (searchTerm) url += `name=${searchTerm}&`;
      if (selectedSpecies) url += `species=${selectedSpecies}&`;
      
      const res = await axios.get(url);
      setPets(res.data);
    } catch (error) {
      console.error("Failed to fetch pets", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedSpecies]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchPets();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchPets]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Your New Best Friend</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our list of lovable pets waiting for a forever home. Use the filters to find the perfect match for your family.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2 relative">
            <input 
              type="text" 
              placeholder="Search pets by name..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setSelectedSpecies("")}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${!selectedSpecies ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            {speciesOptions.map(species => (
              <button 
                key={species}
                onClick={() => setSelectedSpecies(species)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${selectedSpecies === species ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {species}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pets.map((pet, index) => (
              <motion.div 
                key={pet._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={pet.imageUrl} alt={pet.petName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {pet.species}
                  </div>
                  {pet.status === "adopted" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-md font-bold transform -rotate-12 border-2 border-white">ADOPTED</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{pet.petName}</h3>
                    <span className="text-orange-500 font-bold">${pet.adoptionFee}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4 flex-grow space-y-1 mt-2">
                    <p className="flex items-center gap-2"><span>🐾</span> {pet.breed}</p>
                    <p className="flex items-center gap-2"><span>📅</span> {pet.age} {pet.age === 1 ? 'year' : 'years'} old ({pet.gender})</p>
                    <p className="flex items-center gap-2"><span>📍</span> {pet.location}</p>
                  </div>
                  <Link 
                    href={`/pets/${pet._id}`} 
                    className="block w-full text-center bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-transparent font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">😿</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-500">We couldn&apos;t find any pets matching your criteria. Try adjusting your search or filters.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedSpecies(""); }}
              className="mt-6 text-orange-500 hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
