FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
CMD ["Node", "app.js"]
EXPOSE 3000