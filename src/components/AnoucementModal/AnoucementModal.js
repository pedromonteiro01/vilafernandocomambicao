import React, { useEffect, useRef, useState } from "react";
import "./AnnouncementModal.css";

import vf from './vf.jpg';
import qb from './qb.jpeg';
import qc2 from './qc2.jpeg';
import vm from './vm2.jpeg';
import mc from './mc2.jpeg';
import asm from './asm1.jpeg';
import qm from './qm2.jpeg';


const IMAGES = [
  { src: vf, alt: "Vila Fernando" },
  { src: qb, alt: "Quinta de Baixo" },
  { src: qc2, alt: "Quinta de Cima" },
  { src: vm, alt: "Vila Mendo" },
  { src: mc, alt: "Monte Carreto" },
  { src: asm, alt: "Aldeia de Santa Madalena" },
  { src: qm, alt: "Quinta do Meio" },
];

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const lastActiveElement = useRef(null);
  const dialogRef = useRef(null);

  // 🔁 Carousel state
  const [index, setIndex] = useState(0);
  const slideRef = useRef(null);
  const autoId = useRef(null);

  // Open modal on mount
  useEffect(() => {
    lastActiveElement.current = document.activeElement;
    setOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => (document.body.style.overflow = "");
  }, []);

  // Auto-advance (pause on focus/hover)
  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const startAuto = () => {
    stopAuto();
    autoId.current = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 5000);
  };
  const stopAuto = () => {
    if (autoId.current) clearInterval(autoId.current);
    autoId.current = null;
  };

  const finalizeClose = () => {
    setOpen(false);
    setClosing(false);
    document.body.style.overflow = "";
    lastActiveElement.current?.focus?.();
  };

  const close = () => {
    if (closing) return;
    setClosing(true);
  };

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter(
          (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
        );
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closing]);

  const scrollTo = (id) => {
    close();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Carousel controls
  const next = () => setIndex((i) => (i + 1) % IMAGES.length);
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const goTo = (i) => setIndex(i);

  // Touch swipe
  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    let startX = 0;
    let dx = 0;

    const onTouchStart = (e) => {
      stopAuto();
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      dx = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (dx > 40) prev();
      else if (dx < -40) next();
      startAuto();
      startX = 0; dx = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className={`announce ${closing ? "announce--closing" : ""}`}
      aria-hidden={!open}
    >
      <div className="announce__backdrop" onClick={close} aria-hidden="true" />
      <div
        className="announce__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="announce-title"
        aria-describedby="announce-desc"
        ref={dialogRef}
        tabIndex={-1}
        onAnimationEnd={(e) => {
          if (closing && e.target === dialogRef.current) finalizeClose();
        }}
      >
        <button
          className="announce__close"
          onClick={close}
          aria-label="Fechar anúncio"
        >
          ✕
        </button>

        {/* 🖼️ Carousel */}
        <div
          className="announce__carousel"
          role="region"
          aria-roledescription="carrossel"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div className="announce__carousel-viewport" ref={slideRef}>
            <div
              className="announce__carousel-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {IMAGES.map((img, i) => (
                <div className="announce__slide" key={i} aria-hidden={i !== index}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="announce__nav announce__nav--prev"
            onClick={prev}
            aria-label="Imagem anterior"
          >
            ‹
          </button>
          <button
            className="announce__nav announce__nav--next"
            onClick={next}
            aria-label="Imagem seguinte"
          >
            ›
          </button>

          <div className="announce__dots" role="tablist" aria-label="Selecionar imagem">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-controls={`slide-${i}`}
                className={`announce__dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
              >
                <span className="sr-only">Ir para imagem {i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <header className="announce__header">
          <h2 id="announce-title" className="announce__title">Vila Fernando com Ambição</h2>

          {/* ⛔ removed timer; simple static copy instead */}
          <div id="announce-desc" className="announce__desc">
            Conheça as nossas propostas e deixe-nos a sua sugestão. A sua opinião
            é essencial para construirmos uma freguesia melhor.
          </div>
        </header>

        <div className="announce__actions">
          <button
            className="announce__btn announce__btn--primary"
            onClick={() => scrollTo("programa")}
          >
            Ver Programa
          </button>
          <button
            className="announce__btn announce__btn--ghost"
            onClick={() => scrollTo("contact")}
          >
            Falar connosco
          </button>
        </div>
      </div>
    </div>
  );
}
