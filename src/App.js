import './App.css';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';

function App() {
  return (
    <div>
      <Hero
        backgroundUrl="/imagens/vila-fernando.jpg" // ou deixe o default
        buttonText="Participar"
        onButtonClick={() => {
          // navegação, scroll, etc.
          window.location.hash = "#participar";
        }}
      />
      <Program imageUrl="/imagens/programa-vila-fernando.jpg" />
    </div>
  );
}

export default App;
