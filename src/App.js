import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';
import Team from './components/Team/Team';

function App() {
  return (
    <div>
      <Hero />
      <Program />
      <Team />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
