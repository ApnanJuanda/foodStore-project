import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";
import { Provider } from "react-redux";

import Home from "./pages/Home/index";
import store from "./app/store";
import { listen } from "./app/listener";
import Register from "./pages/Register/index";
import RegisterSuccess from "./pages/RegisterSuccess/index";
import Login from "./pages/Login/index";
import { getCart } from "./api/cart";
import UserAddressAdd from "./pages/UserAddressAdd/index";
import UserAddress from "./pages/UserAddress/index";
import Checkout from "./pages/Checkout/index";
import Invoice from "./pages/Invoice/index";
import UserAccount from "./pages/UserAccount/index";
import UserOrders from "./pages/UserOrders/index";
import Logout from "./pages/Logout/index";
import GuardRoute from "./components/GuardRoute/index";
import GuestOnlyRoute from "./components/GuestOnlyRoute/index";

function App() {
  //panggil fungsi listen() sekali saja saat komponen selesai render pertama kali
  React.useEffect(() => {
    //useEffect ini fungsinya untuk memuat halaman saat pertama kali buka webnya
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/logout">
            <GuardRoute>
              <Logout />
            </GuardRoute>
          </Route>
          <Route path="/pesanan">
            <GuardRoute>
              <UserOrders />
            </GuardRoute>
          </Route>
          <Route path="/account">
            <GuardRoute>
              <UserAccount />
            </GuardRoute>
          </Route>
          <Route path="/invoice/:order_id">
            <GuardRoute>
              <Invoice />
            </GuardRoute>
          </Route>
          <Route path="/alamat-pengiriman/tambah">
            <GuardRoute>
              {" "}
              <UserAddressAdd />{" "}
            </GuardRoute>
          </Route>
          <Route path="/alamat-pengiriman">
            <GuardRoute>
              <UserAddress />
            </GuardRoute>
          </Route>
          <Route path="/checkout">
            <GuardRoute>
              <Checkout />
            </GuardRoute>
          </Route>
          <Route path="/register/berhasil">
            <GuestOnlyRoute>
              {" "}
              <RegisterSuccess />{" "}
            </GuestOnlyRoute>
          </Route>
          {/* Router untuk menuju page register */}
          <Route path="/register">
            <GuestOnlyRoute>
              <Register />
            </GuestOnlyRoute>
          </Route>
          <Route path="/login">
            <GuestOnlyRoute>
              {" "}
              <Login />{" "}
            </GuestOnlyRoute>
          </Route>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
