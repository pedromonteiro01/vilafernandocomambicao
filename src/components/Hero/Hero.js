import React from "react";
import "./Hero.css";
import vila from './vilafernando.jpg';

export default function Hero({
  buttonText = "Saber mais",
  title = "Pela Freguesia de Vila Fernando",
}) {

  const handleScroll = () => {
    const target = document.getElementById("programa");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="hero"
      role="banner"
      aria-label="Secção principal com imagem de fundo"
      style={{ "--bg-url": `url('')` }}
    >
      <div className="hero__overlay" />
      <div className="hero__container">
        <h1 className="hero__title">{title}</h1>

        <div className="hero__action">
          <button className="hero__button" onClick={handleScroll}>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
