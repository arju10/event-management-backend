module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    "Participant",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      group: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      eventId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Events",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Participant.associate = (models) => {
    Participant.belongsTo(models.Event, { foreignKey: "eventId" });
  };

  return Participant;
};
