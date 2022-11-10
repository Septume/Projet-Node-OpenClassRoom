// création express
const express = require ('express');

const app = express();

app.use((req, res) => {
    res.json({ message: 'Ma requete'})
});

module.exports = app;