const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');

// Ruta para mostrar los datos del usuario (protegida)
router.get('/current', authenticateJWT, (req, res) => { 
  res.render('current', { user: req.user });
});

module.exports = router;
