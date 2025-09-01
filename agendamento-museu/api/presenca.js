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

    if (req.method === 'GET') {
        const visitaId = req.query.visitaId;
        const presencas = await collection.find({ visitaId: parseInt(visitaId) }).toArray();
        res.status(200).json({ presencas });
        return;
    }

    if (req.method === 'POST') {
        const novaPresenca = req.body;
        await collection.insertOne(novaPresenca);
        res.status(201).json({ message: 'Presença registrada com sucesso' });
        return;
    }

    if (req.method === 'DELETE') {
        const { id } = req.body;
        await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });
        res.status(200).json({ message: 'Presença removida com sucesso' });
        return;
    }

    res.status(405).json({ error: 'Método não permitido' });
}