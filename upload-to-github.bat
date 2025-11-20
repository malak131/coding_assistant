@echo off
echo ========================================
echo Uploading to GitHub Repository
echo ========================================
echo.

REM Initialize git repository
echo [1/6] Initializing Git repository...
git init
echo.

REM Add all files
echo [2/6] Adding all files...
git add .
echo.

REM Create initial commit
echo [3/6] Creating initial commit...
git commit -m "Initial commit: E-Commerce Website project"
echo.

REM Rename branch to main
echo [4/6] Renaming branch to main...
git branch -M main
echo.

REM Add remote origin
echo [5/6] Adding remote origin...
git remote add origin https://github.com/Malaika8150/my_first_proect.git
echo.

REM Push to GitHub
echo [6/6] Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo Upload Complete!
echo ========================================
echo Your project is now available at:
echo https://github.com/Malaika8150/my_first_proect
echo.
pause
