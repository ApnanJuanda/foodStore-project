// import * as axios from "axios";
// import { config } from "../config";

// const getOrders = async (params) => {
//   let { token } = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth"))
//     : {};

//   let { limit, page } = params;
//   let skip = page * limit - limit;

//   return await axios.get(`${config.api_host}/api/orders`, {
//     params: {
//       skip,
//       limit,
//     },
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// const createOrder = async (payload) => {
//   let { token } = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth"))
//     : {};
//   return await axios.post(`${config.api_host}/api/orders`, payload, {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export { getOrders, createOrder };

import * as axios from "axios";
import { config } from "../config";

export async function createOrder(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return( await axios.post(`${config.api_host}/api/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }))
}

export async function getOrders(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  let { limit, page } = params;
  let skip = page * limit - limit;
  return await axios.get(`${config.api_host}/api/orders`, {
    params: {
      skip,
      limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

