'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// connect Mongo DB w/ Mongoose
mongoose.connect(process.env.DB_URL);

// error messages for when mongoose cant connect to mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:') );
db.once('open', function () {
  console.log('Mongoose is connected');
});

// endpoint for get
app.get('/books', getBooks);
async function getBooks(request, response, next){
  try {
    // get books from mongo
    let allBooks = await Book.find({});
    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }

};

// endpoint to post
app.post('/books', addBook);
async function addBook(request, response, next){
  try {
    let createdBook = await Book.create(request.body)
    response.status(200).send(createdBook)
  } catch (error) {

   next (error);
}
}

// endpoint to delete
app.delete('/books/:id', deleteBook);
async function deleteBook(request, response, next){
  try {
    let { id } = request.params;
    await Book.findByIdAndDelete(id);
    response.status(200).send('book deleted');
  } catch (error) {
    next (error);
  }
}

// endpoint to update
app.put('/books/:bookID', updatedBook);
async function updatedBook(request, response, next){
  try {
    let id = request.params.bookID
    let data = request.body;
    let optionsObj = {new: true, overwrite: true };
    let updatedBook = await Book.findByIdAndUpdate(id, data, optionsObj); // (id,data,option boject {new: true, overwrite: true})
  } catch (error) {
    next (error);
  }
}


app.get ('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
