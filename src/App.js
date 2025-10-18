import './App.css';
import AnnouncementModal from './components/AnoucementModal/AnoucementModal';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';
import Team from './components/Team/Team';
import VideoSection from './components/VideoSection/VideoSection';

function App() {
  return (
    <div>
      <Hero />
      <AnnouncementModal />
      <VideoSection />
      <Gallery />
      <Program />
      <Team />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
