// Lista de ramos por semestre
const malla = [
  // 1º Semestre
  [
    { id: "base_sociocultural", nombre: "Bases Socioculturales de la Psicología" },
    { id: "comunicacion", nombre: "Comunicación Académica y Pensamiento Científico" },
    { id: "historia", nombre: "Introducción Histórica a la Psicología" },
    { id: "neurobio", nombre: "Neurobiología" }
  ],
  // 2º Semestre
  [
    { id: "teoria1", nombre: "Teoría Psicológica I", prerrequisitos: ["historia"] },
    { id: "neurocog", nombre: "Neurociencia Cognitiva y Afectiva", prerrequisitos: ["neurobio"] }
  ],
  // 3º Semestre
  [
    { id: "teoria2", nombre: "Teoría Psicológica II", prerrequisitos: ["teoria1"] },
    { id: "psic_social1", nombre: "Psicología Social I" }
  ]
];

// Cargar estado guardado desde localStorage
const estado = JSON.parse(localStorage.getItem("estadoRamos") || "{}");

// Verifica si se puede aprobar un ramo (según prerrequisitos)
function puedeAprobar(ramo) {
  return (ramo.prerrequisitos || []).every(pr => estado[pr]);
}

// Guarda el estado en localStorage
function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estado));
}

// Renderiza la malla completa
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  malla.forEach((semestre, index) => {
    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.innerHTML = `<h2>Semestre ${index + 1}</h2>`;

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
        estado[ramo.id] = !aprobado;
        guardarEstado();
        renderMalla();
      };

      semestreDiv.appendChild(div);
    });

    contenedor.appendChild(semestreDiv);
  });
}

// Ejecutar al cargar
renderMalla();
