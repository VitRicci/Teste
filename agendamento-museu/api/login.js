export default function handler(req, res) {
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
    if (senha === 'MuseuAnat202502') {
        res.status(200).json({ autorizado: true });
    } else {
        res.status(401).json({ autorizado: false, error: 'Senha incorreta' });
    }
}