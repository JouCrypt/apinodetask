const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req,res) =>{
    //revisar si hay errores 
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
  try {
 
    //crear nuevo proyecto

    const proyecto = new Proyecto(req.body);

    //guardar el creador via jwt
    proyecto.creador = req.usuario.id;
    //guardamos el proyecto
    proyecto.save();
 
    res.json(proyecto);
      
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }

}

exports.obtenerProyecto= async (req,res) =>{
    try {
        const proyecto = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});

        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProyecto = async (req,res) =>{
     //revisar si hay errores 
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
     //extraer informacion del proyecto
     const {nombre} = req.body;
     const nuevoProyecto = {};

     //si hay un nombre
     if(nombre){
         nuevoProyecto.nombre = nombre;
     }

     try {
        //revidar el id
        let proyecto = await Proyecto.findById(req.params.id);


        //si el proyecto existe
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});

        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no autorizado'});
         }

        //actualizar

        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set : nuevoProyecto}, {new:true});

        res.json({proyecto});

         
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
     }

}

exports.deleteProyecto = async (req,res) =>{
   

    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);


        //si el proyecto existe
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});

        }
        // verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Usuario no autorizado'});
         }

         //eliminar el proyecto

         proyecto = await Proyecto.findByIdAndRemove({_id: req.params.id});

         res.json({msg: 'Proyecto eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}
