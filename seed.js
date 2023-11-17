'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');
/* const bookSchema = new Schema ( {
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
});
*/

async function seed () {
  await Book.create({
    title: 'book1',
    description: 'book1 description',
    status: true 
  });
  await Book.create({
    title: 'book2',
    description: 'book2 description',
    status: true
  });
  await Book.create({
    title: 'book3',
    description: 'book3 description',
    status: true
  });

  mongoose.disconnect();
}

seed();