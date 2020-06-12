require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const base = require('../bin/base/repository-base');

class userRepository {
  constructor() {
    this._base = new base('User');
    this._projection = 'nome email payDay type';
  }

  async authenticate(Email, Senha, flag) {
    const user = await this._base._model.findOne({ email: Email });
    const userR = await this._base._model.findOne(
      { email: Email },
      this._projection,
    );
    if (await bcrypt.compareSync(Senha, user.senha)) {
      return userR;
    }
    return null;
  }

  async IsEmailExiste(Email) {
    return await this._base._model.findOne({ email: Email }, this._projection);
  }

  async create(data, req) {
    const userCriado = await this._base.create(data);
    const userR = await this._base._model.findOne(
      { _id: userCriado._id },
      this._projection,
    );
    return userR;
  }

  async updatePayment(data, userid) {
    return await this._base.update(userid, { payDay: data });
  }

  async update(id, data, usuarioLogado) {
    if (usuarioLogado._id === id) {
      if (
        data.oldPassword !== data.senha &&
        data.oldPassword &&
        data.senha !== undefined &&
        data.senhaConfirmacao !== undefined &&
        data.senha === data.senhaConfirmacao
      ) {
        const user = await this._base._model.findOne({ _id: id });
        if (await bcrypt.compareSync(data.oldPassword, user.senha)) {
          const salt = await bcrypt.genSaltSync(10);
          const _hashSenha = await bcrypt.hashSync(data.senha, salt);
          let { nome } = user;
          let { email } = user;
          if (data.email) {
            email = data.email;
          }
          if (data.nome) {
            nome = data.nome;
          }
          const usuarioAtualizado = await this._base.update(id, {
            nome,
            email,
            senha: _hashSenha,
          });
          return this._base._model.findById(
            usuarioAtualizado._id,
            this._projection,
          );
        }
        return { message: 'Senha inválida' };
      }
    } else {
      return { message: 'Você não tem permissão para editar esse usuário' };
    }
  }

  async getAll() {
    return await this._base._model.find({}, this._projection);
  }

  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = userRepository;
