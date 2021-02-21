import axios from "axios";
import { config } from "../config";

const getProducts = async (params) => {
  return await axios.get(`${config.api_host}/api/products`, {
    params,
  });
};

export { getProducts };
