const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.currentUser;

  if (!token) {
    return res.redirect('/login'); // Redirigir si no hay token
  }

  try {
    const decoded = jwt.verify(token, 'secreto'); // Verificar el token
    req.user = decoded; // Guardar los datos del usuario en req.user
    next(); // Continuar a la ruta si el token es válido
  } catch (error) {
    console.error(error);
    res.clearCookie('currentUser'); // Eliminar la cookie si el token es inválido
    return res.redirect('/login?error=Token inválido'); 
  }
};

module.exports = authenticateJWT;
