const express = require('express');

//express app
const app = express();

const mongoose = require('mongoose');

//mongo db connection string
const dbURI = 'mongodb+srv://andrew2020:GE777GzWIPnIrhYq@andrewcluster-igjjx.mongodb.net/node-tuts?retryWrites=true&w=majority';
//andrew2020
//GE777GzWIPnIrhYq
//node-tuts

//make ejs the view engine to be used
app.set('view engine', 'ejs');

const port = 3000;

//listen for requests
app.listen(port);

//set a static folder
app.use(express.static('public'));

app.get('/', (req, res) => {

    const blogs = [
        { title: 'Blog1 title', snippet: 'blog1 snippet snippet1 snippet etc1' },
        { title: 'Blog2 title', snippet: 'blog2 snippet snippet2 snippet etc2' },
        { title: 'Blog3 title', snippet: 'blog3 snippet snippet3 snippet etc3' },
    ];

    res.render('index', { title: 'hello', blogs });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});