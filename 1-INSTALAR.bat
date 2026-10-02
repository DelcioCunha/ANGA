@echo off
chcp 65001 >nul
title Aliança — Instalar
where node >nul 2>nul || (
  echo [ERRO] O Node.js nao esta instalado.
  echo Instala a versao LTS em https://nodejs.org e volta a abrir este ficheiro.
  pause & exit /b 1
)
cd /d "%~dp0website"
echo A instalar as dependencias do website (so e preciso uma vez)...
call npm install
echo.
echo Concluido. Agora usa 2-DESENVOLVER.bat ou 3-GERAR-SITE.bat
pause
