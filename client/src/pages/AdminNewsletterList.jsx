import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminNewsletterList = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('/api/newsletter', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(res.data);
      } catch (err) {
        console.error('Error fetching newsletter emails:', err);
        setError('Failed to load subscribers.');
      }
    };

    fetchEmails();
  }, []);

  const filteredEmails = emails.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ✅ Heading Centered */}
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        📨 Newsletter Subscribers
      </h2>

      {/* ✅ Search Bar Centered */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {filteredEmails.length === 0 ? (
        <p className="text-center">No matching subscribers.</p>
      ) : (
        // ✅ Responsive wrapper added here
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.map((item, index) => (
                <tr key={item._id} className="text-center text-sm sm:text-base">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.email}</td>
                  <td className="px-4 py-2 border">
                    {new Date(item.createdAt).toLocaleString()}
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

export default AdminNewsletterList;
