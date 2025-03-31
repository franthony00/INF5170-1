let datos = JSON.parse(localStorage.getItem("formulario")) || {
  persona: {},
  familiares: [],
  condiciones: [],
  internamientos: []
};

function grabarDatos() {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const sexo = document.getElementById("sexo").value;

  if (!nombre || !apellido || !edad || !sexo) {
    alert("Completa todos los campos.");
    return;
  }

  datos.persona = { nombre, apellido, edad, sexo };
  localStorage.setItem("formulario", JSON.stringify(datos));
  alert("Datos grabados correctamente.");
}

function editarDatos() {
  const p = datos.persona;
  document.getElementById("nombre").value = p.nombre || "";
  document.getElementById("apellido").value = p.apellido || "";
  document.getElementById("edad").value = p.edad || "";
  document.getElementById("sexo").value = p.sexo || "";
}

function mostrarDatos() {
  const p = datos.persona;
  const resumen = `
    <strong>Nombre:</strong> ${p.nombre}<br>
    <strong>Apellido:</strong> ${p.apellido}<br>
    <strong>Edad:</strong> ${p.edad}<br>
    <strong>Sexo:</strong> ${p.sexo}
  `;
  document.getElementById("resultado").innerHTML = resumen;
}

function guardarYIr() {
  grabarDatos(); // Graba antes de pasar
  window.location.href = "registro1.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (datos.persona?.nombre) {
    document.getElementById("clienteHeader").innerHTML = `
      <p><strong>Cliente:</strong> ${datos.persona.nombre} ${datos.persona.apellido}</p>
    `;
  }
});
