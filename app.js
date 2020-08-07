const express = require('express');

//express app
const app = express();

//make ejs the view engine to be used
app.set('view engine', 'ejs');

const port = 3000;

//listen for requests
app.listen(port);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});