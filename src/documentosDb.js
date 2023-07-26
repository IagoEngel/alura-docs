import { documentosColecao } from "./dbConnect.js";

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        // nome: nome,
        nome
    });

    return documento;
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        // nome: nome
        nome
    }, {
        $set: {
            // texto: texto
            texto
        }
    });

    return atualizacao;
}

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();

    return documentos;
}

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({
        nome,
        texto: ""
    });

    return resultado;
}

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome
    });

    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };