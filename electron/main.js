
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
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'RIDERMASTER PRO',
    show: false,
    icon: path.join(__dirname, '../public/icon.png')
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    win.loadURL('http://localhost:9002');
  } else {
    // En exportación estática de Next.js, el archivo principal es index.html
    // Cargamos el archivo directamente desde la carpeta 'out'
    const indexPath = path.join(__dirname, '../out/index.html');
    win.loadFile(indexPath).catch(err => console.error("Error cargando el rider:", err));
  }

  win.setMenuBarVisibility(false);
  
  win.once('ready-to-show', () => {
    win.show();
  });
}

// Configuración de seguridad y ciclo de vida
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
