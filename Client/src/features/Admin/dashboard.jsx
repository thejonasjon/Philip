import React, { useEffect, useState } from "react";
import {
  AdminDeleteTestimony,
  AdminFetchTestimonies,
  AdminUpdateTestimony,
  FetchStatus,
  FetchTestimonies,
} from "../../services/api";
import { supabase } from "../../supabaseClient";

export default function AdminDashboard() {
  const [testimonies, setTestimonies] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await FetchStatus();
        setStatuses(data);
      } catch (error) {
        console.error("Failed to fetch status", error.message);
      }
    }
    loadStatus();
  }, []);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await AdminFetchTestimonies();
        setTestimonies(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openDeleteModal = (testimony) => {
    setSelectedToDelete(testimony);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedToDelete(null);
    setShowDeleteModal(false);
  };

  const handleQuickStatusChange = async (testimony, statusName) => {
    try {
      const statusObj = statuses.find((s) => s.name === statusName);

      if (!statusObj) return;

      const updated = await AdminUpdateTestimony(testimony.id, {
        status: statusObj.id,
      });

      setTestimonies((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t)),
      );
    } catch (err) {
      console.error("Status update failed", err.message);
    }
  };

  const openEditModal = (testimony) => {
    setSelectedTestimony({ ...testimony });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTestimony(null);
  };

  const handleSaveEdit = async (updatedTestimony) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session) {
      alert("You must be logged in to update this record.");
      navigate("/login");
      return;
    }

    try {
      const updated = await AdminUpdateTestimony(updatedTestimony.id, {
        full_name: updatedTestimony.full_name,
        email: updatedTestimony.email,
        profession: updatedTestimony.profession,
        country: updatedTestimony.country,
        message: updatedTestimony.message,
        status: updatedTestimony.status,
      });

      setTestimonies((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t)),
      );
      closeModal();
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const handleDelete = async (testimony) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${testimony.full_name}"?`,
    );

    if (!confirmDelete) return;

    try {
      await AdminDeleteTestimony(testimony.id);

      setTestimonies((prev) => prev.filter((t) => t.id !== testimony.id));
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete testimony");
    }
  };

  const confirmDelete = async () => {
    if (!selectedToDelete) return;

    try {
      await AdminDeleteTestimony(selectedToDelete.id);

      setTestimonies((prev) =>
        prev.filter((t) => t.id !== selectedToDelete.id),
      );

      closeDeleteModal();
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Failed to delete testimony");
    }
  };

  const filteredTestimonies =
    filter === "all"
      ? testimonies
      : testimonies.filter((t) => t.status?.name === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredTestimonies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonies = filteredTestimonies.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Testimonies Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all testimonies and their approval status
          </p>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {["all", "draft", "approved", "rejected"].map((status) => {
            const count =
              status === "all"
                ? testimonies.length
                : testimonies.filter(
                    (t) => t.status?.name?.toLowerCase() === status,
                  ).length;

            return (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  filter === status
                    ? "bg-[#111828] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#111828]"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#111828] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-nowrap">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Profession
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Country
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTestimonies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No testimonies found
                    </td>
                  </tr>
                ) : (
                  paginatedTestimonies.map((testimony, idx) => (
                    <tr
                      key={testimony.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-teal-600">
                        {testimony.id.substring(0, 4) + "****"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {testimony.full_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {testimony.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {testimony.profession}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {testimony.country}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
                        title={testimony.message}
                      >
                        {testimony.message.length > 40
                          ? testimony.message.substring(0, 40) + "..."
                          : testimony.message}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(testimony.status?.name)}`}
                        >
                          {testimony.status?.name &&
                            testimony.status.name.charAt(0).toUpperCase() +
                              testimony.status.name.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {/* EDIT BUTTON */}
                          <button
                            onClick={() => openEditModal(testimony)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
                            title="Edit testimony"
                          >
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            onClick={() => openDeleteModal(testimony)}
                            className="flex items-center gap-2 px-4 py-2 text-red-700 bg-red-100 hover:bg-red-200 rounded-lg font-medium transition-colors cursor-pointer"
                            title="Delete testimony"
                          >
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                                clipRule="evenodd"
                              />
                              <path d="M4 5a1 1 0 011-1h3V3a1 1 0 112 0v1h3a1 1 0 011 1v1H4V5zM5 7h10l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7z" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredTestimonies.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {filteredTestimonies.length}
                </span>{" "}
                results
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                          currentPage === page
                            ? "bg-[#111828] text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-[#111828]"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedTestimony && (
        <EditModal
          testimony={selectedTestimony}
          statuses={statuses}
          onSave={handleSaveEdit}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && selectedToDelete && (
        <div
          className="fixed inset-0 bg-[#1f1e1ece] flex items-center justify-center z-50 p-4"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-gray-300 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-gray-700">
              Are you sure you want to delete testimony by{" "}
              <span className="font-semibold">
                {selectedToDelete.full_name}
              </span>
              ?
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-5 border-gray-300 border-t">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EditModal = ({ testimony, statuses, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    ...testimony,
    status: testimony.status?.id || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-[#1f1e1ece] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Edit Testimony</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111828] focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111828] focus:border-transparent outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Profession
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111828] focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111828] focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#111828] focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#111828] hover:bg-[#0c1221] rounded-lg font-medium transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
