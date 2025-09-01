import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    const origin = 'https://projetomuseu.netlify.app';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.status(200).end();
        return;
    }

    try {
        await client.connect();
        const db = client.db('projetomuseu');
        const collection = db.collection('presencas');

        if (req.method === 'GET') {
            const visitaId = req.query.visitaId;
            const presencas = await collection.find({ visitaId: parseInt(visitaId) }).toArray();
            res.status(200).json({ presencas });
            return;
        }

        if (req.method === 'POST') {
            const { nomeResp, podeComparecer, idx } = req.body;
            const novaPresenca = {
                responsavel: nomeResp,
                status: podeComparecer ? 'Confirmado' : 'Não pode comparecer',
                visitaId: idx // idx deve ser igual ao que o GET busca
            };
            await collection.insertOne(novaPresenca);
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.status(200).json({ recebido: true });
            return;
        }

        if (req.method === 'DELETE') {
            let body = req.body;
            if (typeof body === 'string') body = JSON.parse(body);
            const { visitaId, responsavel } = body;
            const result = await collection.deleteOne({ visitaId: parseInt(visitaId), responsavel });
            res.status(200).json({ removido: result.deletedCount > 0 });
            return;
        }

        res.setHeader('Access-Control-Allow-Origin', origin);
        res.status(405).json({ error: 'Método não permitido' });
    } catch (error) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}