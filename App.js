const menuBtns = document.querySelectorAll('.menu-btn:not(.exit-btn)');
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

menuBtns.forEach((btn, index) => {
  btn.addEventListener('click', function() {
    const menuId = this.dataset.menu;
    
    // Close all menus first
    menuBtns.forEach(b => b.classList.remove('active'));
    dropdownMenus.forEach(menu => menu.classList.remove('active'));
    
    // Open clicked menu
    this.classList.add('active');
    document.querySelector(`[data-menu-id="${menuId}"]`)?.classList.add('active');
  });
});

// Close menus when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.topbar')) {
    menuBtns.forEach(btn => btn.classList.remove('active'));
    dropdownMenus.forEach(menu => menu.classList.remove('active'));
  }
});

// Exit button
document.querySelector('.exit-btn').addEventListener('click', function() {
  if (confirm('Are you sure you want to exit?')) {
    window.close();
  }
});

// Position dropdowns under their respective buttons
menuBtns.forEach((btn, index) => {
  const menuId = btn.dataset.menu;
  const menu = document.querySelector(`[data-menu-id="${menuId}"]`);
  
  if (menu) {
    const observer = new ResizeObserver(() => {
      const rect = btn.getBoundingClientRect();
      menu.style.left = (rect.left + rect.width / 2) + 'px';
    });
    observer.observe(btn);
  }
});