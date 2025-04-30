module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Notification", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  };
  