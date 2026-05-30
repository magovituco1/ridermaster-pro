
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
    },
    title: 'RIDERMASTER PRO',
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  // En desarrollo carga el servidor local, en producción cargaría los archivos compilados
  const startUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9002' 
    : `file://${path.join(__dirname, '../out/index.html')}`;

  win.loadURL(startUrl);

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
