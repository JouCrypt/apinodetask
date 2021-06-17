const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({

nombre:{
    type:String,
    requied: true,
    trim:true
},

email:{
    type:String,
    requied: true,
    trim:true,
    unique:true
},

password:{
    type:String,
    requied: true,
    trim:true
},

registro:{
  type: Date,
  default: Date.now()
}

});

module.exports = mongoose.model('Usuario', UsuariosSchema);