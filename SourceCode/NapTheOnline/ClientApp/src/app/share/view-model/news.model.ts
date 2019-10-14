export class NewsModel {
    id: string;
    logo: string;
    name: string;
    description: string;
    dateCreated: string;
    typeId: number;

    // only UI
    friendlyName: string;

    public constructor(init?: Partial<NewsModel>) {
        Object.assign(this, init);
        this.typeId = 1;
    }
}
