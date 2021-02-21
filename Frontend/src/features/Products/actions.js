import debounce from "debounce-promise";

import {
  SUCCESS_FETCHING_PRODUCT,
  START_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  SET_PAGE,
  SET_KEYWORD,
  SET_CATEGORY,
  SET_TAGS,
  TOGGLE_TAG,
  PREV_PAGE,
  NEXT_PAGE,
} from "./constants";

import { getProducts } from "../../api/product";
let debouncedFetchProducts = debounce(getProducts, 1000);

const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProducts());
    //Menggunakan `getProducts` unutk mendapatkan data produk dari API
    let perPage = getState().products.perPage || 9;
    let currentPage = getState().products.currentPage || 1;
    let tags = getState().products.tags || [];
    let keyword = getState().products.keyword || "";
    let category = getState().products.category || "";

    const params = {
      limit: perPage,
      skip: (currentPage * perPage) - perPage,
      q: keyword,
      tags,
      category,
    };

    try {
      let {
        data: { data, count } } = await debouncedFetchProducts(params);
      dispatch(successFetchingProducts({ data, count }));
    } catch (err) {
      dispatch(errorFetchingProducts());
    }
  };
};

const startFetchingProducts = () => {
  return {
    type: START_FETCHING_PRODUCT,
  };
};

const successFetchingProducts = (payload) => {
  return {
    type: SUCCESS_FETCHING_PRODUCT,
    ...payload,
  };
};

const errorFetchingProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCT,
  };
};

const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

const clearTags = () => {
  return setTags([]);
};

const toggleTag
 = (tag) => {
  return {
    type: TOGGLE_TAG,
    tag,
  };
};

const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export {
  fetchProducts,
  startFetchingProducts,
  errorFetchingProducts,
  successFetchingProducts,
  debouncedFetchProducts,
  setPage,
  setKeyword,
  setCategory,
  setTags,
  clearTags,
  toggleTag,
  goToNextPage,
  goToPrevPage,
};
