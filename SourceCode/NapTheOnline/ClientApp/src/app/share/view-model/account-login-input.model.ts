export class AccountLoginInputModel {
  userName: string;
  password: string;
  isKeepSignedIn: boolean;
  token?: string;

  public constructor(init?: Partial<AccountLoginInputModel>) {
    Object.assign(this, init);
  }
}
