export class NewsModel {
  id: number;
  logo: string;
  name: string;
  description: string;
  dateCreated: string;
  imageNews: any[];

  // only UI
  friendlyName: string;

  public constructor(init?: Partial<NewsModel>) {
    Object.assign(this, init);
  }
}
