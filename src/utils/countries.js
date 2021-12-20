import countries from './countries.json';

const countryArray = countries;

const formattedCountries = {
  '': 'All Countries',
};

countryArray.forEach((country) => {
  formattedCountries[country.name.toLowerCase()] = country.name;
});

export default formattedCountries;
