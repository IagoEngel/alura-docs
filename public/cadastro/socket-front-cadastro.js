const socket = io();

function emitirCadastrarUsuario(dados) {
    console.log('213');
    socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => alert("Cadastro realizado com sucesso!"));
socket.on("cadastro_erro", () => alert("Erro no cadastro."));
socket.on("usuario_ja_existente", () => alert("Uusário já existe!"));

export { emitirCadastrarUsuario };