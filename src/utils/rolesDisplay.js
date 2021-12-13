import stringHelpers from './string-helpers';

export default function rolesDisplay(roles) {
  const displayObj = {};
  roles.forEach((r) => {
    displayObj[r.id] = stringHelpers.snakeToTitle(r.name);
  });
  return displayObj;
}
