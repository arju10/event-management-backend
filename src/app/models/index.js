const config = require("../../config/config");
const { Sequelize, DataTypes } = require("sequelize");
console.log(config);

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const Event = require("../modules/event/event")(sequelize, DataTypes);
const Participant = require("../modules/participant/participant")(sequelize, DataTypes);

Event.hasMany(Participant, { foreignKey: "eventId" });
Participant.belongsTo(Event, { foreignKey: "eventId" });

module.exports = { sequelize, Event, Participant };
