@echo off
echo ========================================
echo JobConnect - Application Startup
echo ========================================
echo.

echo Step 1: Checking PostgreSQL...
psql -U postgres -c "SELECT version();" > nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not running or not accessible
    echo Please start PostgreSQL service and try again
    pause
    exit /b 1
)
echo PostgreSQL is running!
echo.

echo Step 2: Creating database if not exists...
psql -U postgres -c "CREATE DATABASE jobconnect_db;" 2>nul
if %errorlevel% equ 0 (
    echo Database created successfully!
) else (
    echo Database already exists or creation failed
)
echo.

echo Step 3: Starting Backend...
cd jobconnect-backend
start "JobConnect Backend" cmd /k "mvn spring-boot:run"
echo Backend starting in new window...
echo Waiting 30 seconds for backend to start...
timeout /t 30 /nobreak > nul
cd ..
echo.

echo Step 4: Starting Frontend...
cd jobconnect-frontend
start "JobConnect Frontend" cmd /k "npm run dev"
echo Frontend starting in new window...
cd ..
echo.

echo ========================================
echo Application is starting!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
