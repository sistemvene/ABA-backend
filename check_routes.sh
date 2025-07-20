#!/bin/bash
# Script para listar las rutas definidas en el servicio AUTH

SERVICE_PATH="/home/deploy/ABA-backend/services/auth/src"

echo "=========================================="
echo "  Buscando rutas en $SERVICE_PATH"
echo "=========================================="
echo

# Buscar definiciones de rutas en los archivos .js
grep -R --include="*.js" -nE "app\.(get|post|put|delete)|router\.(get|post|put|delete)" "$SERVICE_PATH" \
  | sed "s|$SERVICE_PATH/||" \
  | awk -F: '{printf "Archivo: %-40s  Línea: %-5s  Ruta: %s\n", $1, $2, $3}'

echo
echo "=========================================="
echo "  Revisión completada."
echo "=========================================="
