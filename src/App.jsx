import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Partnership from './pages/Partnership';
import Hajj from './pages/Hajj';
import Umrah from './pages/Umrah';
import Contact from './pages/Contact';
import Support from './pages/Support';
import './styles/App.css';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/hajj" element={<Hajj />} />
          <Route path="/umrah" element={<Umrah />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
};

export default App;
