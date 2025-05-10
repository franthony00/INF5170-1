// Base de datos simulada en memoria
let database = [];
let nextId = 1; // ID incremental para los registros

// Gestión de pestañas (tabs)
document.querySelectorAll('[data-tab-target]').forEach(tab => {
  tab.addEventListener('click', () => {
    // Oculta todos los contenidos de pestañas
    document.querySelectorAll('[data-tab-content]').forEach(content => content.classList.remove('active'));

    // Desactiva todos los botones de pestaña
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Activa el contenido y la pestaña correspondiente
    document.querySelector(tab.dataset.tabTarget).classList.add('active');
    tab.classList.add('active');
  });
});

// Evento para crear un nuevo registro
document.getElementById('createForm').addEventListener('submit', e => {
  e.preventDefault(); // Evita recargar la página

  // Crea un nuevo objeto con los datos del formulario
  const newRecord = {
    id: nextId++, // Asigna ID y lo incrementa
    name: document.getElementById('createName').value,
    email: document.getElementById('createEmail').value
  };

  // Agrega el nuevo registro a la base de datos
  database.push(newRecord);

  // Muestra notificación y limpia el formulario
  showNotification('Registro creado con éxito');
  e.target.reset();
});

// Evento para buscar registros por nombre
document.getElementById('searchForm').addEventListener('submit', e => {
  e.preventDefault();

  // Obtiene el término de búsqueda en minúsculas
  const searchTerm = document.getElementById('searchName').value.toLowerCase();

  // Filtra los registros que contengan el término
  const results = database.filter(record => record.name.toLowerCase().includes(searchTerm));

  // Muestra los resultados encontrados
  displayResults(results);
});

// Evento para actualizar un registro existente
document.getElementById('updateForm').addEventListener('submit', e => {
  e.preventDefault();

  // Obtiene el ID ingresado
  const id = parseInt(document.getElementById('updateId').value);

  // Busca el registro en la base de datos
  const record = database.find(r => r.id === id);

  if (record) {
    // Si existe, actualiza sus datos
    record.name = document.getElementById('updateName').value;
    record.email = document.getElementById('updateEmail').value;
    showNotification('Registro actualizado con éxito');
  } else {
    // Si no existe, muestra error
    showNotification('Registro no encontrado', 'red-500');
  }

  e.target.reset();
});

// Evento para eliminar un registro por ID
document.getElementById('deleteForm').addEventListener('submit', e => {
  e.preventDefault();

  // Obtiene el ID ingresado
  const id = parseInt(document.getElementById('deleteId').value);

  // Busca el índice del registro
  const index = database.findIndex(r => r.id === id);

  if (index !== -1) {
    // Si existe, lo elimina
    database.splice(index, 1);
    showNotification('Registro eliminado con éxito');
  } else {
    // Si no se encuentra, muestra error
    showNotification('Registro no encontrado', 'red-500');
  }

  e.target.reset();
});

// Muestra resultados de búsqueda en pantalla
function displayResults(results) {
  const resultsList = document.getElementById('resultsList');
  resultsList.innerHTML = ''; // Limpia resultados anteriores

  if (results.length === 0) {
    resultsList.innerHTML = '<p>No se encontraron registros</p>';
  } else {
    // Recorre los resultados y los muestra
    results.forEach(record => {
      const div = document.createElement('div');
      div.className = 'p-2 border rounded';
      div.innerHTML = `
        <p><strong>ID:</strong> ${record.id}</p>
        <p><strong>Nombre:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
      `;
      resultsList.appendChild(div);
    });
  }

  // Muestra la sección de resultados
  document.getElementById('searchResults').classList.remove('hidden');
}

// Muestra una notificación temporal en la esquina inferior derecha
function showNotification(message, bgColor = 'green-500') {
  const notification = document.getElementById('notification');

  notification.textContent = message;

  // Aplica clases para mostrar estilo y posición
  notification.className = `fixed bottom-4 right-4 bg-${bgColor} text-white px-4 py-2 rounded`;

  // Hace visible la notificación
  notification.classList.remove('hidden');

  // La oculta después de 3 segundos
  setTimeout(() => notification.classList.add('hidden'), 3000);
}
