//import redux-thunk middleware
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer';
import cartReducer from '../features/Cart/reducer'

//Buat composer enhacer untuk menghubungkan dengan Chrome Devtools Redux
const composerEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Gabung reducer, untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
    auth: authReducer,

    //product reducer sebagai _state_ `products`
    products: productReducer,
    cart: cartReducer
});

//Buat store, dan gunakan composerEnhacer + middleware thunk
const store = createStore(rootReducers, composerEnhacer(applyMiddleware(thunk)));

//Export Store
export default store;