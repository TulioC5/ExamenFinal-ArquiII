FROM node:latest
WORKDIR /app

# Copia solo los archivos de package.json y package-lock.json
COPY package*.json ./

# Elimina cualquier instalación previa de sqlite3 y reinstala las dependencias
RUN npm install sqlite3 && npm install

# Luego, copia el resto del código de la aplicación
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
