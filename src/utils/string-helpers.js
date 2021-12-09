// convert from ```all lowercase text``` to ```First letter capitalized string```
export default {
  capitalize(someWord) {
    return `${someWord[0].toUpperCase()}${someWord.slice(1)}`;
  },

  // convert from ```spaced string``` to ```Title Case```
  titleCase(someStr) {
    const words = someStr.split(' ');
    const skipWords = ['a', 'an', 'the'];
    const modified = words.map((w) => {
      if (skipWords.indexOf(w) !== -1) {
        return w;
      }
      return this.capitalize(w);
    });
    return modified.join(' ');
  },

  // convert from ```snake_case``` to ```spaced string```
  snakeCase(someStr) {
    return someStr.replaceAll('_', ' ');
  },

  // convert from ```snake_case``` to ```Title Case```
  snakeToTitle(someStr) {
    return this.titleCase(this.snakeCase(someStr));
  },
};
