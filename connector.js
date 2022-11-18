const mongodb = require('mongodb');

const mongoURI = require("./config/keys")

let mongoose = require('mongoose');
//  Importing Mongoose Schema from schema.js
const { bookMovieSchema } = require('./models/schema')

//  Establishing connection between MongoDB and express.js server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;
