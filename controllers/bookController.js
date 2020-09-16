const Book = require('../models/Book');

function create(req, res) {
  Book.create(req.body)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.json(err);
    });
}

function index(req, res) {
  Book.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
}

function find(req, res) {
  Book.findOne({ name: req.params.name })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
}

function update(req, res) {
  Book.updateOne({ name: req.params.name }, req.body)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
}

function destroy(req, res) {
  Book.deleteOne({ name: req.params.name }).then((doc) => {
    res.json(doc);
  });
}

module.exports = {
  index,
  create,
  find,
  update,
  destroy,
};
