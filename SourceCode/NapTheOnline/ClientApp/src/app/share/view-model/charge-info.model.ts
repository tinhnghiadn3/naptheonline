export class ChargeInfoModel {
    cardId: number;
    cardValue: number;
    pinField: string;
    seriField: string;

    constructor(int?: ChargeInfoModel) {
        Object.assign(this, int);
    }
}