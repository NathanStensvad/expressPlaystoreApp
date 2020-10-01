const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const books = require('./books-data.js');
const playApps = require('./playstore.js');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
app.use(cors());

app.get('/books', (req, res) => {
    const { search = "", sort } = req.query;
  
    if (sort) {
      if (!['title', 'rank'].includes(sort)) {
        return res
          .status(400)
          .send('Sort must be one of title or rank');
      }
    }
  
    let results = books
          .filter(book =>
              book
                .title
                .toLowerCase()
                .includes(search.toLowerCase()));
  
    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  
    res
      .json(results);
  });

  //Module 4 Assignment Here

  app.get('/apps', (req, res) => {
    const { search = "", sort, genre = "" } = req.query

    if (sort) {
      if(!['Rating', 'App'].includes(sort)) {
        return res
          .status(400)
          .send("Sort must be rating or app")
      }
    }

    if (genre) {
      if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
        return res
          .status(400)
          .send("Genre must be Action, Puzzle, Strategy, Casual, Arcade, Card")
      }
    }

    let results = playApps
            .filter(playApp =>
              playApp
                .App
                .toLowerCase()
                .includes(search.toLowerCase())
            &&playApp
                .Genres
                .toLowerCase()
                .includes(genre.toLowerCase()));

    if (sort) {
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }

    res
      .json(results);

  });

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});