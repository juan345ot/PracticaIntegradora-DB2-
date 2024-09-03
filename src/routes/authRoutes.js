const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
  // Si el usuario ya está logueado, lo redirigimos a /users/current
  if (req.cookies.currentUser) { 
    return res.redirect('/users/current'); 
  }
  res.render('login', { error: req.query.error });
});

// Ruta para manejar el inicio de sesión (POST)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/login?error=Credenciales inválidas');
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/login?error=Credenciales inválidas');
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });

    // Establecer la cookie 'currentUser' con el token JWT
    res.cookie('currentUser', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora de expiración

    // Redirigir al usuario a la página de perfil
    res.redirect('/users/current'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
