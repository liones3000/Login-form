import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { showInputError, removeInputError } from "./views/form";
import { login } from "./services/auth.service";
import { notify } from "./views/notifications";
import { getNews } from "./services/news.service";

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
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
// denis.m.pcspace@gmail.com
// dmgame12345

// setTimeout(
//   () => notify({ mas: "Some notifycation 1", className: "alert-danger" }),
//   500
// );
// setTimeout(
//   () => notify({ mas: "Some notifycation 2", className: "alert-warning" }),
//   1000
// );
// setTimeout(
//   () => notify({ mas: "Some notifycation 3", className: "alert-primary" }),
//   1500
// );

// notify({ mas: "Some notifycation 1", className: "alert-danger" });
// notify({ mas: "Some notifycation 2", className: "alert-warning" });
// notify({ mas: "Some notifycation 3", className: "alert-primary" });
