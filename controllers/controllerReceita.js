const Receita = require("../models/models_nosql/receita");

module.exports = {
  async getCreate(req, res) {
    res.render("receita/receitaCreate");
  },
  async postCreate(req, res) {
    const { nome, ingredientes, preparo } = req.body;
    const receita = new Receita({ nome, ingredientes, preparo });
    await receita.save();
    res.redirect("/home");
  },
  async getList(req, res) {
    Receita.find().then((receitas) => {
      res.render("receita/receitaList", {
        receitas: receitas.map((receitas) => receitas.toJSON()),
      });
    });
  },
  async getEdit(req, res) {
    await Receita.findOne({ _id: req.params.id }).then((receitas) => {
      res.render("receita/receitaEdit", { receitas: receitas.toJSON() });
    });
  },
  async postEdit(req, res) {
    await Receita.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.redirect("/receitaList");
  },
  async getDelete(req, res) {
    await Receita.findOneAndRemove({ _id: req.params.id });
    res.redirect("/receitaList");
  },
};
