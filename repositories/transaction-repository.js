require('../models/transaction-model');
const base = require('../bin/base/repository-base');

class transactionRepository {
  constructor() {
    this._base = new base('Transaction');
  }

  async getMyAll(user) {
    return await this._base.getMyAll(user);
  }

  async delete(id, user) {
    const model = await this._base.getById(id);
    if (model.userId.toString() === user._id) {
      return await this._base.delete(id);
    }
    return 'Operação Inválida';
  }

  async create(data) {
    const transaction = await this._base.create(data);
    return transaction;
  }
}
module.exports = transactionRepository;
