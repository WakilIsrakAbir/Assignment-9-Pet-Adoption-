"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get("/api/requests/my-requests");
      setRequests(res.data);
    } catch (error) {
      toast.error("Failed to load your requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchMyRequests();
  }, []);

  if (loading) return <div className="animate-pulse flex flex-col gap-4">
    <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-1/4 mb-4"></div>
    <div className="h-20 bg-gray-200 dark:bg-slate-800 rounded w-full mb-2"></div>
    <div className="h-20 bg-gray-200 dark:bg-slate-800 rounded w-full mb-2"></div>
  </div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-slate-800 pb-2">My Adoption Requests</h2>
      
      {requests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-300 dark:border-slate-700">
          <p className="text-gray-500 dark:text-slate-400 mb-4">You haven&apos;t requested to adopt any pets yet.</p>
          <Link href="/pets" className="text-orange-500 font-medium hover:underline border-2 border-orange-500 px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map(req => (
            <div key={req._id} className="bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{req.petId?.petName || "Unknown Pet"}</h3>
                <div className="text-sm text-gray-500 dark:text-slate-400 space-y-1">
                  <p><strong>Requested on:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
                  <p><strong>Proposed Pickup Date:</strong> {new Date(req.pickupDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase shadow-sm ${
                  req.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/50' :
                  req.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50' :
                  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50'
                }`}>
                  {req.status}
                </span>
                
                <Link href={`/pets/${req.petId?._id}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  View Pet Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
