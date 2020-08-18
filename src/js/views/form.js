/**
 * Function inputErrorTemplate
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
  <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Fucntion showInputError. Add input error.
 * @param {HTMLInputElement} el
 *
 */
export function showInputError(el) {
  // class bootstrap invalid-feedback
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || "Invalid input";
  const template = inputErrorTemplate(msg);
  el.classList.add("is-invalid");
  if (parent.querySelector(".invalid-feedback")) {
    return;
  }
  parent.insertAdjacentHTML("beforeend", template);
}
/**
 * Fucntion removeInputError. Remove input error.
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector(".invalid-feedback");
  if (!err) return;
  el.classList.remove("is-invalid");
  parent.removeChild(err);
}
