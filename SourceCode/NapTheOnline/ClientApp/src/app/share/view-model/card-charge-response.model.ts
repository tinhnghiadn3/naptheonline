export class CardChargeResponeModel {
    code: number;
    amount:   string;
    msg: string;
    trans_id: string;

    constructor(int?: CardChargeResponeModel) {
        Object.assign(this, int);
    }
}