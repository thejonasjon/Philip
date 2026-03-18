import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Wrap App content in a component so we can use useLocation
function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // hide navbar on login page

  return (
    <>
      {!hideNavbar && <Navigation />}

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

        <Route path="/submit-testimonial" element={<TestimonialForm />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/testimonials" element={<TestimonialPage />} />

        <Route
          path="*"
          element={<h2 className="text-center py-12">Page not found</h2>}
        />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}