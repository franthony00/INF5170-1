let datos = JSON.parse(localStorage.getItem("formulario"));

function mostrarResumen() {
  if (!datos) {
    document.getElementById("resumen").innerHTML = "<p>No hay datos registrados.</p>";
    return;
  }

  let html = `<h3>Datos Personales</h3>`;
  html += `
    <p><strong>Nombre:</strong> ${datos.persona.nombre}</p>
    <p><strong>Apellido:</strong> ${datos.persona.apellido}</p>
    <p><strong>Edad:</strong> ${datos.persona.edad}</p>
    <p><strong>Sexo:</strong> ${datos.persona.sexo}</p>
  `;

  html += `<h3>Familiares</h3>`;
  if (datos.familiares.length === 0) {
    html += "<p>No se registraron familiares.</p>";
  } else {
    html += "<ul>";
    datos.familiares.forEach(f => {
      html += `<li>${f.nombre} / ${f.parentesco} / ${f.edad} años</li>`;
    });
    html += "</ul>";
  }

  html += `<h3>Condiciones Preexistentes</h3>`;
  if (datos.condiciones.length === 0) {
    html += "<p>No se registraron condiciones.</p>";
  } else {
    html += "<ul>";
    datos.condiciones.forEach(c => {
      html += `<li>${c.enfermedad} - ${c.tiempo} - ${c.detalle}</li>`;
    });
    html += "</ul>";
  }

  html += `<h3>Internamientos</h3>`;
  if (datos.internamientos.length === 0) {
    html += "<p>No se registraron internamientos.</p>";
  } else {
    html += "<ul>";
    datos.internamientos.forEach(i => {
      html += `<li>${i.fecha} - ${i.centro} - ${i.diagnostico}</li>`;
    });
    html += "</ul>";
  }

  document.getElementById("resumen").innerHTML = html;
}

function volver() {
  window.location.href = "registro3.html";
}

function reiniciar() {
  if (confirm("¿Estás seguro de que deseas borrar todos los datos?")) {
    localStorage.removeItem("formulario");
    window.location.href = "registro.html";
  }
}

document.addEventListener("DOMContentLoaded", mostrarResumen);
