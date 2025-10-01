// src/components/Team/Team.jsx
import React from "react";
import "./Team.css";
import user from './user.png';
import anibal from './Anibal .jpg';
import daniel from './Daniel.jpg';
import eunice from './Eunice.jpg';
import fabio from './Fabio (1).jpg';
import joaquim from './Joaquim Monteiro.jpg';
import lucinda from './Lucinda.jpg';
import marina from './Marina.jpg';
import patricia from './Patricia Seixo.jpg';
import paulo from './Paulo Saraiva.jpg';
import rui from './Rui.jpg';
import telmo from './Telmo Silva.jpg';
import tiago from './Tiago Robalo.jpg';
import tania from './tania.jpg';

// ⚠️ Coloca as tuas imagens em /public/imagens/equipa/…
// ou importa-as (ex.: import joao from './joao.jpg')
const members = [
  { name: "Joaquim Monteiro", role: "Reformado", photo: joaquim },
  { name: "Paulo Saraiva", role: "Eng. Eletrotécnico",photo: paulo },
  { name: "Patrícia Seixo", role: "Animadora Socio-cultural", photo: patricia },
  { name: "Eunice dos Santos", role: "Assessora de Direção", photo: eunice },
  { name: "Tiago Robalo", role: "Serralheiro", photo: tiago },
  { name: "Fábio Martins", role: "Gestor", photo: fabio },
  { name: "Tânia Carreira", role: "Educadora Social",photo: tania },
  { name: "Telmo da Silva", role: "Empresário", photo: telmo },
  { name: "Daniel Costa", role: "", photo: daniel },
  { name: "Marina Marujo", role: "Empregada de Balcão", photo: marina },
  { name: "Anibal Soares", role: "Operário de captação de água subterrânea", photo: anibal },
  { name: "Rui dos Santos", role: "", photo: rui },
  { name: "Lucinda Tomé", role: "", photo: lucinda },
];

export default function Team() {
  const handleScroll = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="equipa" className="team" aria-labelledby="team-title">
      <div className="team__wrap">
        <header className="team__header">
          <h2 id="team-title" className="team__title">A Equipa</h2>
          <p className="team__sub">
            Uma equipa experiente, próxima e empenhada em <strong>Vila Fernando</strong>
          </p>
        </header>

        <ul className="team__grid" role="list">
          {members.map((m) => (
            <li key={m.name} className="team-card">
              <div className="team-card__media">
                <img
                  src={m.photo}
                  alt={`${m.name} — ${m.role}`}
                  loading="lazy"
                  width="160"
                  height="160"
                  onError={(e) => {
                    // fallback minimalista caso a imagem falhe
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("team-card__media--fallback");
                    e.currentTarget.parentElement.setAttribute("data-initials", getInitials(m.name));
                  }}
                />
              </div>
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// util para iniciais no fallback
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}
