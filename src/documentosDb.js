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

export { encontrarDocumento, atualizaDocumento };