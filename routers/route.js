const express = require("express");
const controllerUsuario = require("../controllers/controllerUsuario");
const controllerReceita = require("../controllers/controllerReceita");
const controllerAnimais = require("../controllers/controllerAnimais");
const route = express.Router();

module.exports = route;

//Home
route.get("/home", function (req, res) {
  if (req.session.login) {
    console.log(req.session.login);
    res.render("home");
  } else res.redirect("/");
});
route.get("/logout", controllerUsuario.getLogout);

//Controller Usuario
//Usuario - Login e Recuperação de Senha
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
route.post("/recuperarSenha", controllerUsuario.postRecuperarSenha);
//Usuario - CRUD
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);

//Controller Receita
//Receita-CRUD
route.get("/receitaCreate", controllerReceita.getCreate);
route.post("/receitaCreate", controllerReceita.postCreate);
route.get("/receitaList", controllerReceita.getList);
route.get("/receitaEdit/:id", controllerReceita.getEdit);
route.post("/receitaEdit", controllerReceita.postEdit);
route.get("/receitaDelete/:id", controllerReceita.getDelete);

//Controller animais
//animais - Crud
route.get("/animaisCreate", controllerAnimais.getCreate);
route.post("/animaisCreate", controllerAnimais.postCreate);
route.get("/animaisList", controllerAnimais.getList);
route.get("/animaisEdit/:id", controllerAnimais.getEdit);
route.post("/animaisEdit", controllerAnimais.postEdit);
route.get("/animaisDelete/:id", controllerAnimais.getDelete);
route.post("/animaisDelete", controllerAnimais.postDelete);