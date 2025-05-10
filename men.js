const data = {
  "menu": [
    {
      "nombre": "Canales",
      "subitems": [
        { "nombre": "Instagram", "url": "https://instagram.com" },
        { "nombre": "YouTube", "url": "https://youtube.com" },
        { "nombre": "TikTok", "url": "https://tiktok.com" }
      ]
    },
    {
      "nombre": "Redes",
      "subitems": [
        { "nombre": "Facebook", "url": "https://facebook.com" },
        { "nombre": "Twitter", "url": "https://twitter.com" },
        { "nombre": "LinkedIn", "url": "https://linkedin.com" }
      ]
    },
    {
      "nombre": "Información",
      "subitems": [
        { "nombre": "Contacto", "url": "contact.html" },
        { "nombre": "Acerca de", "url": "about.html" }
      ]
    }
  ]
};


const menuContainer = document.getElementById('menu');
const mainMenuSelect = document.getElementById("mainMenuSelect");
const deletePanel = document.getElementById("deletePanel"); // no usado más
const deleteTableBody = document.querySelector("#deleteTable tbody");

function renderMenu() {
  menuContainer.innerHTML = "";
  const ul = document.createElement("ul");

  data.menu.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.nombre;

    if (item.subitems && item.subitems.length > 0) {
      const subUl = document.createElement("ul");

      item.subitems.forEach(sub => {
        const subLi = document.createElement("li");
        const a = document.createElement("a");
        a.href = sub.url;
        a.textContent = sub.nombre;
        a.target = "_blank";
        subLi.appendChild(a);
        subUl.appendChild(subLi);
      });

      li.appendChild(subUl);
    }

    ul.appendChild(li);
  });

  menuContainer.appendChild(ul);
}

function renderControls() {
  mainMenuSelect.innerHTML = "";
  deleteTableBody.innerHTML = "";

  data.menu.forEach((item, mainIdx) => {
    // Llenar select para agregar
    const option = document.createElement("option");
    option.value = mainIdx;
    option.textContent = item.nombre;
    mainMenuSelect.appendChild(option);

    // Llenar tabla para eliminar
    item.subitems.forEach((sub, subIdx) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.nombre}</td>
        <td>${sub.nombre}</td>
        <td><a href="${sub.url}" target="_blank">${sub.url}</a></td>
        <td><button data-main="${mainIdx}" data-sub="${subIdx}">Eliminar</button></td>
      `;

      deleteTableBody.appendChild(tr);
    });
  });
}

// Agregar submenú
document.getElementById("addSubmenuForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const mainIndex = mainMenuSelect.value;
  const name = document.getElementById("submenuName").value;
  const url = document.getElementById("submenuURL").value;

  data.menu[mainIndex].subitems.push({ nombre: name, url: url });

  renderMenu();
  renderControls();
  this.reset();
});

// Eliminar submenú
document.querySelector("#deleteTable").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const mainIdx = e.target.dataset.main;
    const subIdx = e.target.dataset.sub;
    data.menu[mainIdx].subitems.splice(subIdx, 1);

    renderMenu();
    renderControls();
  }
});

// Inicialización
renderMenu();
renderControls();
