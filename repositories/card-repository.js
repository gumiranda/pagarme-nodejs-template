require('../models/card-model');
const base = require('../bin/base/repository-base');

class cardRepository {
  constructor() {
    this._base = new base('Card');
  }

  async getMyAll(user) {
    return await this._base.getMyAll(user);
  }

  async getById(id) {
    return await this._base.getById(id);
  }

  async delete(id, user) {
    const model = await this._base.getById(id);
    if (model.userId.toString() === user._id) {
      return await this._base.delete(id);
    }
    return 'Operação Inválida';
  }

  async create(data) {
    const card = await this._base.create(data);
    return card;
  }
}
module.exports = cardRepository;
