import {criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario} from "../models/usuarioModels.js";

export async function criar(req, res) {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({erro: "Nome e email são obrigatórios"});
        }

        const usuario = await criarUsuario(nome, email);
        res.status(201).json(usuario);

    } catch(e) {
        if (e.code === "ER_DUP_ENTRY") {
            return res.status(409).json({erro: "Email já cadastrado"});
        }
        res.status(500).json({erro: "Falha ao criar usuário"});
    }
}

export async function listar(req, res) {
    try {
        const usuarios = await listarUsuarios();
        res.json(usuarios);

    } catch(e) {
        res.status(500).json({erro: "Falha ao listar usuários"});
    }
}

export async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;

        const affectedRows = await atualizarUsuario(id, nome, email);

        if (!affectedRows) return res.status(404).json({erro: "Usuário não encontrado"});

        res.json({mensagem: "Atualizado com sucesso"});

    } catch(e) {
        res.status(500).json({erro: "Falha ao atualizar usuário"});
    }
}

export async function deletar(req, res) {
    try {
        const { id } = req.params;

        const affectedRows = await deletarUsuario(id);

        if (!affectedRows) return res.status(404).json({erro: "Usuário não encontrado"});

        res.json({mensagem: "Deletado com sucesso"});

    } catch(e) {
        res.status(500).json({erro: "Falha ao deletar usuário"});
    }
}