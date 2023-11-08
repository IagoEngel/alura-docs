import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosLogin from "./registrarEventos/login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios"); // nsp é uma convenção para encurtar o nome namespace

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  registrarEventosInicio(socket, nspUsuarios)  ;
  registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
});
