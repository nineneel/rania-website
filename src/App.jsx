import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Partnership from './pages/Partnership';
import Hajj from './pages/Hajj';
import HajjUpgrade from './pages/HajjUpgrade';
import Umrah from './pages/Umrah';
import UmrahDetail from './pages/UmrahDetail';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Linktree from './pages/Linktree';
import usePageTracking from './hooks/usePageTracking';
import './styles/App.css';

const AnalyticsTracker = () => {
  usePageTracking();
  return null;
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <Routes>
          {/* Pages with Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/hajj" element={<Hajj />} />
            <Route path="/hajj/upgrade" element={<HajjUpgrade />} />
            <Route path="/umrah" element={<Umrah />} />
            <Route path="/umrah/:slug" element={<UmrahDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
          </Route>

          {/* Standalone pages (no Header/Footer) */}
          <Route path="/links" element={<Linktree />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
