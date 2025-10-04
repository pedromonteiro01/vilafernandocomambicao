// src/components/Livestream/Livestream.js
import React from "react";
import "./LiveStream.css";

export default function Livestream({ videoId }) {
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
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title="YouTube Livestream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* New message below video */}
        <p className="livestream__alt">
          Caso haja algum problema na transmissão, assista {" "}
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
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
