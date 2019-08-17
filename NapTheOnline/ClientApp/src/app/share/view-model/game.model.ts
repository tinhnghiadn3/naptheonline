export class GameModel {
  id: number;
  name: string;
  logo: string;
  description: string;
  prices = [];
  banner: string;

  constructor(int: GameModel) {
    Object.assign(int, this);
  }
}
