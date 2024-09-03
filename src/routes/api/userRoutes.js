const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios (GET /api/users)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID (GET /api/users/:id)
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Crear un nuevo usuario (POST /api/users)
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un usuario (PATCH /api/users/:id)
router.patch('/:id', getUser, async (req, res) => {
  try {
    const updatedUser = await res.user.set(req.body); 
    const result = await updatedUser.save();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un usuario (DELETE /api/users/:id)
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener un usuario por ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
