import React from "react";
import "./Program.css";

/* importa logos de partidos */
import il from './il.png';
import cds from './cds.png';
import psd from './psd.png';

/* importa icons para os cards */
import iconPublico from './icons/park.png';
import iconSocial from './icons/handshake.png';
import iconEconomia from './icons/sustainable-development.png';
import iconEducacao from './icons/stack-of-books.png';
import iconAmbiente from './icons/green-tea.png';
import iconGovernacao from './icons/active.png';

const sections = [
  {
    id: "espaco-publico",
    title: "Espaço Público: Requalificar, Cuidar e Valorizar",
    items: [
      "Lutar pela requalificação completa do recinto da feira;",
      "Implementar um plano regular de limpeza e manutenção de caminhos;",
      "Recuperar e conservar fontes, tanques, lavadouros e pequenos monumentos da freguesia, preservando a história e identidade local;",
      "Manutenção contínua dos edifícios públicos sob responsabilidade da Junta;",
      "Diligenciar e exigir, junto de quem de direito, a intervenção urgente no rio Noéme;",
      "Potenciar o espaço adjacente à ribeira com a criação do projeto “A Ribeira é nossa”;",
      "Criação de um Parque (ESPAÇO) Intergeracional para todas as idades;",
      "Dotar os espaços da freguesia que, normalmente, são usados para eventos sociais com infraestruturas adequadas ao desenvolvimento dessas atividades."
    ],
    img: iconPublico,
  },
  {
    id: "apoio-social",
    title: "Apoio Social, Combate ao Isolamento, Saúde e Envelhecimento com Qualidade",
    items: [
      "Implementação de projetos que contribuam para preservar as pessoas nos seus ambientes (casa/comunidade), combatendo isolamento e fomentando a sua participação na vida comunitária e o convívio social;",
      "Dar corpo ao projeto: “Juntos pela Vida / Cuidar+ / +Vida e +Saber / -Solidão +Atenção +Atividade Pais e Filhos/Avós e Netos VF - Tempo para Cuidar e Viver Melhor”;",
      "Criar o “Espaço do Utente” de apoio a todas as pessoas mais vulneráveis;",
      "Lutar pela manutenção do consultório médico na freguesia;",
      "Apoiaremos em tudo o que for necessário, para que o lar seja uma realidade."
    ],
    img: iconSocial,
  },
  {
    id: "desenvolvimento",
    title: "Desenvolvimento Económico e Emprego Local",
    items: [
      "Apoiar e valorizar agricultores e produtores locais;",
      "Desenvolver rotas de turismo rural;",
      "Atrair investimentos para desenvolver a freguesia;",
      "Apoio técnico a pequenos produtores e empreendedores da freguesia;",
      "Envolvimento dos empresários locais no desenvolvimento de projetos catalisadores para a freguesia;",
      "Combate ao despovoamento."
    ],
    img: iconEconomia,
  },
  {
    id: "educacao",
    title: "Educação, Cultura e Juventude",
    items: [
      "Providenciar todo o apoio à manutenção e funcionamento da escola;",
      "Instituir prémios de mérito escolar anuais;",
      "Criar a agenda cultural da aldeia;",
      "Apoiar as festas anuais, atividades religiosas e eventos culturais;",
      "Criar o espaço “Vila Fernando com Memória” para recolha de histórias.",
      "Envolver os jovens em programas de voluntariado de apoio a idosos, proteção ambiental e programas de intercâmbio com outras freguesias;",
      "Promover a criação do Conselho Jovem da Freguesia."
    ],
    img: iconEducacao,
  },
  {
    id: "ambiente",
    title: "Ambiente e Sustentabilidade",
    items: [
      "Garantir a limpeza e requalificação de espaços verdes;",
      "Reforçar a rede de ecopontos e recolha seletiva;",
      "Plantar, anualmente, com envolvimento da comunidade, árvores autóctones, com criação de zonas verdes de lazer."
    ],
    img: iconAmbiente,
  },
  {
    id: "governacao",
    title: "Governação e Participação Ativa",
    items: [
      "Valorizar todas as associações locais como parceiras no desenvolvimento e dinamização da freguesia;",
      "Envolver a escola e os jovens em projetos de cidadania ativa;",
      "Manter a informação pertinente atualizada nas redes sociais e site da freguesia."
    ],
    img: iconGovernacao,
  },
];

export default function Program() {
  return (
    <section id="programa" className="program">
      <div className="program__bg" aria-hidden="true" />

      <div className="program__wrap">
        <aside className="program__nav" aria-label="Navegação do programa">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="program__anchor">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="program__content">
          <header className="program__header">
            <div>
              <h2 className="program__headline">Programa Eleitoral</h2>
              <p className="program__sub">Vila Fernando com ambição</p>
            </div>

            <div className="program__logos">
              <img src={psd} alt="Partido Social Democrata" />
              <img src={il} alt="Iniciativa Liberal" />
              <img src={cds} alt="CDS-PP" />
            </div>
          </header>

          <div className="program__grid">
            {sections.map((s) => (
              <article id={s.id} key={s.id} className="program__card">
                <div className="program__icon">
                  <img src={s.img} alt="" />
                </div>
                <h3 className="program__title">{s.title}</h3>
                <ul className="program__list">
                  {s.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
