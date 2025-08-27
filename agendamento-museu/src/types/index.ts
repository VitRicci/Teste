export interface Visit {
    id: string;
    visitorName: string;
    visitDate: Date;
    visitTime: string;
    numberOfPeople: number;
}

export interface VisitRequest {
    visitorName: string;
    visitDate: Date;
    visitTime: string;
    numberOfPeople: number;
}