@echo off
REM App clienti FitPrimo: crea le due tabelle nuove (AppCliente, AppGiornata).
REM Solo CREATE TABLE IF NOT EXISTS: le tabelle esistenti non si toccano.
cd /d "%~dp0"
call npx prisma db execute --file prisma/sql/2026-11-12-app-clienti.sql --schema prisma/schema.prisma
if errorlevel 1 (echo. & echo ERRORE: tabelle non create. & pause & exit /b 1)
call npx prisma generate
echo.
echo Tabelle App clienti create. Puoi chiudere.
pause
