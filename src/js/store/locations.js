import { getCountries } from "../services/apiService";

const location = {
  countries: {},
};

export async function serializeLocationCountries() {
  const res = await getCountries();
  Object.entries(res).map(([key, val]) => {
    location.countries[val] = key;
  });

  location.countriesArray = Object.values(res);
  return location;
}

export function getIndexCountry(key) {
  return location.countries[key];
}
