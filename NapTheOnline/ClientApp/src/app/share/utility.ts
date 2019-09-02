export class Utility {

  public constructor() {
  }

  public static generateFriendlyName(source) {
    source.forEach(item => {
      item.friendlyName = item.name.trim().replace(' ', '-');

      let isDuplicate = true;
      let i = 1;
      do {
        isDuplicate = source.some(_ => _.friendlyName === item.friendlyName && _.id !== item.id);
        if (isDuplicate) {
          item.friendlyName += i;
          i++;
        }
      } while (isDuplicate);
    });

    return source;
  }
}
