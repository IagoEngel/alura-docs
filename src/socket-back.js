import { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento } from "./documentosDb.js";
import io from "./servidor.js";

// const documentos = [
//     {
//         nome: "JavaScript",
//         texto: "Texto de JavaScript...."
//     },
//     {
//         nome: "Node",
//         texto: "Texto de Node....",
//     },
//     {
//         nome: "Socket.io",
//         texto: "Texto de Socket.IO....",
//     }
// ];

io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nome) => {
        const documentoExiste = (await encontrarDocumento(nome)) !== null;

        if (documentoExiste) {
            socket.emit("documento_existente", nome);
        } else {
            const resultado = await adicionarDocumento(nome);

            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome);
            }
        }
    });

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento); // criou uma "sala", onde só quem está acessando-a vai receber as alterações

        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            // socket.emit("texto_documento", documento.texto);
            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        // socket.broadcast.emit("texto_editor_clientes", texto); // envia para todos os usuário menos oq acionou o evento

        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            // documento.texto = texto;
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }

    });

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        }
    })
});