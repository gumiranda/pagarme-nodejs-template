const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const usuario = require('../models/user-model');

module.exports = async (req,res,next) =>{
  const authHeader = req.headers.authorization;
  const [,token] = authHeader.split(' ');
  if(token){
    try{
let decoded = await jwt.verify(token,variables.Security.secretKey);
req.usuarioLogado = decoded;
let userExiste = await usuario.findById(req.usuarioLogado.user._id);
if(!userExiste){
  res.status(401).send({message:'Usuario não existe'});
  return;
}
next();
    } catch(e){
res.status(401).send({message:'Token é inválido'});
return;
    }
  } else {
    res.status(401).send({message:'Token deve ser informado'});
return;
  }
}
