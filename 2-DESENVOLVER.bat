@echo off
chcp 65001 >nul
title Aliança — Desenvolvimento
cd /d "%~dp0website"
if not exist node_modules (
  echo Primeiro executa 1-INSTALAR.bat
  pause & exit /b 1
)
echo A iniciar o servidor de desenvolvimento...
echo O navegador abre automaticamente. Cada alteracao em content\ ou website\src\ aparece na hora.
echo Para parar: fecha esta janela.
call npm run dev
