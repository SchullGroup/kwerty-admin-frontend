import countries from './countries.json';
import stringHelpers from './string-helpers';

const countryArray = countries;

const formattedCountries = {
  all: 'All Countries',
};

countryArray.forEach((country) => {
  formattedCountries[stringHelpers.convertToCamelCase(country.name)] = country.name;
});

export default formattedCountries;
