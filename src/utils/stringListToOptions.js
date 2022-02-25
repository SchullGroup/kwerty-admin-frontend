import stringHelpers from './string-helpers';

export default function stringListToOptions(list) {
  return list.reduce((accumulated, current) => {
    const newAccum = { ...accumulated };
    newAccum[current] = stringHelpers.titleCase(current);
    return newAccum;
  }, {});
}
