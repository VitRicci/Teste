import { Router } from 'express';
import VisitasController from '../controllers/visitasController';

const router = Router();
const visitasController = new VisitasController();

export function setRoutes(app) {
    app.use('/api/visitas', router);
    
    router.post('/', visitasController.createVisit.bind(visitasController));
    router.get('/', visitasController.getVisits.bind(visitasController));
    router.delete('/:id', visitasController.deleteVisit.bind(visitasController));
}