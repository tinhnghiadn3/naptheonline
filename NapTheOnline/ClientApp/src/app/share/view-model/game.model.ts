import {PriceModel} from './price.model';

export class GameModel {
  id: number;
  name: string;
  logo: string;
  description: string;
  prices: PriceModel[] = [];
  banner: string;

  public constructor(init?: Partial<GameModel>) {
    Object.assign(this, init);
  }
}
