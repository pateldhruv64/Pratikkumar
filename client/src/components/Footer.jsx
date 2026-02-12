import React from "react";
import Newsletter from "./Newsletter";
// import { useLocation } from "react-router-dom";

// import AdminDashboard from "../pages/AdminDashboard";
 

const Footer = () => {

  // const location = useLocation();
  // const isAdminDashboard = location.pathname === AdminDashboard;

  return (
    <div className="bg-gray-100">
      {/* Newsletter Section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <Newsletter /> 


      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white pt-10 pb-6 mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
            {/* Company Info */}
            <div className="md:w-1/2">
              <h3 className="text-lg font-bold mb-2">
                Crejap Pharma Pvt. Ltd.
              </h3>
              <p className="text-sm text-gray-300">
                Caring for Better Health. We deliver trusted pharma products to
                improve global wellness.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-md font-semibold mb-3">Contact Us</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>📍 Ahmedabad, Gujarat, India</li>
                <li>📧 info@medicure.com</li>
                <li>📞 +91-9876543210</li>
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-600" />

          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Crejap Pharma Pvt. Ltd..
            All rights reserved.
          </div>
          <a
            href="/terms"
            className="text-gray-400 hover:text-white underline text-xs mt-1 inline-block "
          >
            Terms & Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
