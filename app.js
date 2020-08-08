const express = require('express');

//express app
const app = express();

const mongoose = require('mongoose');

//add dotenv for reading env variables from the .env file
require('dotenv').config();

//mongo db connection string
const dbURI = process.env.DB_URI;

/* Connect to the database via mongoose. Returns a promise
{ useNewUrlParser: true, useUnifiedTopology: true } disables a mondlo deprecationWarning */

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

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