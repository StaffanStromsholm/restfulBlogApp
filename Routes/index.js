const express = require('express');
const router = express.Router();
const Blog = require('../models/blogpost');
const passport = require('passport');
const User = require("../models/user")

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('error', 'You need to be logged in to do that');
    res.redirect("/login");
}

router.get("/", (req, res) => {
    res.redirect("/blogs")
})

//show index page
router.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log("error")
        } else {
            console.log(blogs)
            res.render("index", { blogs: blogs })
        }
    })
})

//show new post page
router.get("/blogs/new", isLoggedIn, (req, res) => {
    res.render("new");
})

//create new blogpost
router.post("/blogs", isLoggedIn, (req, res) => {
    //get data from form and add to blogs array
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;

    const newBlogpost = { title: title, image: image, body: body }
    //create a new blog and save to DB
    Blog.create(newBlogpost, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            //redirect back to blogs page
            console.log(newlyCreated);
            res.redirect("/blogs");
        }
    })
})

//show blogpost
router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log("error")
        } else {
            res.render("show", { blog: blog })
        }
    })
})

//edit blogpost
router.get("/blogs/:id/edit", isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if (err) {
            console.log(err)
        } else {
            res.render("edit", { blog: blog })
        }
    })
})

//update blogpost
router.put("/blogs/:id", isLoggedIn, (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
        if (err) {
            console.log(err)
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//delete blogpost
router.delete("/blogs/:id", isLoggedIn, (req, res) => {
    Blog.findByIdAndRemove(req.params.id, err => {
        if(err) {
            console.log(err)
        } else {
            res.redirect("/blogs")
        }
    })
})

// =======================
// SIGN UP and LOGIN logic
//========================

//show register form
router.get("/register", function (req, res) {
    res.render("register");
})

//handle sign up logic
router.post("/register", function (req, res) {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/blogs")
        })
    })
})

//show login form
router.get("/login", (req, res) => {
    res.render("login");
})

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    }), function (req, res) {
    });

//handle logout logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/blogs");
})


module.exports = router;