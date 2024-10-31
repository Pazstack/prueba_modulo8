const db = require("../models");
const Bootcamp = db.bootcamps;

// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json(bootcamp);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el Bootcamp", error });
    }
};

// Agregar un usuario al Bootcamp
exports.addUser = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByPk(req.params.bootcampId);
        const user = await db.users.findByPk(req.body.userId);
        await bootcamp.addUser(user);
        res.json({ message: "Usuario agregado al Bootcamp" });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el usuario al Bootcamp", error });
    }
};

// Obtener un Bootcamp por ID incluyendo sus Usuarios
exports.findById = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByPk(req.params.id, { include: db.users });
        bootcamp ? res.json(bootcamp) : res.status(404).json({ message: "Bootcamp no encontrado" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el Bootcamp", error });
    }
};

// Obtener todos los Bootcamps incluyendo sus Usuarios
exports.findAll = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({ include: db.users });
        res.json(bootcamps);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los Bootcamps", error });
    }
};
