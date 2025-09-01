import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://projetomuseu.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    await client.connect();
    const db = client.db('projetomuseu');
    const collection = db.collection('presencas');

    if (req.method === 'POST') {
        let body = req.body;
        if (typeof body === 'string') body = JSON.parse(body);
        // Garante que visitaId é número
        body.visitaId = parseInt(body.visitaId);
        await collection.insertOne(body);
        res.status(200).json({ recebido: true });
        return;
    }

    if (req.method === 'GET') {
        const visitaId = req.query.visitaId;
        // Busca por visitaId como número
        const presencas = await collection.find({ visitaId: parseInt(visitaId) }).toArray();
        res.status(200).json({ presencas });
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

    res.status(405).json({ error: 'Método não permitido' });
}