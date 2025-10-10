import React from "react";
import "./VideoSection.css";
import votoVideo from "./promo.mp4"; // 👈 o teu vídeo local (coloca-o na mesma pasta)

export default function VideoSection({
  id = "video",
  title = "É tempo de Mudança!",
  description = (
    <>
      Este é o momento de fazermos a diferença.  
      <br />
      Juntos, com ambição, podemos transformar a Freguesia de Vila Fernando num lugar melhor para todos.  
      <br />
      No dia 12, faz ouvir a tua voz. Vota pela mudança!
    </>
  ),
}) {
  return (
    <section id={id} className="videoSection" aria-label="Vídeo de apelo ao voto e à mudança">
      <div className="videoSection__wrap">
        <header className="videoSection__header">
          <h2 className="videoSection__title">{title}</h2>
          <p className="videoSection__description">{description}</p>
        </header>

        {/* 🎬 Vídeo local hardcoded */}
        <div className="videoSection__playerWrapper">
          <video
            className="videoSection__player"
            src={votoVideo}
            playsInline
            controls
            autoPlay
            loop
          />
        </div>
      </div>
    </section>
  );
}
