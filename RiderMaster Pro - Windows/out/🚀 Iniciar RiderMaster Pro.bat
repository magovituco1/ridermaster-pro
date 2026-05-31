@echo off
title RiderMaster Pro - Iniciando...

echo ================================================
echo     INICIANDO RIDERMASTER PRO
echo ================================================
echo.

cd /d "%~dp0"

echo Iniciando servidor...
start /min cmd /c "npm run dev"

echo Esperando que cargue la aplicación...
timeout /t 8 >nul

echo Abriendo RiderMaster Pro...
start http://localhost:9002

echo.
echo ================================================
echo La aplicación se está abriendo en tu navegador.
echo Mantén esta ventana abierta mientras uses la app.
echo ================================================
pause
