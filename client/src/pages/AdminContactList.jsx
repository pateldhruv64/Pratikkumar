import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminContactList = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching contact messages:', err);
        setError('Failed to load contact messages.');
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message.');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const lower = searchTerm.toLowerCase();
    return (
      msg.name.toLowerCase().includes(lower) ||
      msg.email.toLowerCase().includes(lower) ||
      msg.message.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* ✅ Centered Heading */}
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center">
        📥 Contact Messages
      </h2>

      {/* ✅ Centered Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by name, email, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {filteredMessages.length === 0 ? (
        <p className="text-center">No matching messages.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100 text-sm sm:text-base">
                <th className="px-2 sm:px-4 py-2 border">#</th>
                <th className="px-2 sm:px-4 py-2 border">Name</th>
                <th className="px-2 sm:px-4 py-2 border">Email</th>
                <th className="px-2 sm:px-4 py-2 border">Number</th>
                <th className="px-2 sm:px-4 py-2 border">Message</th>
                <th className="px-2 sm:px-4 py-2 border">Date</th>
                <th className="px-2 sm:px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <tr key={msg._id} className="text-xs sm:text-sm text-center">
                  <td className="px-2 sm:px-4 py-2 border">{index + 1}</td>
                  <td className="px-2 sm:px-4 py-2 border">{msg.name}</td>
                  <td className="px-2 sm:px-4 py-2 border">{msg.email}</td>
                  <td className="px-2 sm:px-4 py-2 border">{msg.number}</td>
                  <td className="px-2 sm:px-4 py-2 border text-left">{msg.message}</td>
                  <td className="px-2 sm:px-4 py-2 border">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContactList;
