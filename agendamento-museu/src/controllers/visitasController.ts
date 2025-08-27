class VisitasController {
    private visits: Array<{ id: number; name: string; date: string }> = [];
    private currentId: number = 1;

    createVisit(name: string, date: string) {
        const newVisit = { id: this.currentId++, name, date };
        this.visits.push(newVisit);
        return newVisit;
    }

    getVisits() {
        return this.visits;
    }

    deleteVisit(id: number) {
        const index = this.visits.findIndex(visit => visit.id === id);
        if (index !== -1) {
            const deletedVisit = this.visits.splice(index, 1);
            return deletedVisit[0];
        }
        return null;
    }
}

export default new VisitasController();