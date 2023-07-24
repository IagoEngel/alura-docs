import io from "./servidor.js";

const documentos = [
    {
        nome: "JavaScript",
        texto: "Texto de JavaScript...."
    },
    {
        nome: "Node",
        texto: "Texto de Node....",
    },
    {
        nome: "Socket.io",
        texto: "Texto de Socket.IO....",
    }
];

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID:", socket.id);

    socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento); // criou uma "sala", onde só quem está acessando-a vai receber as alterações

        const documento = encontrarDocumento(nomeDocumento);

        if (documento) {
            // socket.emit("texto_documento", documento.texto);
            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", ({ texto, nomeDocumento }) => {
        // socket.broadcast.emit("texto_editor_clientes", texto); // envia para todos os usuário menos oq acionou o evento

        const documento = encontrarDocumento(nomeDocumento);

        if (documento) {
            documento.texto = texto;
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }

    });
});

function encontrarDocumento(nome) {
    const documento = documentos.find((documento) => {
        return documento.nome === nome;
    });
    return documento;
}