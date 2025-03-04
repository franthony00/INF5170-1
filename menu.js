document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menuContainer");
    const form = document.getElementById("formulario");
    const messageBox = document.getElementById("message-box");

    // 🔹 Ocultar el mensaje al cargar la página
    messageBox.style.display = "none";
    messageBox.innerHTML = ""; // Limpia cualquier contenido residual

    // 🔹 Obtener el menú desde localStorage o JSON inicial
    let menuData = JSON.parse(localStorage.getItem("menu")) || {
        menu: [
            { id: 1, nombre: "Inicio", enlace: "/index.html" },
            { id: 2, nombre: "Sobre Nosotros", enlace: "/sobre-nosotros.html" },
            { id: 3, nombre: "Servicios", enlace: "/servicios.html" },
            { id: 4, nombre: "Contacto", enlace: "/contacto.html" }
        ]
    };

    // 🔹 Función para renderizar el menú
    function renderMenu() {
        localStorage.setItem("menu", JSON.stringify(menuData));

        menuContainer.innerHTML = "";
        menuData.menu.forEach(({ nombre, enlace }) => {
            const btn = document.createElement("button");
            btn.textContent = nombre;
            btn.onclick = () => window.location.href = enlace;
            menuContainer.appendChild(btn);
        });
    }

    // 🔹 Función para mostrar mensajes temporales con iconos
    function showMessage(msg, type) {
        messageBox.innerHTML = msg;
        messageBox.className = type; // Aplica clase CSS
        messageBox.style.display = "block";

        // 🔹 Eliminar mensaje después de 4 segundos
        setTimeout(() => {
            messageBox.style.display = "none";
            messageBox.innerHTML = ""; // Limpia el contenido
        }, 4000);
    }

    // 🔹 Función para agregar una nueva opción al menú
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const id = parseInt(form.id.value.trim());
            const nombre = form.nombre.value.trim();
            const enlace = form.enlace.value.trim();

            if (!id || !nombre || !enlace) {
                return showMessage("⚠️ Completa todos los campos.", "error");
            }

            // **Verificar duplicados en ID, Nombre y Enlace**
            if (menuData.menu.some(op => op.id === id)) {
                return showMessage("⚠️ El ID ya existe ⚠️", "error");
            }
            if (menuData.menu.some(op => op.nombre.toLowerCase() === nombre.toLowerCase())) {
                return showMessage("⚠️ El nombre ya existe ⚠️", "error");
            }
            if (menuData.menu.some(op => op.enlace === enlace)) {
                return showMessage("⚠️ El enlace ya existe ⚠️", "error");
            }

         
            menuData.menu.push({ id, nombre, enlace });
            localStorage.setItem("menu", JSON.stringify(menuData));

            form.reset();
            showMessage("✅ Agregado correctamente", "success");
            renderMenu();
        });
    }

    // 🔹 Cargar el menú inicial
    renderMenu();
});
