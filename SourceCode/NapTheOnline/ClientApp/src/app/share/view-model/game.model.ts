import {PriceModel} from './price.model';

export class GameModel {
  id: string;
  name: string;
  logo: string;
  description: string;
  prices: PriceModel[] = [];
  banner: string;
  currency: string;
  friendlyname: string;

  public constructor(init?: Partial<GameModel>) {
    Object.assign(this, init);
  }
}
