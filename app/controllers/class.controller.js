const db = require("../models");
const Class = db.class;
const Op = db.Sequelize.Op;
// Create and Save a new Class
exports.create = async(req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Class
  const myClass = {
    department: req.body.department,
    courseNumber: req.body.courseNumber,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description,
  };
  // Save Class in the database
  try{
    const data = await Class.create(myClass);
    res.send(data);
  }
  catch(err){
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Class.",
    });
  }
  // Class.create(myClass)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Class.",
  //     });
  //   });
};
// Retrieve all Classes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Class.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving classes.",
      });
    });
};

// Find a single Class with an id
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Class.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Classes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving Classes for user with id=" + userId,
      });
    });
};
// Find a single Class with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Class.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Class with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Class with id=" + id,
      });
    });
};
// Update a Class by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Class.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Class was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Class with id=${id}. Maybe Class was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Class with id=" + id,
      });
    });
};
// Delete a Class with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Class.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Class was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Class with id=${id}. Maybe Class was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Class with id=" + id,
      });
    });
};
// Delete all Classes from the database.
exports.deleteAll = (req, res) => {
  Class.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Classes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all classes.",
      });
    });
};
