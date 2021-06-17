const express = require('express');
const tareasController = require('../controllers/tareasController');
const auth = require('../middleware/auth');
const router = express.Router();
const {check} = require('express-validator');

//crea tareas
//api/tareas
router.post('/',
auth, 
[
    check('nombre', 'EL nombre de la tarea es obligatorio').not().isEmpty(),
    check('proyecto', 'EL proyecto es obligatorio').not().isEmpty()
],
tareasController.crearTarea
);
//obtener las tareas
router.get('/',
auth,

tareasController.obternerTareas
);

//actualizar tareas
router.put('/:id',
auth,
[
    
    check('proyecto', 'EL proyecto es obligatorio').not().isEmpty()
],
tareasController.actualizarTarea
)

//borrar tarea
router.delete('/:id',
auth,
tareasController.eliminarTarea
)

module.exports = router;