"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function AddPet() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    species: "Dog",
    breed: "",
    age: "",
    gender: "Male",
    imageUrl: "",
    healthStatus: "Healthy",
    vaccinationStatus: "Vaccinated",
    location: "",
    adoptionFee: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/pets", {
        ...formData,
        age: Number(formData.age),
        adoptionFee: Number(formData.adoptionFee),
      });
      toast.success("Pet added successfully!");
      router.push("/dashboard/my-listings");
    } catch (error) {
      toast.error("Failed to add pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-slate-800 pb-2">Add a New Pet</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Pet Name</label>
            <input type="text" name="petName" required value={formData.petName} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Species</label>
            <select name="species" value={formData.species} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer transition-colors">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Breed</label>
            <input type="text" name="breed" required value={formData.breed} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Age (Years)</label>
            <input type="number" name="age" required min="0" step="0.1" value={formData.age} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer transition-colors">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Image URL</label>
            <input type="url" name="imageUrl" required value={formData.imageUrl} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Health Status</label>
            <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer transition-colors">
              <option value="Healthy">Healthy</option>
              <option value="Needs Special Care">Needs Special Care</option>
              <option value="Injured">Injured</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Vaccination Status</label>
            <select name="vaccinationStatus" value={formData.vaccinationStatus} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer transition-colors">
              <option value="Vaccinated">Vaccinated</option>
              <option value="Partially Vaccinated">Partially Vaccinated</option>
              <option value="Not Vaccinated">Not Vaccinated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Location (City, Country)</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Adoption Fee ($)</label>
            <input type="number" name="adoptionFee" required min="0" value={formData.adoptionFee} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Owner Email</label>
            <input type="email" value={user?.email || ""} readOnly className="w-full bg-gray-100 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 text-gray-500 dark:text-slate-400 focus:outline-none cursor-not-allowed transition-colors" />
          </div>
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
            <textarea name="description" required rows="2" value={formData.description} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors" placeholder="Tell us about the pet's personality..."></textarea>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full mt-2 bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg shadow hover:bg-orange-600 transition disabled:bg-orange-300 cursor-pointer">
          {loading ? "Adding Pet..." : "Add Pet Listing"}
        </button>
      </form>
    </div>
  );
}
