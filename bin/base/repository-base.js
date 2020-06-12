const mongoose = require('mongoose');

class baseRepository {
  constructor(model) {
    this._model = mongoose.model(model);
  }

  async create(data) {
    const modelo = new this._model(data);
    const resultado = await modelo.save();
    return resultado;
  }

  async update(id, data, usuarioLogado) {
    await this._model.findByIdAndUpdate(id, { $set: data });
    const resultado = await this._model.findById(id);
    return resultado;
  }

  async getAll() {
    return await this._model.find({});
  }

  async getMyAll(user) {
    return await this._model.find({ userId: user._id });
  }

  async delete(id) {
    return await this._model.findByIdAndDelete(id);
  }

  async getById(id) {
    return await this._model.findById(id);
  }
}

module.exports = baseRepository;
