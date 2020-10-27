export class ConfirmTicket {
    constructor(id: number, b: number) {
        this.id = id;
        this.status = b;
    }

    id: number;
    status: number;
}
