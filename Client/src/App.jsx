import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Testimonial from "./Testimonial";
import TestimonialForm from "./Components/TestimonialForm";
import Contact from "./Contact";
import Footer from "./Footer";
import TestimonialPage from "./TestimonialPage";
import AdminDashboard from "./dashboard";
import LoginPage from "./loginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Testimonial />
              <div className="text-center my-8">
                <Link
                  to="/submit-testimonial"
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                >
                  Leave a Review
                </Link>
              </div>
              <Contact />
            </>
          }
        />

        {/* ✍️ Submit Testimonial Form */}
        <Route path="/submit-testimonial" element={<TestimonialForm />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        {/* ⭐ Full Testimonials Page */}
        <Route path="/testimonials" element={<TestimonialPage />} />

        {/* ❌ 404 Fallback */}
        <Route
          path="*"
          element={<h2 className="text-center py-12">Page not found</h2>}
        />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
