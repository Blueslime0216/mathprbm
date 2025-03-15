/* ========== 테마 변경 기능 ========== */
const themes: { [key: string]: { [key: string]: string } } = {
    "dark": {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#6d5acd",
      "--accent-hover": "#8574e3",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#444444",
    },
    "dark-purple": {
      "--bg-primary": "#121212",
      "--bg-secondary": "#1e1e1e",
      "--bg-tertiary": "#2a2a2a",
      "--text-primary": "#f5f5f5",
      "--text-secondary": "#aaaaaa",
      "--accent": "#bb86fc",
      "--accent-hover": "#9b59b6",
      "--info": "#3498db",
      "--success": "#03dac6",
      "--warning": "#f39c12",
      "--danger": "#cf6679",
      "--border": "#3c3c3c",
    },
    "blackwhite": {
      "--bg-primary": "#000000",
      "--bg-secondary": "#000000",
      "--bg-tertiary": "#111111",
      "--text-primary": "#ffffff",
      "--text-secondary": "#cccccc",
      "--accent": "#ffffff",
      "--accent-hover": "#dddddd",
      "--info": "#3498db",
      "--success": "#ffffff",
      "--warning": "#ffffff",
      "--danger": "#ffffff",
      "--border": "#444444",
    },
    "dark-blue": {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#87CEEB",
      "--accent-hover": "#6bb9f0",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#444444",
    },
    "dark-pink": {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#ff69b4",
      "--accent-hover": "#ff85c0",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#444444",
    },
    "light-orange": {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f0f0f0",
      "--bg-tertiary": "#e0e0e0",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#fd7e14",
      "--accent-hover": "#d5600f",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#cccccc",
    },
    "light-green": {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f0f0f0",
      "--bg-tertiary": "#e0e0e0",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#28a745",
      "--accent-hover": "#218838",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#cccccc",
    },
    "light-blue": {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f0f0f0",
      "--bg-tertiary": "#e0e0e0",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#007bff",
      "--accent-hover": "#0056b3",
      "--info": "#3498db",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--danger": "#e74c3c",
      "--border": "#cccccc",
    },
  };

  function changeTheme(themeName: string): void {
    const theme = themes[themeName];
    for (let variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable]);
    }
  }

  const dropdownToggle = document.querySelector('.dropdown-toggle') as HTMLElement;
  const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;
  dropdownToggle.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });
  document.querySelectorAll<HTMLElement>('.dropdown-item').forEach(item => {
    item.addEventListener('click', function () {
      const selectedTheme = this.getAttribute('data-theme') || 'dark1';
      changeTheme(selectedTheme);
      dropdownMenu.style.display = 'none';
    });
  });
