const Sequelize = require("sequelize");
const db = require("../config/db_sequelize");
const path = require("path");
const { Usuario } = require("../config/db_sequelize");

/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/

module.exports = {
  //get login
  async getLogin(req, res) {
    res.render("usuario/login", { layout: "noMenu.handlebars" });
  },

  //post login
  async postLogin(req, res) {
    var user = {
      login: req.body.login,
    };
    db.Usuario.findAll({
      where: { login: req.body.login, senha: req.body.senha },
    }).then((usuarios) => {
      if (usuarios.length > 0) {
        req.session.login = req.body.login;
        res.redirect("/home");
      } else res.redirect("/");
    });
  },

  //get logout
  async getLogout(req, res) {
    req.session.destroy();
    res.redirect("/");
  },

  //get recuperar senha
  async getRecuperarSenha(req, res) {
    db.Usuario.findAll({ where: { login: req.params.login } }).then(
      (usuarios) => {
        if (usuarios.length > 0) {
          res.render("usuario/recuperarSenha", {
            layout: "noMenu.handlebars",
            login: req.params.login,
            pergunta: usuarios[0].pergunta_secreta,
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },

  //post recuperar senha
  async postRecuperarSenha(req, res) {
    db.Usuario.findAll({
      where: { login: req.body.login, resposta_pergunta: req.body.resposta },
    }).then((usuarios) => {
      if (usuarios.length > 0) {
        res.render("usuario/senhaRecuperada", {
          layout: "noMenu.handlebars",
          senha: usuarios[0].senha,
        });
      } else {
        res.redirect("/");
      }
    });
  },

  //get create
  async getCreate(req, res) {
    res.render("usuario/usuarioCreate");
  },

  //post create
  async postCreate(req, res) {
    db.Usuario.create({
      login: req.body.login,
      senha: req.body.senha,
      pergunta_secreta: req.body.pergunta,
      resposta_pergunta: req.body.resposta,
    });
    res.redirect("/home");
  },

  //get list
  async getList(req, res) {
    db.Usuario.findAll().then((usuarios) => {
      res.render("usuario/usuarioList", {
        usuarios: usuarios.map((usuarios) => usuarios.toJSON()),
      });
    });
  },

  //get edit
  async getEdit(req, res) {
    await Usuario.findOne({ _id: req.params.id }).then((usuarios) => {
      res.render("usuario/usuarioEdit", { usuarios: usuarios.toJSON() });
    });
  },

  //post edit
  async postEdit(req, res) {
    await Usuario.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.redirect("/usuarioList");
  },

   //Get Delete
   async getDelete(req, res) {
    await Usuario.findOne({ _id: req.params.id }).then((usuarios => {
      res.render("usuario/usuarioDelete", {usuarios: usuarios.toJSON()});
    }));
  },

  //post Delete
  async postDelete(req, res){
    await Usuario.findOneAndRemove({_id: req.params.id});
    res.redirect("/usuarioList");
  }  
};
