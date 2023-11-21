'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');


const app = express();
app.use(cors());

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

// endpoint, currently not working
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

app.get ('*', (request, response) => {
  response.status(404).send('Not available');
});

app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
