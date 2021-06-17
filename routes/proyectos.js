const express = require('express');
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const router = express.Router();
const {check} = require('express-validator');

//crea proyectos
//api/proyectos
router.post('/',
auth, 
[
    check('nombre', 'EL nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.crearProyecto
);
router.get('/',
auth, 
proyectoController.obtenerProyecto
);
router.put('/:id',
auth, 
[
    check('nombre', 'EL nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto
);
router.delete('/:id',
auth, 
proyectoController.deleteProyecto
);

module.exports = router;