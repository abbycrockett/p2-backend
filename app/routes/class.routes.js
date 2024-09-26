module.exports = (app) => {
  const classes = require("../controllers/class.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Class group
  router.post("/", classes.create);

  // Retrieve all classes
  router.get("/", classes.findAll);

  // Retrieve all Classes for user
  router.get("/userClass/:userId", classes.findAllForUser);

  // Retrieve a single class with id
  router.get("/:id",  classes.findOne);

  // Update a Class with id
  router.put("/:id", classes.update);

  // Delete a Class with id
  router.delete("/:id", classes.delete);

  // Delete all Classes
  router.delete("/",  classes.deleteAll);

  app.use("/class/classes", router);
};
