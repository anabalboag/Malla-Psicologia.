"""
const malla = [
  [
    { id: "base_sociocultural", nombre: "Bases Socioculturales de la Psicología" },
    { id: "comunicacion", nombre: "Comunicación Académica y Pensamiento Científico" },
    { id: "historia", nombre: "Introducción Histórica a la Psicología" },
    { id: "neurobio", nombre: "Neurobiología" }
  ],
  [
    { id: "teoria1", nombre: "Teoría Psicológica I", prerrequisitos: ["historia"] },
    { id: "neurocog", nombre: "Neurociencia Cognitiva y Afectiva", prerrequisitos: ["neurobio"] }
  ],
  [
    { id: "teoria2", nombre: "Teoría Psicológica II", prerrequisitos: ["teoria1"] },
    { id: "psic_social1", nombre: "Psicología Social I" }
  ]
];

const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function puedeAprobar(ramo) {
  return (ramo.prerrequisitos || []).every(pr => estado[pr] === true);
}

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  malla.forEach((semestre, i) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>Semestre ${i + 1}</h2>`;

    semestre.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;

      const aprobado = estado[ramo.id] === true;
      const habilitado = puedeAprobar(ramo);

      if (aprobado) {
        div.classList.add("aprobado");
      } else if (!habilitado) {
        div.classList.add("bloqueado");
      }

      div.onclick = () => {
        if (!habilitado) return;
        estado[ramo.id] = !estado[ramo.id];
        guardarEstado();
        renderMalla();
      };

      semestreDiv.appendChild(div);
    });

    contenedor.appendChild(semestreDiv);
  });
}

renderMalla();
"""
