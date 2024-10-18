const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuración del body-parser para leer datos JSON en las solicitudes
app.use(bodyParser.json());

// Conexión a SQLite en memoria
const db = new sqlite3.Database(':memory:');

// Crear la tabla de usuarios
db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");
});

// Endpoint para crear un nuevo usuario
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Nombree y correo electrónico son requeridos' });
    }

    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run(name, email, function (err) {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el usuario' });
        }
        res.status(201).json({ id: this.lastID, name, email });
    });
    stmt.finalize();
});

// Endpoint para obtener todos los usuarios
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json({ users: rows });
    });
});

// Endpoint para obtener un usuario por su ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(row);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js ejecutándose en http://localhost:${port}`);
});