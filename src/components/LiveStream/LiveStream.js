// src/components/Livestream/Livestream.js
import React from "react";
import "./LiveStream.css";

export default function Livestream({ channelName }) {
  return (
    <section id="livestream" className="livestream">
      <div className="livestream__wrap">
        <header className="livestream__header">
          <h2 className="livestream__title">Transmissão em Direto</h2>
          <p className="livestream__sub">
            Acompanhe em tempo real a nossa apresentação
          </p>
        </header>

        <div className="livestream__video">
          <iframe
            src={`https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}`}
            title="Apresentação da Lista - Freguesia de Vila Fernando"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        {/* Fallback message */}
        <p className="livestream__alt">
          Caso haja algum problema na transmissão, assista {" "}
          <a
            href={`https://www.twitch.tv/${channelName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            aqui
          </a>.
        </p>
      </div>
    </section>
  );
}
