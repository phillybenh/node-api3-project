const express = require('express');
const router = express.Router();
const userDB = require('../users/userDb');
const postDB = require('./postDb');

const chalk = require('chalk');
const error = chalk.bold.bgRedBright.black;
const success = chalk.bgGreen.black('*Success*')
const log = console.log;

router.get('/', (req, res) => {
  postDB.get()
    .then(post => {
      log(success);
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error getting the posts"
      })
    })});

router.get('/:id', validatePostId, (req, res) => {
  postDB.getById(req.params.id)
    .then(post => {
      log(success);
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });});

router.delete('/:id', validatePostId, (req, res) => {
  postDB.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        log(success);
        res.status(200).json({
          message: "The post has been deleted."
        });
      } else {
        log(error('Status(404): A post with the specified ID does not exist.'))
        res.status(404).json({
          message: "A post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be retrieved."
      });
    })});

router.put('/:id', validatePostId, (req, res) => {
  postDB.update(req.params.id, req.body)
    .then(update => {
      log(success);
      res.status(200).json(update)
    })
    .catch(error => {
      res.status(500).json({
        error: "The user's information could not be updated."
      });
    });});

// custom middleware

function validatePostId(req, res, next) {
  postDB.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = req.params.id;
        next();
      } else {
        log(error('Status(400): invalid post id'))
        res.status(400).json({
          message: "invalid post id"
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post's information could not be retrieved."
      });
    });}

module.exports = router;
