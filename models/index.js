const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize);
db.bootcamps = require("./bootcamp.model.js")(sequelize);

db.users.belongsToMany(db.bootcamps, { through: "user_bootcamp" });
db.bootcamps.belongsToMany(db.users, { through: "user_bootcamp" });

module.exports = db;
