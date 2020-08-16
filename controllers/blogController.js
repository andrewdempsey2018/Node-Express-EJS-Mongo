//create an instance of the blog model
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({
            createdAt: -1
        })
        .then((result) => {
            res.render('index', {
                blogs: result
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_create_get = (req, res) => {
    res.render('create');
}

const blog_create_post = (req, res) => {
    blog = new Blog(req.body);

    blog.save()
        .then((response) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {
                blog: result
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_details,
    blog_delete
}