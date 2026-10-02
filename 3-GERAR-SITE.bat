@echo off
chcp 65001 >nul
title Aliança — Gerar site
cd /d "%~dp0website"
if not exist node_modules (
  echo Primeiro executa 1-INSTALAR.bat
  pause & exit /b 1
)
echo A validar o conteudo e a gerar a pasta site\ ...
call npm run build || (
  echo.
  echo [ERRO] Corrige os erros acima e tenta de novo.
  pause & exit /b 1
)
echo.
echo Site gerado em: %~dp0site
start "" "%~dp0site\index.html"
pause
