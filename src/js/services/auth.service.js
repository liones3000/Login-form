import axios from "../plugins/axios";

/**
 * Function login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(`login: ${err}`);
    return Promise.reject(err);
  }
}

/**
 *
 * @param {Object} params
 */
export async function registration(params) {
  try {
    const response = await axios.post(`/auth/signup`, JSON.stringify(params));
    // console.log(response);
    return response;
  } catch (err) {
    console.log(`registration: ${err}`);
    return Promise.reject(err);
  }
}
