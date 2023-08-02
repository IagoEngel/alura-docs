import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("input-usuario").value;
    const senha = document.getElementById("input-senha").value;

    emitirCadastrarUsuario({ nome, senha });
})