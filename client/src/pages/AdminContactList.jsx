import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminContactList = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');
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
      const token = sessionStorage.getItem('adminToken');
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Centered Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">
          📥 Contact Messages
        </h2>

        {/* ✅ Centered Search Input */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 dark:border-gray-600 rounded mb-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          />
        </div>

        {error && <p className="text-red-600 dark:text-red-400 mb-4 text-center">{error}</p>}

        {filteredMessages.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No matching messages.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr className="text-sm sm:text-base">
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">#</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Name</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Email</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Number</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Message</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Date</th>
                  <th className="px-2 sm:px-4 py-2 border-b dark:border-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {filteredMessages.map((msg, index) => (
                  <tr key={msg._id} className="text-xs sm:text-sm text-center border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700">{index + 1}</td>
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700">{msg.name}</td>
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700">{msg.email}</td>
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700">{msg.number}</td>
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700 text-left">{msg.message}</td>
                    <td className="px-2 sm:px-4 py-2 border-r dark:border-gray-700">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold"
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
    </div>
  );
};

export default AdminContactList;
