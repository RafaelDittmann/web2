const Animais = require("../models/models_nosql/animais");

module.exports = {
  //get create
  async getCreate(req, res) {
    res.render("animais/animaisCreate");
  },

  //post create
  async postCreate(req, res) {
    const { nome, especie, sexo } = req.body;
    const animais = new Animais({ nome, especie, sexo });
    await animais.save();
    res.redirect("/home");
  },

  //get List
  async getList(req, res) {
    Animais.find().then((animais) => {
      res.render("animais/animaisList", {
        animais: animais.map((animais) => animais.toJSON()),
      });
    });
  },

  //get Edit
  async getEdit(req, res) {
    await Animais.findOne({ _id: req.params.id }).then((animais) => {
      res.render("animais/AnimaisEdit", { animais: animais.toJSON() });
    });
  },

  //post Edit
  async postEdit(req, res) {
    await Animais.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.redirect("/animaisList");
  },

  //Get Delete
  async getDelete(req, res) {
    await Animais.findOne({ _id: req.params.id }).then((animais => {
      res.render("animais/animaisDelete", {animais: animais.toJSON()});
    }));
  },

  //post Delete
  async postDelete(req, res){
    await Animais.findOneAndRemove({_id: req.params.id});
    res.redirect("/animaisList");
  }
};
