/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.AUTH_HOST ?? 'localhost';
  const port = process.env.AUTH_PORT ?? '15003';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
