import React, { useEffect, useState } from "react";
import axios from "axios";
import Echo from "laravel-echo";
import { app } from "../../utils/helpers";

// Modal Component for Notifications
const Modal = ({ message, isError, closeModal }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
      <h2
        className={`text-2xl ${isError ? "text-red-500" : "text-green-500"
          } font-bold`}
      >
        Notification
      </h2>
      <p className="mt-4">{message}</p>
      <div className="mt-6 flex justify-end">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// Main Component
const AvailableTables = () => {
  const [availableTables, setAvailableTables] = useState({
    total: 0,
    inUse: 0,
  });
  const [modal, setModal] = useState({
    show: false,
    message: "",
    isError: false,
  });
  const [formData, setFormData] = useState({
    total: 0,
    inUse: 0,
  });

  // Fetch data from API on component load
  useEffect(() => {
    fetchTables();
    setupRealTimeUpdates();
  }, []);

  // Fetch Table Data from API
  const fetchTables = async () => {
    try {
      const response = await axios.get(
        `${app.urls.be}api/bookings/available-tables`
      );

      // Map backend data to frontend state
      const { total, in_use } = response.data;
      setAvailableTables({ total, inUse: in_use });
      setFormData({ total, inUse: in_use });
    } catch (error) {
      console.error("Error fetching tables:", error);
      showModal("Failed to fetch table data.", true);
    }
  };

  // Setup WebSocket listener for real-time updates
  const setupRealTimeUpdates = () => {
    if (window.Echo) {
      window.Echo.channel("available-tables")
        .listen("TableDataUpdated", (event) => {
          console.log("Real-time update received:", event);
          setAvailableTables({
            total: event.total,
            inUse: event.in_use,
          });
        });
    }
  };

  // Show Modal Notification
  const showModal = (message, isError) => {
    setModal({ show: true, message, isError });
  };

  // Close Modal
  const closeModal = () => {
    setModal({ show: false, message: "", isError: false });
  };

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Math.max(0, value), // Ensure non-negative inputs
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      total: formData.total,
      in_use: formData.inUse, // Match Laravel's expected key
    };

    try {
      const response = await axios.post(
        `${app.urls.be}api/bookings/available-tables/store`,
        payload
      );
      setAvailableTables(response.data);
      showModal("Data updated successfully.", false);
    } catch (error) {
      console.error("Error updating tables:", error);
      showModal("Failed to update data.", true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Tables</h2>

      {/* Display Current Table Information */}
      <div className="text-lg mb-4">
        <p>
          Total Tables: <span className="font-semibold">{availableTables.total}</span>
        </p>
        <p>
          Tables In Use:{" "}
          <span className="font-semibold">{availableTables.inUse}</span>
        </p>
      </div>

      {/* Form for Editing Table Data */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700"
          >
            Total Tables
          </label>
          <input
            type="number"
            id="total"
            name="total"
            value={formData.total}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="inUse"
            className="block text-sm font-medium text-gray-700"
          >
            Tables In Use
          </label>
          <input
            type="number"
            id="inUse"
            name="inUse"
            value={formData.inUse}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            min="0"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Modal for Notifications */}
      {modal.show && (
        <Modal
          message={modal.message}
          isError={modal.isError}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default AvailableTables;
