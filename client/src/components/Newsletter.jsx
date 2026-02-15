import React, { useState } from "react";
import axios from "../services/axios"; // ✅ Make sure this path is correct

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // ✅ Send email to backend
      await axios.post("/api/newsletter", { email });

      setSubmitted(true);
      setError("");

      // Reset after delay
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-10 px-4 sm:px-6 text-center rounded-xl shadow-md dark:shadow-none border border-transparent dark:border-gray-700 mt-12 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400">
        Subscribe to our Newsletter
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
        Stay updated with our latest products and offers.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address for newsletter subscription"
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Subscribe
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-green-600 dark:text-green-400 font-medium">
          🎉 Subscribed successfully!
        </p>
      )}

      {error && <p className="mt-4 text-red-600 dark:text-red-400 font-medium">⚠️ {error}</p>}
    </div>
  );
};

export default Newsletter;
