FROM node:latest
WORKDIR /app

# Copia solo los archivos de package.json y package-lock.json primero
COPY package*.json ./

# Elimina cualquier instalación previa de sqlite3 y reinstala
RUN npm install sqlite3 && npm install

# Copia el resto del código fuenteeee
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
