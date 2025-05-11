// Importaciones de Firebase (asegúrate de que estas URLs sean accesibles)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, push, get, update, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Configuración de Firebase (tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyB2wLuqs_U0XuzwDeg_av-YuXFOY1na-0c",
  authDomain: "inf5170-1-ea7a1.firebaseapp.com",
  databaseURL: "https://inf5170-1-ea7a1-default-rtdb.firebaseio.com",
  projectId: "inf5170-1-ea7a1",
  storageBucket: "inf5170-1-ea7a1.appspot.com",
  messagingSenderId: "747436095921",
  appId: "1:747436095921:web:b22bec31f15afde9c86590"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para manejar las pestañas/tabs
function setupTabs() {
  document.querySelectorAll('[data-tab-target]').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      document.querySelectorAll('[data-tab-content]').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      target.classList.add('active');
      tab.classList.add('active');
    });
  });
}

// Función para crear usuarios
function setupCreateUser() {
  document.getElementById("createForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("createName").value.trim();
    const email = document.getElementById("createEmail").value.trim();
    
    if (!nombre || !email) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    try {
      const nuevoRef = push(ref(db, "usuarios"));
      await set(nuevoRef, { nombre, email });
      alert("✅ Usuario creado correctamente");
      document.getElementById("createForm").reset();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("❌ Error al crear usuario");
    }
  });
}

// Función para buscar usuarios
function setupSearchUsers() {
  document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombreBuscar = document.getElementById("searchName").value.toLowerCase().trim();
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = "<p>Cargando...</p>";
    
    try {
      const snapshot = await get(ref(db, "usuarios"));
      resultsList.innerHTML = "";
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        let encontrados = false;
        
        Object.entries(data).forEach(([id, user]) => {
          if (user.nombre.toLowerCase().includes(nombreBuscar)) {
            resultsList.innerHTML += `
              <div class="user-result p-2 border rounded mb-2">
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Nombre:</strong> ${user.nombre}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <button class="btn-edit mt-2 p-1 bg-blue-500 text-white rounded" 
                        data-id="${id}">Editar</button>
              </div>`;
            encontrados = true;
          }
        });
        
        if (!encontrados) {
          resultsList.innerHTML = "<p>No se encontraron usuarios</p>";
        }
      } else {
        resultsList.innerHTML = "<p>No hay usuarios registrados</p>";
      }
      
      // Mostrar resultados
      document.getElementById("searchResults").classList.remove("hidden");
      
      // Agregar event listeners a los botones de editar
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          fillUpdateForm(id);
        });
      });
      
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      resultsList.innerHTML = "<p>Error al buscar usuarios</p>";
    }
  });
}

// Función para rellenar el formulario de actualización
async function fillUpdateForm(userId) {
  try {
    const snapshot = await get(ref(db, `usuarios/${userId}`));
    
    if (snapshot.exists()) {
      const user = snapshot.val();
      document.getElementById("updateId").value = userId;
      document.getElementById("updateName").value = user.nombre;
      document.getElementById("updateEmail").value = user.email;
      
      // Cambiar a la pestaña de actualización
      document.querySelector('[data-tab-target="#updateTab"]').click();
    }
  } catch (error) {
    console.error("Error al cargar usuario:", error);
    alert("Error al cargar usuario para edición");
  }
}

// Función para actualizar usuarios
function setupUpdateUser() {
  document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = document.getElementById("updateId").value.trim();
    const nuevoNombre = document.getElementById("updateName").value.trim();
    const nuevoEmail = document.getElementById("updateEmail").value.trim();
    
    if (!id || !nuevoNombre || !nuevoEmail) {
      alert("Por favor completa todos los campos");
      return;
    }
    
    try {
      const registroRef = ref(db, `usuarios/${id}`);
      const snapshot = await get(registroRef);
      
      if (snapshot.exists()) {
        await update(registroRef, { 
          nombre: nuevoNombre, 
          email: nuevoEmail 
        });
        alert("✅ Usuario actualizado correctamente");
        document.getElementById("updateForm").reset();
      } else {
        alert("❌ ID de usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("❌ Error al actualizar usuario");
    }
  });
}

// Función para eliminar usuarios
function setupDeleteUser() {
  document.getElementById("deleteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const id = document.getElementById("deleteId").value.trim();
    
    if (!id) {
      alert("Por favor ingresa un ID de usuario");
      return;
    }
    
    try {
      const registroRef = ref(db, `usuarios/${id}`);
      const snapshot = await get(registroRef);
      
      if (snapshot.exists()) {
        const confirmar = confirm(`¿Estás seguro de eliminar al usuario ${snapshot.val().nombre}?`);
        if (confirmar) {
          await remove(registroRef);
          alert("🗑️ Usuario eliminado correctamente");
          document.getElementById("deleteForm").reset();
        }
      } else {
        alert("❌ ID de usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("❌ Error al eliminar usuario");
    }
  });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupCreateUser();
  setupSearchUsers();
  setupUpdateUser();
  setupDeleteUser();
});