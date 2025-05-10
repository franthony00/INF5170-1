function generateMenu() {
    const menuContainer = document.getElementById('menu-container');

    menuData.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item rounded-lg border border-gray-200';

        const button = document.createElement('button');
        button.className = 'w-full flex items-center justify-between p-4 text-left';
        button.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${item.icono} text-blue-500 mr-3"></i>
                <span class="font-medium">${item.nombre}</span>
            </div>
            ${item.subitems ? '<i class="fas fa-chevron-down text-gray-400 transition-transform duration-300"></i>' : ''}
        `;

        if (item.subitems && item.subitems.length > 0) {
            const submenu = document.createElement('div');
            submenu.className = 'submenu bg-gray-50';

            const submenuList = document.createElement('div');
            submenuList.className = 'py-2 space-y-1';

            item.subitems.forEach(subitem => {
                const submenuItem = document.createElement('a');
                submenuItem.href = subitem.url;
                submenuItem.className = 'block px-6 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600 submenu-item';
                submenuItem.innerHTML = `
                    <i class="fas fa-arrow-right text-xs text-blue-400 mr-2"></i>
                    ${subitem.nombre}
                `;
                submenuList.appendChild(submenuItem);
            });

            submenu.appendChild(submenuList);

            button.addEventListener('click', () => {
                const icon = button.querySelector('.fa-chevron-down');
                submenu.classList.toggle('open');
                icon.classList.toggle('rotate-180');
            });

            menuItem.appendChild(button);
            menuItem.appendChild(submenu);
        } else {
            button.addEventListener('click', () => {
                window.location.href = item.url;
            });
            menuItem.appendChild(button);
        }

        menuContainer.appendChild(menuItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateMenu();

    document.getElementById('toggle-menu').addEventListener('click', () => {
        const container = document.getElementById('menu-container');
        container.classList.toggle('hidden');
        const icon = document.querySelector('#toggle-menu i');
        icon.classList.toggle('rotate-180');
    });
});