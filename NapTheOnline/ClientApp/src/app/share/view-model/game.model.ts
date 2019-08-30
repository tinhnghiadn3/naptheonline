import {PriceModel} from './price.model';

export class GameModel {
  id: number;
  name: string;
  logo: string;
  description: string;
  prices: PriceModel[] = [];
  banner: string;

  constructor(int: GameModel) {
    Object.assign(int, this);
  }
}
