const Tareas = require('../models/Tareas');
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator');

//crea un nueva tarea
exports.crearTarea = async (req,res)=>{
     //revisar si hay errores 
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
        //extraer el proyecto y probar si existe
        const {proyecto} = req.body;

   try {
       
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no autorizado'});
         }
         //creamos la tarea
         const tarea = new Tareas(req.body);
         await tarea.save();

         res.json({tarea});
       
   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error');
   }

}

//buscar las tareas
exports.obternerTareas = async (req,res) => {

        try {
            //extraer el proyecto y probar si existe
        const {proyecto} = req.query;
        

        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no autorizado'});
         }

         //obtener las tareas por proyecto
         const tareas = await Tareas.find({proyecto}).sort({creado:1});
         res.json({tareas});
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }

}

exports.actualizarTarea = async (req,res) =>{
        //revisar si hay errores 
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        try {
             //extraer el proyecto y probar si existe
        const {proyecto, nombre, estado} = req.body;

        //si la tarea existe o no
        let tareaExiste = await Tareas.findById(req.params.id);

        if(!tareaExiste){
            res.status(404).json({msg: 'Tarea no encontrada'});
        }

        const existeProyecto = await Proyecto.findById(proyecto);
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no autorizado'});
         }

         //crear un nuevo objeto con la nueva informacion
         const nuevaTarea ={};
             {nuevaTarea.nombre = nombre;}

             {nuevaTarea.estado = estado;}

        //guardar tareas

        let tarea = await Tareas.findOneAndUpdate({_id: req.params.id}, {$set: nuevaTarea}, {new:true});
         res.json({tarea});
         
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }

}

exports.eliminarTarea = async (req,res) =>{

    try {
         //extraer el proyecto y probar si existe
         const {proyecto} = req.query;

         //si la tarea existe o no
         let tareaExiste = await Tareas.findById(req.params.id);

         if(!tareaExiste){
             res.status(404).json({msg: 'Tarea no encontrada'});
         }

         const existeProyecto = await Proyecto.findById(proyecto);
         //revisar si el proyecto actual pertenece al usuario autenticado
         if(existeProyecto.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg: 'Usuario no autorizado'});
          }


          //eliminar

          tarea = await Tareas.findByIdAndRemove({_id: req.params.id});

          res.json({msg: 'Tarea eliminada'});

        
        
    } catch (error) {
        console.log(error);
            res.status(500).send('Hubo un error');
    }
}