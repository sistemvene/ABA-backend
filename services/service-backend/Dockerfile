FROM node:20-alpine

WORKDIR /app

# Copia package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala dependencias en modo producción
RUN npm ci --omit=dev

# Copia el código fuente
COPY src ./src

# Expone el puerto definido en ENV
EXPOSE 3000

# Arranca la app
CMD ["node", "src/index.js"]
