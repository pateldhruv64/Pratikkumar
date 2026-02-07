import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 text-center sm:text-left">
        About Our Company
      </h2>

      <p className="text-gray-700 mb-4 text-base sm:text-lg leading-relaxed">
        We are a trusted name in pharmaceutical marketing, committed to
        delivering high-quality products that improve lives. Our focus is on
        innovation, quality, and service excellence.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-8 mb-2 text-blue-700">
        🎯 Our Mission
      </h3>
      <p className="text-gray-700 mb-4 text-base sm:text-lg leading-relaxed">
        To provide affordable and reliable pharmaceutical solutions that enhance
        the well-being of individuals globally.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-8 mb-2 text-blue-700">
        🚀 Our Vision
      </h3>
      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
        To be a leader in pharmaceutical innovation and make quality healthcare
        accessible to everyone.
      </p>
    </div>
  );
};

export default About;
