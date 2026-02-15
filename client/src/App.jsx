import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Lazy loaded pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const TermsPrivacy = lazy(() => import("./pages/TermsPrivacy"));
const AdminNewsletterList = lazy(() => import("./pages/AdminNewsletterList"));
const AdminContactList = lazy(() => import("./pages/AdminContactList"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminRegister = lazy(() => import("./pages/AdminRegister"));

import Breadcrumbs from "./components/Breadcrumbs";

// Layout component that conditionally shows Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      {/* {!isAdminRoute && <Breadcrumbs />} */}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
        <WhatsAppButton />
        <ScrollToTop />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/terms" element={<TermsPrivacy />} />
            <Route
              path="/admin/newsletters"
              element={
                <ProtectedAdminRoute>
                  <AdminNewsletterList />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <ProtectedAdminRoute>
                  <AdminContactList />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            {/* 404 catch-all */}
            <Route
              path="/admin/register"
              element={
                <ProtectedRoute>
                  <AdminRegister />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;
