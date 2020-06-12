exports.post = async (repository, validationContract, req, res) => {
  try {
    const data = req.body;
    if (!validationContract.isValid()) {
      res
        .status(400)
        .send({
          message: 'Existem dados inválidos na sua requisição',
          validation: validationContract.errors(),
        })
        .end();
      return;
    }
    const resultado = await repository.create(data, req);
    res.status(201).send(resultado);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error', error: e });
  }
};

exports.put = async (repository, validationContract, req, res) => {
  try {
    const data = req.body;
    if (!validationContract.isValid()) {
      res
        .status(400)
        .send({
          message: 'Existem dados inválidos na sua requisição',
          validation: validationContract.errors(),
        })
        .end();
      return;
    }
    const resultado = await repository.update(
      req.params.id,
      data,
      req.usuarioLogado.user,
    );
    res.status(202).send(resultado);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error', error: e });
  }
};
exports.get = async (repository, req, res) => {
  try {
    const resultado = await repository.getAll();
    res.status(200).send(resultado);
  } catch (erro) {
    res.status(500).send({ message: 'Erro no processamento', error: erro });
  }
};
exports.getMyAll = async (repository, req, res) => {
  try {
    const resultado = await repository.getMyAll(req.usuarioLogado.user);
    res.status(200).send(resultado);
  } catch (erro) {
    res.status(500).send({ message: 'Erro no processamento', error: erro });
  }
};
exports.delete = async (repository, req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const resultado = await repository.delete(id, req.usuarioLogado);
      if (resultado !== 'Operação Inválida') {
        res.status(200).send({ message: 'Registro excluído com sucesso' });
      } else {
        res.status(401).send({ message: 'Operação inválida' });
      }
    } else {
      res.status(500).send({ message: 'O parametro id precisa ser informado' });
    }
  } catch (e) {
    res.status(500).send({ message: 'Internal server error', error: e });
  }
};
