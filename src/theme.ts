/* ========== 테마 변경 기능 ========== */
const themes: { [key: string]: { [key: string]: string } } = {
    light: {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f0f0f0",
      "--bg-tertiary": "#e0e0e0",
      "--text-primary": "#000000",
      "--text-secondary": "#555555",
      "--accent": "#007bff",
      "--accent-hover": "#0056b3",
      "--danger": "#e74c3c",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--border": "#cccccc"
    },
    dark1: {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#6d5acd",
      "--accent-hover": "#8574e3",
      "--danger": "#e74c3c",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--border": "#444444"
    },
    dark2: {
      "--bg-primary": "#121212",
      "--bg-secondary": "#1e1e1e",
      "--bg-tertiary": "#2a2a2a",
      "--text-primary": "#f5f5f5",
      "--text-secondary": "#aaaaaa",
      "--accent": "#bb86fc",
      "--accent-hover": "#9b59b6",
      "--danger": "#cf6679",
      "--success": "#03dac6",
      "--warning": "#f39c12",
      "--border": "#3c3c3c"
    },
    blackwhite: {
      "--bg-primary": "#000000",
      "--bg-secondary": "#000000",
      "--bg-tertiary": "#111111",
      "--text-primary": "#ffffff",
      "--text-secondary": "#cccccc",
      "--accent": "#ffffff",
      "--accent-hover": "#dddddd",
      "--danger": "#ffffff",
      "--success": "#ffffff",
      "--warning": "#ffffff",
      "--border": "#444444"
    },
    "dark-blue": {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#87CEEB",
      "--accent-hover": "#6bb9f0",
      "--danger": "#e74c3c",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--border": "#444444"
    },
    "dark-pink": {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#252525",
      "--bg-tertiary": "#333333",
      "--text-primary": "#e0e0e0",
      "--text-secondary": "#b0b0b0",
      "--accent": "#ff69b4",
      "--accent-hover": "#ff85c0",
      "--danger": "#e74c3c",
      "--success": "#2ecc71",
      "--warning": "#f39c12",
      "--border": "#444444"
    }
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
