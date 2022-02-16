// convert from ```all lowercase text``` to ```First letter capitalized string```
export default {
  capitalize(someWord) {
    if (!someWord || typeof someWord !== 'string') return someWord;
    return `${someWord[0].toUpperCase()}${someWord.slice(1)}`;
  },

  // convert from ```spaced string``` to ```Title Case```
  titleCase(someStr) {
    if (typeof someStr === 'string') {
      const words = someStr.split(' ');
      const skipWords = ['a', 'an', 'the'];
      const modified = words.map((w, i) => {
        if (skipWords.indexOf(w) !== -1 && i !== 0) {
          return w;
        }
        return this.capitalize(w);
      });
      return modified.join(' ');
    }
    return someStr;
  },

  // convert from ```snake_case``` to ```spaced string```
  snakeCase(someStr) {
    if (typeof someStr !== 'string') return someStr;
    return someStr.replaceAll('_', ' ');
  },

  // convert from ```kebab-case``` to ```spaced string```
  kebabCase(someStr) {
    if (typeof someStr !== 'string') return someStr;
    return someStr.replaceAll('-', ' ');
  },

  // removeSymbols(str) {
  //   if (!str) return '';
  //   let newStr = '';
  //   const pattern = /\w|\d|\s/;

  //   str.split('').forEach((char) => {
  //     const match = char.match(pattern);
  //     if (match) newStr += char;
  //   });

  //   return newStr;
  // },

  lower(str) {
    if (typeof str === 'string') return str.toLowerCase();
    return str;
  },

  // convert from ```snake_case``` to ```Title Case```
  snakeToTitle(someStr) {
    return this.titleCase(this.snakeCase(someStr));
  },

  // convert from ```spaced string``` to ```camelCase```
  convertToCamelCase(someStr) {
    if (typeof someStr !== 'string') return someStr;
    return someStr.replaceAll(' ', '');
  },
};
