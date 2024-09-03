const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

// Configuraciones
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://<usuario>:<contraseña>@<tu-cluster>.mongodb.net/<nombre-base-datos>?retryWrites=true&w=majority'; // Reemplaza con tu URI 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware para manejar cookies

// Configuración de Handlebars
app.engine('hbs', handlebars({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// Conexión a MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/', require('./routes/authRoutes'));

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
