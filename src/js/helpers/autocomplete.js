import { getCities } from "../services/apiService";

/**
 * Function renderAutocomplete.
 * @param {Array} res - array countries
 */
function renderAutocompleteTemplate(el, res) {
  $(el)
    .autocomplete({
      source: res,
      results: false,
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    ul[0].classList.add("dropdown-menu");
    return $("<li class='dropdown-item'>")
      .append("<div>" + item.value + "</div>")
      .appendTo(ul);
  };
}

export function renderAutocompleteCountries(countryArray) {
  renderAutocompleteTemplate("#country", countryArray);
}

export async function renderAutocompleteCity(idCountry) {
  const cityArray = await getCities(idCountry);
  renderAutocompleteTemplate("#city", cityArray);
}
