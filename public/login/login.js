import { emitirAutenticarUsuario } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("input-usuario").value;
    const senha = document.getElementById("input-senha").value;

    emitirAutenticarUsuario({ nome, senha });
})