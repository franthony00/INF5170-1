let datos = JSON.parse(localStorage.getItem("formulario")) || {
  persona: {},
  familiares: [],
  condiciones: [],
  internamientos: []
};

function agregarCondicion() {
  const enfermedad = document.getElementById("enfermedad").value;
  const tiempo = document.getElementById("tiempo").value;
  const detalle = document.getElementById("detalle").value;

  if (!enfermedad || !tiempo || !detalle) {
    alert("Completa todos los campos de la condición.");
    return;
  }

  datos.condiciones.push({ enfermedad, tiempo, detalle });
  localStorage.setItem("formulario", JSON.stringify(datos));
  mostrarCondiciones();
  document.getElementById("formCondicion").reset();
}

function mostrarCondiciones() {
  const lista = document.getElementById("listaCondiciones");
  if (!lista) return;

  lista.innerHTML = "";
  datos.condiciones.forEach(cond => {
    const li = document.createElement("li");
    li.textContent = `${cond.enfermedad} - ${cond.tiempo} - ${cond.detalle}`;
    lista.appendChild(li);
  });
}

function volver() {
  window.location.href = "registro1.html";
}

function siguiente() {
  if (datos.condiciones.length === 0) {
    alert("Debes agregar al menos una condición antes de continuar.");
    return;
  }

  localStorage.setItem("formulario", JSON.stringify(datos));
  window.location.href = "registro3.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (datos?.persona?.nombre) {
    const header = document.getElementById("clienteHeader");
    if (header) {
      header.innerHTML = `<p><strong>Cliente:</strong> ${datos.persona.nombre} ${datos.persona.apellido}</p>`;
    }
  }

  mostrarCondiciones();
});
