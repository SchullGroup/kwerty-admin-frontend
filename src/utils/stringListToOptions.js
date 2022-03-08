import stringHelpers from './string-helpers';

export default function stringListToOptions(list, listName = '') {
  const optionList = listName ? { '': `All ${listName}` } : {};
  return {
    ...optionList,
    ...list.reduce((accumulated, current) => {
      const newAccum = { ...accumulated };
      newAccum[current] = stringHelpers.titleCase(current);
      return newAccum;
    }, {}),
  };
}
