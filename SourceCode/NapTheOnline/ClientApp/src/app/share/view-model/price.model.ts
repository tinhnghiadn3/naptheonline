export class PriceModel {
  id: string;
  name: string;
  value: number;
  currency: string;
  
  isUpdating = false;

  constructor(init?: PriceModel) {
    Object.assign(this, init);
  }
}
