/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.USERS_HOST ?? 'localhost';
  const port = process.env.USERS_PORT ?? '15001';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
