export class PriceModel {
  name: string;
  value: number;

  isUpdating = false;

  constructor(init?: PriceModel) {
    Object.assign(this, init);
  }
}
