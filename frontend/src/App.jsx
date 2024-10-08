import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./components/navigation/Nav"
import Home from "./pages/Home"
import HomePage from "./pages/HomePage"
import Contact from "./pages/Contact"
import Community from "./pages/Community"
import Gift from "./pages/Gift"
import History from "./pages/History"
import Dashboard from "./pages/Dashboard"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ResetPasswordPageConfirm from "./pages/ResetPasswordPageConfirm";
import ActivatePage from "./pages/ActivatePage";
import NotFoundPage from "./pages/NotFoundPage";
import MyCalendar1 from "./pages/calendars/MyCalendar1";
import EventDetails from "./pages/EventDetails";
import YourBookings from "./pages/YourBookings";

function App() {
  return (
    <div className="container">
      <Router>
        <div className="header">
          <Nav />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activate/:uid/:token" element={<ActivatePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPageConfirm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/gift" element={<Gift />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:mycalendar" element={<MyCalendar1 />} />
            <Route path="/eventdetails/:id" element={<EventDetails />} />
            <Route path="/eventdetails/:id/:yourbookings" element={<YourBookings />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <div className="footer">
          
        </div>
      </Router>
      
      <ToastContainer />
    </div>
  )
}

export default App