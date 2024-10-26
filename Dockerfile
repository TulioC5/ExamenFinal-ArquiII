FROM node:latest
WORKDIR /app

COPY package*.json ./
RUN npm install  # Instala las dependencias dentro del contenedor Docker

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
