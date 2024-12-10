/* eslint-disable */

import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.GATEWAY_HOST ?? 'localhost';
  const port = process.env.GATEWAY_PORT ?? '3333';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
