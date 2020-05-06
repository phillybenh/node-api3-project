const express = require('express');
const router = express.Router();
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb');

router.post('/', (req, res) => {
  userDB.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    })
});

router.post('/:id/posts', (req, res) => {
  postDB.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    })
});

router.get('/', (req, res) => {
  userDB.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved.",
      });
    })
});

router.get('/:id', (req, res) => {
  userDB.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's information could not be retrieved."
      });
    });
});

router.get('/:id/posts', (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's posts could not be retrieved."
      });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
