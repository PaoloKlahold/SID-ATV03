#!/bin/bash

# Torna as portas 3000 e 5000 públicas no Codespaces (ignora erro se não estiver em Codespaces)
gh codespace ports visibility 3000:public 5000:public 2>/dev/null || true

# Inicia o backend
echo "Iniciando backend..."
cd backend
npm install
npm start &
cd ..

# Inicia o frontend
echo "Iniciando frontend..."
cd frontend
npm install
npm start &
cd ..

# Aguarda ambos os processos terminarem
wait