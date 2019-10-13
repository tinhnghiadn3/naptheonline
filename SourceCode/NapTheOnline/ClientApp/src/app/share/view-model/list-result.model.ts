export class ListResult<T> {
    result: T;
    total: number;

    public constructor(init?: Partial<ListResult<T>>) {
        Object.assign(this, init);
      }
}