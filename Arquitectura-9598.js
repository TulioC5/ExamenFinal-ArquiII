const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.write('¡Este es mi exámen final de Arqui II!');
    res.end();
});

server.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000/');
});


