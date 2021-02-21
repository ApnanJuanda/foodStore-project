import store from "./store";
import { saveCart } from "../api/cart";

let currentAuth; //Variabel untuk menyimpan Auth saat ini
let currentCart;

//Fungsi Listener
function listener() {
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  let { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    //berarti ada perubahan state antara sebelum da sesudah login
    localStorage.setItem("auth", JSON.stringify(currentAuth));
    saveCart(token, currentCart);
  }

  if (currentCart !== previousCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
    saveCart(token, currentCart)
  }
}

//Buat fungsi Listen
function listen() {
  store.subscribe(listener);
}

export { listen }; //tanda { } itu berarti kita mengexport function
