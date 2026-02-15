import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const AdminNewsletterList = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Heading Centered */}
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">
          📨 Newsletter Subscribers
        </h2>

        {/* ✅ Search Bar Centered */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded mb-4 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300"
          />
        </div>

        {error && <p className="text-red-600 dark:text-red-400 mb-4 text-center">{error}</p>}

        {filteredEmails.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No matching subscribers.</p>
        ) : (
          // ✅ Responsive wrapper added here
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2 border-b dark:border-gray-600">#</th>
                  <th className="px-4 py-2 border-b dark:border-gray-600">Email</th>
                  <th className="px-4 py-2 border-b dark:border-gray-600">Subscribed On</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {filteredEmails.map((item, index) => (
                  <tr key={item._id} className="text-center text-sm sm:text-base border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-2 border-r dark:border-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 border-r dark:border-gray-700">{item.email}</td>
                    <td className="px-4 py-2">
                      {new Date(item.createdAt).toLocaleString()}
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

export default AdminNewsletterList;
