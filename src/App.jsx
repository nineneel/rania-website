import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import './styles/App.css';

const App = () => {
  return (
    <>
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
};

export default App;
