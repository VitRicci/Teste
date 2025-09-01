// ======== SENHAS DO SISTEMA ========
const SENHAS = {
    ADMIN: 'MuseuAnat202502',
};
// ======== FIM DAS SENHAS ===========

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://projetomuseu.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método não permitido' });
        return;
    }

    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch {
            res.status(400).json({ error: 'Body inválido' });
            return;
        }
    }

    const { senha } = body;
    if (senha === SENHAS.ADMIN) {
        res.status(200).json({ autorizado: true });
    } else {
        res.status(401).json({ autorizado: false, error: 'Senha incorreta' });
    }
}