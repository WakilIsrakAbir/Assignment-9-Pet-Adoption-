"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyListings() {
  const [pets, setPets] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsModal, setRequestsModal] = useState({ open: false, petId: null, requests: [] });
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const fetchMyPets = useCallback(async () => {
    try {
      const res = await axios.get("/api/pets");
      const myPets = res.data.filter(pet => pet.ownerEmail === user?.email);
      setPets(myPets);
      
      const reqRes = await axios.get("/api/requests/my-listings");
      setAllRequests(reqRes.data);
    } catch (error) {
      toast.error("Failed to load your listings or requests");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchMyPets();
  }, [user, fetchMyPets]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet listing?")) {
      try {
        await axios.delete(`/api/pets/${id}`);
        toast.success("Pet deleted successfully");
        fetchMyPets();
      } catch (error) {
        toast.error("Failed to delete pet");
      }
    }
  };

  const openRequestsModal = async (petId) => {
    try {
      const res = await axios.get("/api/requests/my-listings");
      const petRequests = res.data.filter(req => req.petId._id === petId);
      setRequestsModal({ open: true, petId, requests: petRequests });
    } catch (error) {
      toast.error("Failed to load requests");
    }
  };

  const handleRequestStatus = async (requestId, status) => {
    try {
      await axios.put(`/api/requests/${requestId}/status`, { status });
      toast.success(`Request ${status} successfully`);
      
      // Close modal if approved, since we don't want them approving others
      if (status === 'approved') {
        setRequestsModal({ ...requestsModal, open: false });
        fetchMyPets(); // Refresh to show adopted status and update request counts
      } else {
        // Just refresh requests list
        const res = await axios.get("/api/requests/my-listings");
        setAllRequests(res.data);
        const petRequests = res.data.filter(req => req.petId._id === requestsModal.petId);
        setRequestsModal({ ...requestsModal, requests: petRequests });
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="animate-pulse flex flex-col gap-4">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="h-40 bg-gray-200 rounded w-full"></div>
    <div className="h-40 bg-gray-200 rounded w-full"></div>
  </div>;

  const totalListings = pets.length;
  const available = pets.filter(p => p.status === 'available').length;
  const adopted = pets.filter(p => p.status === 'adopted').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">My Listings</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <p className="text-sm text-blue-600 font-bold uppercase">Total Listings</p>
          <p className="text-3xl font-black text-blue-800">{totalListings}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
          <p className="text-sm text-green-600 font-bold uppercase">Available</p>
          <p className="text-3xl font-black text-green-800">{available}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
          <p className="text-sm text-purple-600 font-bold uppercase">Adopted</p>
          <p className="text-3xl font-black text-purple-800">{adopted}</p>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">You haven't added any pets yet.</p>
          <Link href="/dashboard/add-pet" className="text-orange-500 font-medium hover:underline">Add your first pet listing</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 rounded-tl-lg">Pet Info</th>
                <th className="p-4">Status</th>
                <th className="p-4">Price</th>
                <th className="p-4 rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pets.map(pet => (
                <tr key={pet._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={pet.imageUrl} alt={pet.petName} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-gray-900">{pet.petName}</p>
                        <p className="text-xs text-gray-500">{pet.species} • {pet.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${pet.status === 'adopted' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {pet.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-700">${pet.adoptionFee}</td>
                  <td className="p-4 text-right space-x-2">
                    {(() => {
                      const pendingCount = allRequests.filter(req => req.petId?._id === pet._id && req.status === 'pending').length;
                      return (
                        <button 
                          onClick={() => openRequestsModal(pet._id)}
                          className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-orange-200 transition cursor-pointer relative"
                        >
                          Requests
                          {pendingCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                              {pendingCount}
                            </span>
                          )}
                        </button>
                      );
                    })()}
                    <Link href={`/dashboard/update-pet/${pet._id}`} className="bg-green-100 text-green-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-green-200 transition">
                      Edit
                    </Link>
                    <Link href={`/pets/${pet._id}`} className="inline-block bg-blue-100 text-blue-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-200 transition">View</Link>
                    <button 
                      onClick={() => handleDelete(pet._id)}
                      className="bg-red-100 text-red-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-200 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Requests Modal */}
      {requestsModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[80vh] flex flex-col">
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Adoption Requests</h3>
              <button onClick={() => setRequestsModal({ ...requestsModal, open: false })} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {requestsModal.requests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No requests found for this pet yet.</p>
              ) : (
                <div className="space-y-4">
                  {requestsModal.requests.map(req => (
                    <div key={req._id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div>
                        <p className="font-bold text-gray-900">{req.requesterName}</p>
                        <p className="text-sm text-gray-500 mb-1">{req.requesterEmail}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Pickup:</span> {new Date(req.pickupDate).toLocaleDateString()}</p>
                        {req.message && <p className="text-sm text-gray-600 mt-2 italic">&quot;{req.message}&quot;</p>}
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          req.status === 'approved' ? 'bg-green-100 text-green-700' :
                          req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {req.status}
                        </span>
                        
                        {req.status === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button 
                              onClick={() => handleRequestStatus(req._id, 'approved')}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold hover:bg-green-200 transition cursor-pointer"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRequestStatus(req._id, 'rejected')}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold hover:bg-red-200 transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
