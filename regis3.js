let datos = JSON.parse(localStorage.getItem("formulario")) || {
  persona: {},
  familiares: [],
  condiciones: [],
  internamientos: []
};

function agregarInternamiento() {
  const fecha = document.getElementById("fecha").value;
  const centro = document.getElementById("centro").value;
  const diagnostico = document.getElementById("diagnostico").value;

  if (!fecha || !centro || !diagnostico) {
    alert("Completa todos los campos del internamiento.");
    return;
  }

  datos.internamientos.push({ fecha, centro, diagnostico });
  localStorage.setItem("formulario", JSON.stringify(datos));
  mostrarInternamientos();
  document.getElementById("formInternamiento").reset();
}

function mostrarInternamientos() {
  const lista = document.getElementById("listaInternamientos");
  if (!lista) return;

  lista.innerHTML = "";
  datos.internamientos.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = `${i.fecha} - ${i.centro} - ${i.diagnostico}`;
    lista.appendChild(li);
  });
}

function volver() {
  window.location.href = "registro2.html";
}

function siguiente() {
  localStorage.setItem("formulario", JSON.stringify(datos));
  window.location.href = "registro4.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (datos?.persona?.nombre) {
    const header = document.getElementById("clienteHeader");
    if (header) {
      header.innerHTML = `<p><strong>Cliente:</strong> ${datos.persona.nombre} ${datos.persona.apellido}</p>`;
    }
  }

  mostrarInternamientos();
});
