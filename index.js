const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');



//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();
//habilitar cors
app.use(cors());

//habilitar express.json
app.use(express.json({ extended: true}));

//setting
//puerto de la app
const Port = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Deginir la pagina principal
//app.get('/', (req, res) =>{
  //  res.send('Hola Mundo')
//});

//arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});