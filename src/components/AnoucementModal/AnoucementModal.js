import React, { useEffect, useRef, useState } from "react";
import "./AnnouncementModal.css";
import promoVideo from "./promo.mp4"; // 👈 your local hardcoded video (put it in the same folder)

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const lastActiveElement = useRef(null);
  const dialogRef = useRef(null);
  const videoRef = useRef(null);

  // 🟢 Open modal on mount
  useEffect(() => {
    lastActiveElement.current = document.activeElement;
    setOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => (document.body.style.overflow = "");
  }, []);

  const finalizeClose = () => {
    setOpen(false);
    setClosing(false);
    document.body.style.overflow = "";
    lastActiveElement.current?.focus?.();
  };

  const close = () => {
    if (closing) return;
    setClosing(true);

    // stop video playback instantly
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // ⌨️ Handle ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }

      // Focus trap
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
        {/* ❌ Close button */}
        <button
          className="announce__close"
          onClick={close}
          aria-label="Fechar anúncio"
        >
          ✕
        </button>

        {/* 🎥 Hardcoded local video */}
        <div className="announce__playerWrapper">
          <video
            ref={videoRef}
            className="announce__player"
            src={promoVideo}
            playsInline
            autoPlay
            controls
          />
        </div>

        <header className="announce__header">
          <h2 id="announce-title" className="announce__title">
            Vila Fernando com Ambição
          </h2>
          <div id="announce-desc" className="announce__desc">
            Conheça as nossas propostas e deixe-nos a sua sugestão.  
            A sua opinião é essencial para construirmos uma freguesia melhor.
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
