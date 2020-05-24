'use strict';

const repository = require('../repositories/card-repository');
const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function cardController(){

}

cardController.prototype.get = async (req,res) =>{
  ctrlBase.getMyAll(_repo,req,res);
};
cardController.prototype.delete = async (req,res) => {
  ctrlBase.delete(_repo,req,res);
};

module.exports = cardController;

