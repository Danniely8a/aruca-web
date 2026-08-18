@echo off
REM import_cuentas_auto.bat - Ejecuta el import de cuentas por cobrar
REM Ejecutado por Task Scheduler varias veces al dia

set PYTHON=C:\Users\caja.02\AppData\Local\Programs\Python\Python311-32\python.exe
set SCRIPT_DIR=C:\Users\caja.02\Desktop\aruca\aruca-web\scripts
set LOG_DIR=C:\Users\caja.02\Desktop\aruca\aruca-web\logs

if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

set LOGFILE=%LOG_DIR%\import_cuentas.log

echo ========================================== >> "%LOGFILE%"
echo [Import Cuentas por Cobrar] Iniciando... >> "%LOGFILE%"

"%PYTHON%" "%SCRIPT_DIR%\extract_vendor_clients.py" >> "%LOGFILE%" 2>&1

"%PYTHON%" "%SCRIPT_DIR%\import_cuentas.py" --local >> "%LOGFILE%" 2>&1

echo [Import Cuentas por Cobrar] Completado. >> "%LOGFILE%"
echo. >> "%LOGFILE%"
