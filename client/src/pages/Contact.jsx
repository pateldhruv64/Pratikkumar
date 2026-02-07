import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from '../services/axios'; // ✅ Make sure path is correct

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

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Contact form error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-10">
        📬 Contact Us
      </h2>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* 📞 Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" />

            
            {/* old code of map dairection */}
            {/* <div>
              <h4 className="font-semibold">Address</h4>
              <p>ABC Pharma Ltd., SG Highway, Ahmedabad, Gujarat, India</p>
            </div> */}
{/* ///////////////////////////////////////////////////////////////////////////////// */}

             {/* new code of map dairection */}
<div>
  <h4 className="font-semibold">Address</h4>

  <a
    href="https://www.google.com/maps/search/?api=1&query=ABC+Pharma+Ltd,+SG+Highway,+Ahmedabad,+Gujarat,+India"
    target="_blank"
    rel="noopener noreferrer"
    className=" hover:underline"
  >
    ABC Pharma Ltd., SG Highway, Ahmedabad, Gujarat, India
  </a>
</div>
{/* ////////////////////////////////////////////////////////////////////////// */}

          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p>+91-12345-67890</p>
            </div>
          </div>
{/* old gmail code  */}
          {/* <div className="flex items-start gap-4">
            <Mail className="text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>support@abcpharma.com</p>
            </div>
          </div> */}
{/* /////////////////////////////////////////////////////////////// */}

          {/* gmail no new code  */}

<div className="flex items-start gap-4">
  <Mail className="text-blue-600 mt-1" />

  <div>
    <h4 className="font-semibold">Email</h4>

    <a
      href="mailto:support@abcpharma.com"
      className="hover:underline"
    >
      support@abcpharma.com
    </a>
  </div>
</div>
{/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

        </div>

        {/* 📩 Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 sm:p-8 rounded-xl shadow-md"
        >
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
<div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your number"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Write your message..."
            />
          </div>

          <div className="flex justify-center">
  <button
    type="submit"
    className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition gap-2"
  >
    <Send size={18} />
    Send Message
  </button>
</div>


          {submitted && (
            <p className="text-green-600 font-medium mt-4">🎉 Message sent successfully!</p>
          )}

          {error && (
            <p className="text-red-600 font-medium mt-4">⚠️ {error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
