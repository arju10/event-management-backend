module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Event.associate = (models) => {
    Event.hasMany(models.Participant, { foreignKey: "eventId" });
  };

  return Event;
};
