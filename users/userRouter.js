const express = require('express');
const router = express.Router();
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb');

const chalk = require('chalk');
const error = chalk.bold.bgRedBright.black;
const success = chalk.bgGreen.black('*Success*')
const log = console.log;

router.post('/', validateUser, (req, res) => {
  userDB.insert(req.body)
    .then(user => {
      log(success);
      res.status(201).json(user)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  postDB.insert(req.body)
    .then(post => {
      log(success);
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
      log(success);
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved.",
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
    .then(user => {
      log(success);
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's information could not be retrieved."
      });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(userPosts => {
      log(success);
      res.status(200).json(userPosts)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's posts could not be retrieved."
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  userDB.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        log(success);
        res.status(200).json({
          message: "The user has been deleted."
        });
      } else {
        log(error('Status(404): A user with the specified ID does not exist.'))
        res.status(404).json({
          message: "A user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be retrieved."
      });
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  userDB.update(req.params.id, req.body)
    .then(update => {
      log(success);
      res.status(200).json(update)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's information could not be updated."
      });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  userDB.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = req.params.id;
        next();
      } else {
        log(error('Status(400): invalid user id'))
        res.status(400).json({
          message: "invalid user id"
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's information could not be retrieved."
      });
    });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    // console.log(Object.keys(req.body).length) // trickytricky
    if (req.body.name) {
      next();
    } else {
      log(error('Status(400): missing required name field'))
      res.status(400).json({
        message: "missing required name field"
      });
    }
  } else {
    log(error('Status(400): missing user data'))
    res.status(400).json({
      message: "missing user data"
    });
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    if (req.body.text) {
      next();
    } else {
      log(error('Status(400): missing required text field'))
      res.status(400).json({
        message: "missing required text field"
      });
    }
  } else {
    log(error('Status(400): missing post data'))
    res.status(400).json({
      message: "missing post data"
    });
  }
}

module.exports = router;
