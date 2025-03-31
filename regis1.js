let datos = JSON.parse(localStorage.getItem("formulario")) || {
  persona: {},
  familiares: [],
  condiciones: [],
  internamientos: []
};

function agregarFamiliar() {
  const nombre = document.getElementById("familiarNombre").value;
  const parentesco = document.getElementById("familiarParentesco").value;
  const edad = document.getElementById("familiarEdad").value;

  if (!nombre || !parentesco || !edad) {
    alert("Completa todos los campos del familiar.");
    return;
  }

  datos.familiares.push({ nombre, parentesco, edad });
  localStorage.setItem("formulario", JSON.stringify(datos));
  mostrarFamiliares();
  document.getElementById("formFamiliar").reset();
}

function mostrarFamiliares() {
  const lista = document.getElementById("listaFamiliares");
  if (!lista) return;

  lista.innerHTML = "";
  datos.familiares.forEach((familiar) => {
    const li = document.createElement("li");
    li.textContent = `${familiar.nombre} / ${familiar.parentesco} / ${familiar.edad} años`;
    lista.appendChild(li);
  });
}

function volver() {
  window.location.href = "registro.html";
}

function siguiente() {
  if (datos.familiares.length === 0) {
    alert("Debes agregar al menos un familiar.");
    return;
  }
  localStorage.setItem("formulario", JSON.stringify(datos));
  window.location.href = "registro2.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (datos?.persona?.nombre) {
    const header = document.getElementById("clienteHeader");
    if (header) {
      header.innerHTML = `<p><strong>Cliente:</strong> ${datos.persona.nombre} ${datos.persona.apellido}</p>`;
    }
  }

  mostrarFamiliares();
});
