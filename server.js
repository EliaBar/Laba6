const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

const DATA_FILE = './data.json';

app.use(express.static(__dirname)); 
app.use(bodyParser.json()); 

app.post('/saveData', (req, res) => {
    const { title, content } = req.body;

    console.log('Отримано дані:', req.body); 

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    data.push({ title, content });

    console.log('Збережені дані:', data); 
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.status(200).send({ message: 'Дані успішно збережено' });
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});