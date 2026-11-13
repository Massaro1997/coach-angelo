@echo off
REM App clienti v2: prenotazioni, disponibilita, misure, messaggi.
REM Solo tabelle nuove dell app + una colonna vuota su AppCliente.
cd /d "%~dp0"
call npx prisma db execute --file prisma/sql/2026-11-13-app-v2.sql --schema prisma/schema.prisma
if errorlevel 1 (echo. & echo ERRORE: tabelle non create. & pause & exit /b 1)
call npx prisma generate
echo.
echo Tabelle App v2 create. Puoi chiudere.
pause
