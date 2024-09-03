const config = require("../../config/config");
const { Sequelize, DataTypes } = require("sequelize");
console.log(config);

const sequelize = new Sequelize(
  config.development.database || "sql12729063",
  config.development.username || "sql12729063",
  config.development.password || "NPH9kbIuNT",
  {
    host: config.development.host || "sql12.freesqldatabase.com",
    dialect: config.development.dialect || "mysql",
  }
);


const Event = require("../modules/event/event")(sequelize, DataTypes);
const Participant = require("../modules/participant/participant")(sequelize, DataTypes);

Event.hasMany(Participant, { foreignKey: "eventId" });
Participant.belongsTo(Event, { foreignKey: "eventId" });

module.exports = { sequelize, Event, Participant };
