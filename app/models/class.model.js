module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define("class", {
    title: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    roomNumber: {
      type: Sequelize.STRING,
    },
    professor: {
      type: Sequelize.STRING,
    },
    term: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    grade: {
      type: Sequelize.STRING,
    },
  });
  return Class;
};
