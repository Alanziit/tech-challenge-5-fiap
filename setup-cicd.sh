#!/bin/bash

# Script de configuração da esteira CI/CD com Firebase
# Este script ajuda a configurar os secrets no GitHub automaticamente

set -e

echo "================================"
echo "Configuração CI/CD Firebase"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI não encontrada!${NC}"
    echo "Instale em: https://cli.github.com/"
    exit 1
fi

echo -e "${YELLOW}1. Verifique se está autenticado no GitHub${NC}"
gh auth status
echo ""

echo -e "${YELLOW}2. Confirme o ID do seu projeto Firebase${NC}"
read -p "ID do Projeto Firebase (ex: mindease-123456): " FIREBASE_PROJECT_ID

if [ -z "$FIREBASE_PROJECT_ID" ]; then
    echo -e "${RED}❌ Project ID não pode estar vazio!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}3. Caminho do arquivo Service Account JSON do Firebase${NC}"
read -p "Caminho do arquivo (ex: ./firebase-key.json): " FIREBASE_KEY_PATH

if [ ! -f "$FIREBASE_KEY_PATH" ]; then
    echo -e "${RED}❌ Arquivo não encontrado: $FIREBASE_KEY_PATH${NC}"
    exit 1
fi

# Ler o conteúdo do arquivo JSON
FIREBASE_SERVICE_ACCOUNT=$(cat "$FIREBASE_KEY_PATH")

echo ""
echo -e "${GREEN}✓ Adicionando secrets ao GitHub...${NC}"

# Adicionar secrets ao repositório
gh secret set FIREBASE_PROJECT_ID --body "$FIREBASE_PROJECT_ID"
gh secret set FIREBASE_SERVICE_ACCOUNT_JSON --body "$FIREBASE_SERVICE_ACCOUNT"

echo -e "${GREEN}✓ Atualizando .firebaserc...${NC}"
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$FIREBASE_PROJECT_ID"
  }
}
EOF

echo ""
echo -e "${GREEN}✅ Configuração completa!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Faça push das alterações: git add . && git commit -m 'Setup CI/CD' && git push"
echo "2. Vá para Actions no GitHub para verificar o workflow"
echo ""
