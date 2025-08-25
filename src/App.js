import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './pages/Hero';
import AboutSection from './pages/AboutSection';
import ServicesSection from './pages/ServicesSection';
import UploadDemo from './pages/admin/UploadDemo'; 
import HireMeFooter from './pages/HireMeFooter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <AboutSection />
            <ServicesSection/>
            <HireMeFooter/>
          </>
        } />
        <Route path="/upload-demo" element={<UploadDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
