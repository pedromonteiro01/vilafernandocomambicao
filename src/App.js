import './App.css';
import AnnouncementModal from './components/AnoucementModal/AnoucementModal';
import ContactForm from './components/ContactForm/ContactForm';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';
import Team from './components/Team/Team';

function App() {
  return (
    <div>
      <AnnouncementModal />
      <Hero />
      <Program imageUrl="/imagens/programa-vila-fernando.jpg" />
      <Team />
      <ContactForm />
    </div>
  );
}

export default App;
