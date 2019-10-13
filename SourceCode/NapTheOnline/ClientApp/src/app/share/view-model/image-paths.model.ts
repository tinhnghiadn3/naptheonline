export class ImagePathsModel {
  pathBanner: string;
  pathLogo: string;
  pathDescription: string[] = [];

  constructor(int?: ImagePathsModel) {
    Object.assign(this, int);
  }
}
