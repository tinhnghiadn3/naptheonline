export class AccountLoginInputModel {
  emailAddress: string;
  password: string;
  isKeepSignedIn: boolean;
  token?: string;

  public constructor(init?: Partial<AccountLoginInputModel>) {
    Object.assign(init, this);
  }
}
