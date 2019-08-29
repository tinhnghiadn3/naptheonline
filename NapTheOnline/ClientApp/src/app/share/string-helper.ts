declare global {
  interface String {
    specifyUTCKind: () => Date;

    format(...replacements: any[]): string;
  }
}

String.prototype.format = function(): string {
  const args = arguments;
  return this.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== 'undefined' ? args[index] : match;
  });
};

export {};
