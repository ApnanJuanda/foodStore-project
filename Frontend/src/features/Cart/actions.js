import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_ITEMS } from "./constants";

const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    item,
  };
};

const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
  };
};

const setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

export { addItem, removeItem, clearItems, setItems };
