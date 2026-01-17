@echo off
REM Script de configuração da esteira CI/CD com Firebase (Windows)
REM Este script ajuda a configurar os secrets no GitHub automaticamente

setlocal enabledelayedexpansion

echo ================================
echo Configuracao CI/CD Firebase
echo ================================
echo.

REM Verificar se gh CLI está instalado
where gh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] GitHub CLI nao encontrada!
    echo Instale em: https://cli.github.com/
    exit /b 1
)

echo [INFO] Verificando autenticacao no GitHub...
gh auth status
echo.

echo [INFO] Digite o ID do seu projeto Firebase
set /p FIREBASE_PROJECT_ID="ID do Projeto Firebase (ex: mindease-123456): "

if "!FIREBASE_PROJECT_ID!"=="" (
    echo [ERRO] Project ID nao pode estar vazio!
    exit /b 1
)

echo.
echo [INFO] Caminho do arquivo Service Account JSON do Firebase
set /p FIREBASE_KEY_PATH="Caminho do arquivo (ex: firebase-key.json): "

if not exist "!FIREBASE_KEY_PATH!" (
    echo [ERRO] Arquivo nao encontrado: !FIREBASE_KEY_PATH!
    exit /b 1
)

echo.
echo [INFO] Adicionando secrets ao GitHub...

gh secret set FIREBASE_PROJECT_ID --body "!FIREBASE_PROJECT_ID!"
for /f "delims=" %%A in ('type "!FIREBASE_KEY_PATH!"') do set "line=%%A" & set FIREBASE_SERVICE_ACCOUNT=!FIREBASE_SERVICE_ACCOUNT!!line!
gh secret set FIREBASE_SERVICE_ACCOUNT_JSON --body "!FIREBASE_SERVICE_ACCOUNT!"

echo [INFO] Atualizando .firebaserc...
(
    echo {
    echo   "projects": {
    echo     "default": "!FIREBASE_PROJECT_ID!"
    echo   }
    echo }
) > .firebaserc

echo.
echo [SUCESSO] Configuracao completa!
echo.
echo Proximos passos:
echo 1. Faca push das alteracoes: git add . && git commit -m "Setup CI/CD" && git push
echo 2. Va para Actions no GitHub para verificar o workflow
echo.

pause
