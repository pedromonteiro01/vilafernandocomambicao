import React from "react";
import "./Hero.css";

export default function Hero({
  buttonText = "Saber mais",
  title = "Vila Fernando Com Ambição Vai Ganhar",
}) {

  const handleScroll = () => {
    const target = document.getElementById("video");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 👉 separar a frase em partes
  const formattedTitle = (
    <>
      Vila Fernando Com Ambição{" "}
      <span className="hero__highlight">Vai Ganhar!</span>
    </>
  );

  return (
    <section
      className="hero"
      role="banner"
      aria-label="Secção principal com imagem de fundo"
      style={{ "--bg-url": `url('')` }}
    >
      <div className="hero__overlay" />
      <div className="hero__container">
        <h1 className="hero__title">{formattedTitle}</h1>

        <div className="hero__action">
          <button className="hero__button" onClick={handleScroll}>
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
