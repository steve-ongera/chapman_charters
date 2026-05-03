// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PrivateJetCharter from "./pages/PrivateJetCharter";
import GroupAirCharter from "./pages/GroupAirCharter";
import AirCargo from "./pages/AirCargo";
import AircraftLeasing from "./pages/AircraftLeasing";
import FlightSupport from "./pages/FlightSupport";
import AviationEmergencyServices from "./pages/AviationEmergencyServices";
import AboutUs from "./pages/AboutUs";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                              element={<Home />} />
          <Route path="/services/private-jet"          element={<PrivateJetCharter />} />
          <Route path="/services/group-air-charter"    element={<GroupAirCharter />} />
          <Route path="/services/air-cargo"            element={<AirCargo />} />
          <Route path="/services/aircraft-leasing"     element={<AircraftLeasing />} />
          <Route path="/services/flight-support"       element={<FlightSupport />} />
          <Route path="/services/aviation-emergency"   element={<AviationEmergencyServices />} />
          <Route path="/about"                         element={<AboutUs />} />
          {/* catch-all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}