import React, { useEffect, useRef, useState } from "react";
import "./AnnouncementModal.css";
import anoucement from "./anoucement.webp";

function getNextSundayAt16_30() {
  const now = new Date();
  const target = new Date(now);

  const SUNDAY = 0;
  const day = now.getDay();
  let daysToAdd = (SUNDAY - day + 7) % 7;

  // If it's Sunday but already past 16:30, go to next week
  const alreadyPastToday =
    daysToAdd === 0 &&
    (now.getHours() > 16 ||
      (now.getHours() === 16 &&
        (now.getMinutes() >= 30 || now.getSeconds() > 0)));

  if (alreadyPastToday) daysToAdd = 7;

  target.setDate(now.getDate() + daysToAdd);
  target.setHours(16, 30, 0, 0); // 16:30
  return target;
}


function diffParts(to) {
  const ms = Math.max(0, to.getTime() - Date.now());
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: ms === 0 };
}

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const lastActiveElement = useRef(null);
  const dialogRef = useRef(null);

  // 🕒 countdown
  const [target, setTarget] = useState(() => getNextSundayAt16_30());
  const [timeLeft, setTimeLeft] = useState(() => diffParts(getNextSundayAt16_30()));


  useEffect(() => {
    const id = setInterval(() => {
      const parts = diffParts(target);
      setTimeLeft(parts);
      if (parts.done) {
        // lock to the next occurrence once it hits zero (keeps ticking to next week)
        const next = getNextSundayAt16_30();
        setTarget(next);
        setTimeLeft(diffParts(next));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  // DEBUG: abre sempre ao entrar
  useEffect(() => {
    lastActiveElement.current = document.activeElement;
    setOpen(true);
    document.body.style.overflow = "hidden";
    // foca o conteúdo do modal
    setTimeout(() => dialogRef.current?.focus(), 0);
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
  };

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
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

  if (!open) return null;

  const scrollTo = (id) => {
    close();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
          // só finaliza quando a animação da caixa termina (evita flicker)
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

        <div className="announce__media">
          <img src={anoucement} alt="" aria-hidden="true" loading="lazy" />
        </div>

        <header className="announce__header">
          <span className="announce__eyebrow">Convite</span>
          <h2 id="announce-title" className="announce__title">
            Lanche Convívio
          </h2>
          <p
            className="announce__timer"
            aria-live="polite"
            aria-atomic="true"
            role="status"
          >
            {timeLeft.days === 0 &&
              timeLeft.hours === 0 &&
              timeLeft.minutes === 0 &&
              timeLeft.seconds === 0
              ? "Começou! Domingo, 16h30min"
              : (
                <>
                  Em{" "}
                  <strong>
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </strong>{" "}
                  <p>Domingo, 5 de outubro - 16h30min</p>
                </>
              )}
          </p>
          <p id="announce-desc" className="announce__desc">
            Conheça as nossas propostas e deixe-nos a sua sugestão. A sua opinião
            é essencial para construirmos uma freguesia melhor. Não falte!
          </p>
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
