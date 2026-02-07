import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ match name
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import WhatsAppButton from "./components/WhatsAppButton";
import TermsPrivacy from "./pages/TermsPrivacy";
import AdminNewsletterList from "./pages/AdminNewsletterList";
import AdminContactList from "./pages/AdminContactList";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />

        <main className="flex-grow">
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
          </Routes>
          <WhatsAppButton />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
