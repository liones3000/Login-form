import "bootstrap/js/dist/tab.js";
import "jquery-ui/ui/widgets/autocomplete.js";
import "bootstrap-datepicker";
import "bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import "jquery.maskedinput/src/jquery.maskedinput.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login, registration } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import { serializeLocationCountries, getIndexCountry } from "./store/locations";
import {
  renderAutocompleteCountries,
  renderAutocompleteCity,
} from "./helpers/autocomplete";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
const {
  registrationForm,
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  country,
  city,
  date,
} = UI;
const regInputs = [
  registrationForm,
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  date,
  country,
  city,
];

//Init
$("#myTab a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

$("#phone").mask("(999) 999-99-99");

$("#dateB").datepicker({
  defaultViewDate: { year: 2014 },
  todayBtn: true,
  clearBtn: true,
  language: "ru",
  todayHighlight: true,
  autoclose: true,
});

serializeLocationCountries().then((res) => {
  const locations = res;
  renderAutocompleteCountries(locations.countriesArray);
});

//Events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  onsubmit();
});

// console.log(UI.country);
UI.country.addEventListener("change", (e) => onFilled(e));

inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);
regInputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmitRegistration();
});

// Handlers
async function onsubmit() {
  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    // await getNews();
    form.reset();
    // show success notify
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    // show error notify
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}
/**
 *
 * @param {Event} e
 */
function onFilled({ target }) {
  // запускать инит autocomplete поля с выбором городов
  const inputCountry = target.value;
  if (!inputCountry) {
    if (!UI.city.hasAttribute("disabled")) {
      UI.city.setAttribute("disabled", "disabled");
    }
    return;
  }
  if (UI.city.hasAttribute("disabled")) {
    UI.city.removeAttribute("disabled");
  }

  const indexCountry = getIndexCountry(inputCountry);
  renderAutocompleteCity(indexCountry);
}

async function onSubmitRegistration() {
  const gender_orientation = UI.gender_orientation.value;
  const [
    date_of_birth_day,
    date_of_birth_month,
    date_of_birth_year,
  ] = date.value.split(".");

  const regExpPhone = /\d/g;

  const isValidForm = regInputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;
  try {
    const response = await registration({
      email: email.value,
      password: password.value,
      nickname: nickname.value,
      first_name: first_name.value.replace(/ /g, "SpacE"),
      last_name: last_name.value.replace(/ /g, "SpacE"),
      phone: phone.value.match(regExpPhone).join(""),
      gender_orientation,
      country: country.value.replace(/ /g, "SpacE"),
      city: city.value.replace(/ /g, "SpacE"),
      date_of_birth_day,
      date_of_birth_month,
      date_of_birth_year,
    });
    // console.log(response);
    if (response.error) {
      notify({ msg: response.message, className: "alert-warning" });
    } else {
      // show success notify
      notify({
        msg: response.message,
        className: "alert-success",
      });
    }
  } catch (err) {
    console.dir(err);
    // show error notify
    notify({ msg: err.response.data.message, className: "alert-danger" });
  }
}
// denis.m.pcspace@gmail.com
// dmgame12345
