import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import TestimonialForm from "./Components/TestimonialForm";
// import TestimonialPage from "./TestimonialPage";
import AdminDashboard from "./features/Admin/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/home";
import NewTestimonials from "./pages/testimonials";
import LoginPage from "./features/Admin/loginPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/submit-testimonial" element={<TestimonialForm />}/> */}

        <Route path="/login" element={<LoginPage />}/>

        <Route path="/dashboard" element={ <ProtectedRoute> <AdminDashboard /></ProtectedRoute>}/>

        {/* <Route path="/old/testimonials" element={<TestimonialPage />}/> */}

        <Route path="/testimonials" element={<NewTestimonials />}/>

        <Route path="*" element={ <h2 className="py-12 text-center"> Page not found</h2>}/></Routes>

      <Footer />

      <ToastContainer position="top-right" autoClose={3000}/>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}