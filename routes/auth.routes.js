// auth.routes.js
const authController = require("../controllers/auth.controller.js");

module.exports = (app) => {
    // Ruta para pruebas
    app.get("/", (req, res) => {
        res.send("El servidor está funcionando.");
    });

    app.post("/api/signup", authController.signup);
    app.post("/api/signin", authController.signin);
};
