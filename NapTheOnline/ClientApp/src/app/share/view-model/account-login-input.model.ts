export class AccountLoginInputModel {
  emailAddress: string;
  password: string;
  isKeepSignedIn: boolean;

  public constructor(init?: Partial<AccountLoginInputModel>) {
    Object.assign(init, this);
  }
}
