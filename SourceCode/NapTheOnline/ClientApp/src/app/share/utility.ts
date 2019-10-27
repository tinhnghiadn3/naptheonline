export class Utility {

  public constructor() {
  }

  public static generateFriendlyName(source) {
    if (source && source.length > 0) {
      source.forEach(item => {
        item.name = this.replaceMoreSpace(item.name);
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
    }
    return source;
  }

  public static replaceMoreSpace(str) {
    if(!str || str.length <= 0) return;

    while (str.indexOf('  ') !== -1) {
      str = str.replace(/ {2}/g, ' ');
    }

    return str.trim();
  }
}
