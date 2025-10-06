import React from "react";
import "./Gallery.css";
import vf from './vf.webp';
import qb from './qb.webp';
import qc2 from './qc2.webp';
import vm from './vm2.webp';
import mc from './mc2.webp';
import asm from './asm1.webp';
import qm from './qm2.webp';

export default function Gallery({
  id = "galeria",
  title = "Freguesia de Vila Fernando",
  intro = (
    <>
      No dia 12 faz ouvir a tua voz. <br></br>Vota <strong>PPD/PSD, CDS-PP, IL</strong>.<br></br> <br></br>Juntos, vamos construir uma freguesia melhor para todos.<br></br> Vota pela mudança. Vota por Vila Fernando. <br></br> Com Ambição.
    </>
  ),
  featured = {
    src: vf,
    alt: "Vila Fernando",
    caption: "Vila Fernando - O futuro começa aqui",
  },
  items = [
    {
      src: vm,
      alt: "Vila Mendo",
      caption: "Vila Mendo",
    },
    {
      src: mc,
      alt: "Monte Carreto",
      caption: "Monte Carreto",
    },
    {
      src: asm,
      alt: "Aldeia de Santa Madalena",
      caption: "Aldeia de Santa Madalena",
    },
    {
      src: qb,
      alt: "Quinta de Baixo",
      caption: "Quinta de Baixo",
    },
    {
      src: qm,
      alt: "Quinta do Meio",
      caption: "Quinta do Meio",
    },
    {
      src: qc2,
      alt: "Quinta de Cima",
      caption: "Quinta de Cima",
    },
  ],
}) {
  return (
    <section id={id} className="gallery" aria-label="Galeria de momentos">
      <div className="gallery__wrap">
        <div className="gallery__top">
          <header className="gallery__header">
            <h2 className="gallery__title">{title}</h2>
            <p className="gallery__intro">{intro}</p>
          </header>

          <figure className="gallery__featured">
            <img
              src={featured.src}
              alt={featured.alt}
              loading="lazy"
              className="gallery__featuredImg"
            />
            <figcaption className="gallery__featuredCaption">
              {featured.caption}
            </figcaption>
          </figure>
        </div>

        <div className="gallery__grid" role="list">
          {items.slice(0, 6).map((it, i) => (
            <figure className="gallery__card" role="listitem" key={i}>
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="gallery__img"
              />
              <figcaption className="gallery__caption">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
