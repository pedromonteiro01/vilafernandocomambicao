import React, { useState } from "react";
import "./ContactForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovkwqqy";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (form.name.trim().length < 3) {
      toast.error("O nome deve ter pelo menos 3 caracteres.");
      return false;
    }

    if (!/^\d{9}$/.test(form.phone.trim())) {
      toast.error("O número de telemóvel deve ter exatamente 9 dígitos.");
      return false;
    }

    if (form.message.trim().length < 20) {
      toast.error("A mensagem deve ter pelo menos 20 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // 🔥 validação antes do fetch
    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Mensagem enviada! Obrigado pelo contacto.");
        setForm({ name: "", phone: "", message: "" }); // limpa
      } else {
        const data = await res.json().catch(() => ({}));
        const msg =
          data?.errors?.[0]?.message ||
          "Não foi possível enviar. Tenta novamente.";
        toast.error(msg);
      }
    } catch (err) {
      toast.error("Falha de rede. Verifica a ligação e tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__wrap">
        <header className="contact__header">
          <h2 className="contact__title">Sugestões / Dúvidas</h2>
          <p className="contact__sub">
            Envie-nos a sua mensagem — estamos disponíveis para ouvir a sua opinião.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="contact__form" noValidate>
          <div className="contact__field">
            <label htmlFor="name">* Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="O seu nome"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="phone">* Número Telemóvel</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
              placeholder="Ex.: 912345678"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message">* Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Escreva a sua mensagem…"
            />
          </div>

          <button type="submit" className="contact__button" disabled={submitting}>
            {submitting ? "A enviar…" : "Enviar"}
          </button>
        </form>
      </div>

      {/* Toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}
