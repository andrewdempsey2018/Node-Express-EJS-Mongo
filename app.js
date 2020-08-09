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

//routes, admin add content
//app.get('/add-blog', (req, res) => {

//    const blog = new Blog({
//        title: 'girly firly',
//        snippet: 'slippedy sloppedy',
//        body: '1 swig 2 flig 3 crabo'
//    });

//    blog.save()
//        .then((result) => {
//            res.send(result);
//        })
//        .catch((err) => {
//            console.log(err);
//        })
//});

//app.get('/all-blogs', (req, res) => {
//    Blog.find()
//        .then((result) => {
//            res.send(result);
//        })
//        .catch((err) => {
//            console.log(err);
//        })
//});

//app.get('/single-blog', (req, res) => {
//    Blog.findById('5f2fca5bb64c76034038789f')
//        .then((result) => {
//            res.send(result);
//        })
//        .catch((err) => {
//            console.log(err);
//        })
//});

//routes, user navigate website

app.get('/', (req, res) => {

    //const blogs = [{
    //        title: 'Blog1 title',
    //        snippet: 'blog1 snippet snippet1 snippet etc1'
    //    },
    //    {
    //        title: 'Blog2 title',
    //        snippet: 'blog2 snippet snippet2 snippet etc2'
    //    },
    //    {
    //        title: 'Blog3 title',
    //        snippet: 'blog3 snippet snippet3 snippet etc3'
    //    },
    //];

    //res.render('index', {
    //    title: 'hello',
    //    blogs
    //});

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

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});