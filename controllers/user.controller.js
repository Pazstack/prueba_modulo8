const db = require("../models");
const User = db.users;

// Crear y guardar un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
};

// Obtener un usuario por ID, incluyendo sus Bootcamps
exports.findUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: db.bootcamps });
        user ? res.json(user) : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

// Obtener todos los usuarios, incluyendo sus Bootcamps
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({ include: db.bootcamps });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

// Actualizar usuario por ID
exports.updateUserById = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, { where: { id: req.params.id } });
        updated ? res.json({ message: "Usuario actualizado" }) : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

// Eliminar un usuario por ID
exports.deleteUserById = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        deleted ? res.json({ message: "Usuario eliminado" }) : res.status(404).json({ message: "Usuario no encontrado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};
