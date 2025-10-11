import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Hajj from './pages/Hajj';
import Umrah from './pages/Umrah';
import Contact from './pages/Contact';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/hajj" element={<Hajj />} />
        <Route path="/umrah" element={<Umrah />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
