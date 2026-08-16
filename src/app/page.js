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
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 dark:from-slate-900 dark:to-slate-800 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4"
            >
              Find Your Perfect <span className="text-orange-500">Furry Friend</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-700 dark:text-slate-300 mb-8 max-w-lg"
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
              src="/hero.webp" 
              alt="Happy dog" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Pets</h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">Meet some of our adorable animals waiting for their forever homes. Every adoption makes a difference.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPets.map((pet) => (
                <motion.div 
                key={pet._id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-800 flex flex-col hover:shadow-xl dark:hover:shadow-slate-800/50 transition-shadow"
              >
                <div className="h-56 overflow-hidden relative">
                  <img src={pet.imageUrl} alt={pet.petName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-orange-600 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {pet.species}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{pet.petName}</h3>
                    <span className="text-orange-500 font-bold">${pet.adoptionFee}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400 mb-6 flex-grow space-y-1">
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-[10px]">🐾</span> {pet.breed}</p>
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-[10px]">📅</span> {pet.age} years old</p>
                    <p className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-[10px]">📍</span> {pet.location}</p>
                  </div>
                  <Link href={`/pets/${pet._id}`} className="block w-full text-center bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {featuredPets.length === 0 && (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-gray-100 dark:bg-slate-800 rounded-xl h-96 w-full"></div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/pets" className="inline-block bg-white dark:bg-slate-900 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-full transition-colors shadow-sm">
              View All Pets
            </Link>
          </div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-orange-200 dark:bg-orange-900/30 transform translate-x-4 translate-y-4 rounded-2xl -z-10"></div>
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Pet care" className="rounded-2xl shadow-lg w-full object-cover h-[400px]" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Adopt a Pet?</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Save a life</h4>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">Every year, millions of adoptable dogs and cats are euthanized. You can save a life by adopting.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Unconditional love</h4>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">Pets provide endless affection and companionship, improving your mental and physical health.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mt-1 font-bold text-lg">✓</div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Stop cruel breeding</h4>
                    <p className="text-gray-600 dark:text-slate-400 mt-1">Adopting helps fight puppy mills and unethical breeding facilities by reducing demand.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Success Stories Section */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Happy Tails: Success Stories</h2>
          <p className="text-gray-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">See how adoption has transformed the lives of pets and their new families.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                quote: "Adopting Bella was the best decision our family ever made. She brings so much joy and laughter into our home every single day!",
                family: "The Smith Family",
                pet: "Adopted Bella (Dog)"
              },
              {
                id: 2,
                quote: "We were looking for a companion and found Whiskers. He is such a sweet cat and has completely stolen our hearts. Thank you!",
                family: "The Johnson Family",
                pet: "Adopted Whiskers (Cat)"
              },
              {
                id: 3,
                quote: "Max has been a wonderful addition to our lives. The adoption process was so smooth and we couldn't be happier with our new best friend.",
                family: "The Williams Family",
                pet: "Adopted Max (Dog)"
              }
            ].map((story) => (
              <div key={story.id} className="bg-orange-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-orange-100 dark:border-slate-800 text-left transition-colors">
                <p className="italic text-gray-700 dark:text-slate-300 mb-4">&quot;{story.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-200 dark:bg-orange-900/50 flex items-center justify-center text-xl">
                    {story.family.charAt(4)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{story.family}</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{story.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Essential Pet Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Nutrition', 'Exercise', 'Grooming', 'Vet Visits'].map((tip, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">{idx + 1}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tip}</h4>
                <p className="text-gray-600 dark:text-slate-400 text-sm">Ensure your pet stays healthy and happy with proper {tip.toLowerCase()} routines tailored to their specific needs and age.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (Custom 1) */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">How Adoption Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">1</div>
              <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Find Your Match</h4>
              <p className="text-gray-600 dark:text-slate-400">Browse our extensive list of available pets and find the one that steals your heart.</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-orange-200 dark:bg-orange-900/50 rounded"></div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">2</div>
              <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Send Request</h4>
              <p className="text-gray-600 dark:text-slate-400">Submit an adoption request with your details to show your interest in the pet.</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-orange-200 dark:bg-orange-900/50 rounded"></div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">3</div>
              <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Bring Them Home</h4>
              <p className="text-gray-600 dark:text-slate-400">Once approved, arrange a pickup date and welcome your new family member!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section (Custom 2) */}
      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Want to Help But Can&apos;t Adopt?</h2>
          <p className="text-lg md:text-xl text-orange-50 mb-8">Join our volunteer program and make a direct impact on the lives of rescue animals. We are always looking for passionate animal lovers to help out at our shelters.</p>
        </div>
      </section>
    </div>
  );
}
