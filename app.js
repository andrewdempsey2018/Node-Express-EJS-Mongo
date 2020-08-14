const express = require('express');

//express app
const app = express();

const mongoose = require('mongoose');

//add dotenv for reading env variables from the .env file
require('dotenv').config();

//create an instance of the blog model
const Blog = require('./models/blog');

//mongo db connection string
const dbURI = process.env.DB_URI;

//for easier parsing of data passed to server
app.use(express.urlencoded({extended: true}));

/* Connect to the database via mongoose. Returns a promise
{ useNewUrlParser: true, useUnifiedTopology: true } disables a mondlo deprecationWarning */

mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
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

    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {

    blog = new Blog(req.body);
    
    blog.save()
        .then((response) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
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