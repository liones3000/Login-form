const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{4,}$/,
};

/**
 * Function validate. Check input on RegExp providet in regExpDic by input data-required type.
 * @param {HTMLInputElement} el
 * @returns {Boolean} - return true if input valid, or doesn`t has data-required attr
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  // console.log(regExpName);

  if (!regExpDic[regExpName]) return true;

  return regExpDic[regExpName].test(el.value);
}
