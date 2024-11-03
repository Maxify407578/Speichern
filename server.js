// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Express und Socket.IO initialisieren
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Statische Dateien im Ordner 'public'

io.on('connection', (socket) => {
    console.log('Ein Benutzer hat sich verbunden.');

    // Nachrichten empfangen und an alle Clients senden
    socket.on('chatMessage', (data) => {
        io.emit('chatMessage', data); // An alle Clients senden
    });

    socket.on('disconnect', () => {
        console.log('Ein Benutzer hat die Verbindung getrennt.');
    });
});

// Server starten
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
