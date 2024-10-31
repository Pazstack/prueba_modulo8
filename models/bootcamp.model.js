const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Bootcamp", {
        title: { type: DataTypes.STRING, allowNull: false },
        cue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 5, max: 10 }
        },
        description: { type: DataTypes.STRING, allowNull: false }
    });
};
