module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    department: {
      type: Sequelize.STRING,
    },
    courseNumber: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    },
    hours: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Class;
};
