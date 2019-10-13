export class IdModel {
    id: string;

    constructor(init?: Partial<IdModel>) {
        Object.assign(this, init);
    }
}