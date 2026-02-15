import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from '../services/axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', number: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', form);
      setSubmitted(true);
      setError('');
      setForm({ name: '', email: '', number: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 transition-colors duration-300">
      <Helmet>
        <title>Contact Us | Crejap Pharma Pvt. Ltd.</title>
        <meta name="description" content="Get in touch with Crejap Pharma. Reach out for product inquiries, partnerships, or general questions." />
      </Helmet>

      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
        📬 Contact Us
      </h2>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-semibold dark:text-white">Address</h4>
              <a
                href="https://www.google.com/maps/search/?api=1&query=ABC+Pharma+Ltd,+SG+Highway,+Ahmedabad,+Gujarat,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-700 dark:text-gray-300"
              >
                ABC Pharma Ltd., SG Highway, Ahmedabad, Gujarat, India
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-semibold dark:text-white">Phone</h4>
              <p className="text-gray-700 dark:text-gray-300">+91-12345-67890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <h4 className="font-semibold dark:text-white">Email</h4>
              <a href="mailto:support@abcpharma.com" className="hover:underline text-gray-700 dark:text-gray-300">
                support@abcpharma.com
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Your Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your name" />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Your Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email" />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Mobile Number</label>
            <input type="tel" name="number" value={form.number} onChange={handleChange} required
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your number" />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-200">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows="5"
              className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Write your message..." />
          </div>

          <div className="flex justify-center">
            <button type="submit"
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition gap-2">
              <Send size={18} /> Send Message
            </button>
          </div>

          {submitted && <p className="text-green-600 font-medium mt-4">🎉 Message sent successfully!</p>}
          {error && <p className="text-red-600 font-medium mt-4">⚠️ {error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
