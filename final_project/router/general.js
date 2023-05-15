const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    let author = req.params.author
    const map = new Map();
    let book = null
    let len = Object.keys(books)
    Object.keys(books).forEach((key) => {
        map.set(key, books[key]);
    });
    len.forEach(val => {
        if (map.get(val)['author'] == author) {
            book = map.get(val)
        }
    })
    return res.status(300).json(book);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let title = req.params.title
    const map = new Map();
    let book = null
    let len = Object.keys(books)
    Object.keys(books).forEach((key) => {
        map.set(key, books[key]);
    });
    len.forEach(val => {
        if (map.get(val)['title'] == title) {
            book = map.get(val)
        }
    })
    return res.status(300).json(book);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    
    
    return res.status(300).json(books[req.params.isbn]['reviews']);
});

module.exports.general = public_users;
