export class PriceModel {
  // id: string;
  name: string;
  value: number;
  // gameId: number;

  isUpdating = false;

  constructor(init?: PriceModel) {
    Object.assign(this, init);
  }
}
