import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

// Custom Hook for Count Up Animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

// Component to render the counter with intersection observer could be better, 
// but for simplicity we'll just run it on mount or when visible (simple version on mount)
const Counter = ({ end, suffix = "" }) => {
  const count = useCountUp(end);
  return <span>{count}{suffix}</span>;
};

const About = () => {
  return (
    <div className="text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Helmet>
        <title>About Us | Crejap Pharma Pvt. Ltd.</title>
        <meta name="description" content="Learn about Crejap Pharma - a trusted name in pharmaceutical marketing committed to delivering high-quality, WHO-GMP certified products." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-8 text-center animate-fadeIn">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">About Crejap Pharma</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
          A trusted name in pharmaceutical marketing, committed to delivering quality healthcare solutions.
        </p>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="p-4 transform hover:scale-105 transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <Counter end={10} suffix="+" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Years Experience</p>
          </div>
          <div className="p-4 transform hover:scale-105 transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <Counter end={500} suffix="+" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Products</p>
          </div>
          <div className="p-4 transform hover:scale-105 transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <Counter end={1000} suffix="+" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Happy Clients</p>
          </div>
          <div className="p-4 transform hover:scale-105 transition duration-300 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <Counter end={50} suffix="+" />
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Cities Served</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <p className="text-gray-700 dark:text-gray-200 mb-6 text-base sm:text-lg leading-relaxed text-justify">
          We are a trusted name in pharmaceutical marketing, committed to
          delivering high-quality products that improve lives. Our focus is on
          innovation, quality, and service excellence.
        </p>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-600 p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">
              🎯 Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              To provide affordable and reliable pharmaceutical solutions that enhance
              the well-being of individuals globally.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-gray-800 border-l-4 border-green-600 p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
              🚀 Our Vision
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              To be a leader in pharmaceutical innovation and make quality healthcare
              accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 sm:px-8 md:px-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center dark:text-white">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">💊</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Quality First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Every product goes through rigorous quality checks before reaching our partners.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Trust & Integrity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">We build strong, long-lasting relationships through honesty and transparency.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">Global Reach</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Our products are trusted across India, with plans for global expansion.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
