export class NewsModel {
    id: string;
    logo: string;
    name: string;
    description: string;
    datecreated: Date;
    typeId: number;
    friendlyname: string;

    public constructor(init?: Partial<NewsModel>) {
        Object.assign(this, init);
        this.typeId = 1;
    }
}
