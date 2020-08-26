import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/tab.js";
import "../css/style.css";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";
import { getCountries } from "./services/apiService";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

//Init
$("#myTab a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

//Events
form.addEventListener("submit", (e) => {
  e.preventDefault();
  onsubmit();
});

inputs.forEach((el) =>
  el.addEventListener("focus", () => removeInputError(el))
);

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
    await getNews();
    form.reset();
    // show success notify
    notify({ msg: "Login success", className: "alert-success" });
  } catch (err) {
    // show error notify
    notify({ msg: "Login failed", className: "alert-danger" });
  }
}
// getCountries();
// denis.m.pcspace@gmail.com
// dmgame12345
