/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const host = process.env.TASKS_HOST ?? 'localhost';
  const port = process.env.TASKS_PORT ?? '15002';
  axios.defaults.baseURL = `http://${host}:${port}`;
};
