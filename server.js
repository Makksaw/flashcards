const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

let words = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.get('/createSet', (req, res) => {
    res.sendFile(__dirname + '/create.html', (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.get('/words', (req, res) => res.json({ words }));

app.post('/words', (req, res) => {
    const { originalWord, translatedWord } = req.body;
    words.push({ originalWord, translatedWord });
    res.status(201).json({ originalWord, translatedWord });
});

app.get('/learn', (req, res) => {});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
