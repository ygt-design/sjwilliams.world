import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./components/Navbar/Navbar";
import "./global.css";
import CaseStudy from "./pages/CaseStudy/CaseStudy";

// Lazy-load your pages for code splitting
const Home = lazy(() => import("./pages/Home/Home"));
const Work = lazy(() => import("./pages/Work/Work"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Simulate initial loading; you can replace this with your own logic (e.g., fetching global data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated 3-second loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && (
        <LoadingScreen
          loading={loading}
          onFinish={() => setShowLoader(false)}
        />
      )}
      <Router>
        <Navbar />
        <Suspense
          fallback={<LoadingScreen loading={true} onFinish={() => {}} />}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/case-study/:channelId" element={<CaseStudy />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
