const express = require('express');

//express app
const app = express();

//make ejs the view engine to be used
app.set('view engine', 'ejs');

const port = 3000;

//listen for requests
app.listen(port);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root:   __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root:   __dirname });
});

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root:   __dirname });
});