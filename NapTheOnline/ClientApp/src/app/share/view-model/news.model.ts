export class NewsModel {
  id: number;
  name: string;
  description: string;
  dateCreated: string;
  logo: string;

  // only UI
  friendlyName: string;

  public constructor(init?: Partial<NewsModel>) {
    Object.assign(this, init);
  }
}
