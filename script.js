document.addEventListener("DOMContentLoaded", function () {
    fetch("menu.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el JSON");
            }
            return response.json();
        })
        .then(data => {
            generarMenu(data.menu);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

function generarMenu(menuData) {
    const menuContainer = document.getElementById("menu");

    menuData.forEach(categoria => {
        let li = document.createElement("li");
        li.textContent = categoria.categoria;

        let subMenu = document.createElement("ul");
        subMenu.style.display = "none"; // Oculto por defecto

        categoria.subcategorias.forEach(sub => {
            let subLi = document.createElement("li");
            subLi.textContent = sub.nombre;
            subLi.onclick = () => window.open(sub.enlace, "_blank");
            subMenu.appendChild(subLi);
        });

        li.appendChild(subMenu);
        li.addEventListener("mouseover", () => subMenu.style.display = "block");
        li.addEventListener("mouseout", () => subMenu.style.display = "none");

        menuContainer.appendChild(li);
    });
}

function agregarCanal() {
    let idMenu = document.getElementById("id-menu").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let enlace = document.getElementById("enlace").value.trim();

    if (idMenu === "" || nombre === "" || enlace === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let table = document.getElementById("lista-canales");
    let row = table.insertRow();
    
    let cellId = row.insertCell(0);
    let cellNombre = row.insertCell(1);
    let cellEnlace = row.insertCell(2);
    let cellAccion = row.insertCell(3);

    cellId.textContent = idMenu;
    cellNombre.textContent = nombre;
    cellEnlace.innerHTML = `<a href="${enlace}" target="_blank">${enlace}</a>`;
    
    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.backgroundColor = "#dc3545";
    btnEliminar.style.color = "white";
    btnEliminar.style.border = "none";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.onclick = () => row.remove();

    cellAccion.appendChild(btnEliminar);

    document.getElementById("id-menu").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("enlace").value = "";
}
