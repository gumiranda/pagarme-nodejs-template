const mongoose = require('mongoose');

const schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const transactionModel = new schema(
  {
    transaction_id: { type: String },
    status: { type: String },
    authorization_code: { type: String },
    risk_level: { type: String },
    acquirer_id: { type: String },
    userId: { type: ObjectId, ref: 'User' },
    cardId: { type: ObjectId, ref: 'Card' },
    ativo: { type: Boolean, required: true, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

transactionModel.pre('save', (next) => {
  const agora = new Date();
  if (!this.dataCriacao) this.dataCriacao = agora;
  next();
});

module.exports = mongoose.model('Transaction', transactionModel);
