const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const authMiddleware = require("./middlewares/auth.js"); // Importar el middleware

const app = express();
app.use(bodyParser.json());

// Sincronizar la base de datos
db.sequelize.sync({ force: true }).then(() => {
    console.log("La base de datos está sincronizada.");
});

// Rutas de autenticación
require("./routes/auth.routes.js")(app); 

// Rutas de usuarios (protegidas)
const userController = require("./controllers/user.controller");
app.post("/users", authMiddleware.verifyToken, userController.createUser);
app.get("/users", authMiddleware.verifyToken, userController.findAll);
app.get("/users/:id", authMiddleware.verifyToken, userController.findUserById);
app.put("/users/:id", authMiddleware.verifyToken, userController.updateUserById);
app.delete("/users/:id", authMiddleware.verifyToken, userController.deleteUserById);

// Rutas de Bootcamps
const bootcampController = require("./controllers/bootcamp.controller");
app.post("/bootcamps", authMiddleware.verifyToken, bootcampController.createBootcamp); // Protegido
app.get("/bootcamps", bootcampController.findAll); // Público
app.get("/bootcamps/:id", authMiddleware.verifyToken, bootcampController.findById); // Protegido
app.post("/bootcamps/:bootcampId/addUser", authMiddleware.verifyToken, bootcampController.addUser); // Protegido

// Configurar el servidor en el puerto 8080
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}.`);
});
