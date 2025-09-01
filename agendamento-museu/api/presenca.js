import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Defina essa variável no painel do Vercel
const client = new MongoClient(uri);

export default async function handler(req, res) {
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

    try {
        await client.connect();
        const db = client.db('projetomuseu');
        const collection = db.collection('presencas');
        await collection.insertOne(body);
        res.status(200).json({ recebido: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
    }
}