
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#0D0D0D',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Opcional para APIs nativas
    },
    title: 'RIDERMASTER PRO',
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  // En desarrollo carga el servidor local, en producción carga el index.html exportado
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    win.loadURL('http://localhost:9002');
  } else {
    // Apunta al archivo index.html dentro de la carpeta 'out' de Next.js
    win.loadFile(path.join(__dirname, '../out/index.html'));
  }

  // Ocultar menú superior para una experiencia más de "app"
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
