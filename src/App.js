import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';

function App() {
  return (
    <div>
      <Hero />
      <Program imageUrl="/imagens/programa-vila-fernando.jpg" />
      <ContactForm />
    </div>
  );
}

export default App;
