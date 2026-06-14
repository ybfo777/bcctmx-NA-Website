@echo off
setlocal
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

echo Opening Hermes/Codex Desktop workflow for:
echo %PROJECT_DIR%
echo.

hc-pair open "%PROJECT_DIR%"

endlocal
