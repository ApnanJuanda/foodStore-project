// import * as axios from "axios";
// import {config} from "../config"

// const getInvoiceByOrderId = async (order_id) => {
//     let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}; //hanya ada dua data besar yang disimpan di state auth yaitu user dan token

//     return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
//         headers: {
//             authorization: `Bearer ${token}`
//         }
//     })

// }

// export {getInvoiceByOrderId}

import axios from "axios";
import { config } from "../config";
export async function getInvoiceByOrderId(order_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
