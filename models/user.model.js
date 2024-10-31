const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
    const User = sequelize.define("User", {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8, 100] }
        }
    });

    // Hook para encriptar la contraseña antes de crear el usuario
    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    return User;
};