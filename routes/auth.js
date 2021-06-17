//rutas para autenticar usuarios

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {check} = require ('express-validator');
const auth = require('../middleware/auth');

//crea un usuario
//iniciar sesion
//api/auth
router.post('/', 
[ 
    check('email', 'Agrega un emaíl válido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})
],
authController.autenticarUsuario
);
//obtiene el usuario autenticado
router.get('/',
auth,
authController.usuarioAutenticado
);

module.exports = router;