import { combineReducers } from 'redux';

const initialAuthState = { token: '', isLoggedIn: false };
const customerInfo = { phone: '', userType: '', history: []}
const initialCart = { 
  product: [],
  tempProduct: '',
  cartItems: [],
  tempCategory: {}
 };
function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Store':
      return { ...state, token: action.token, isLoggedIn: true }
    case 'Logout':
      return { ...state, token: '', isLoggedIn: false }
    default:
      return state;
  }
}
function cus(state = customerInfo, action) {
  switch (action.type) {
    case 'StoreCus':
      return { ...state, phone: action.value.phone, userType: action.value.userType, history: action.value.history }
    case 'removeCustomer':
      return { ...state, phone: '', userType: '', history: []}
    default:
      return state;
  }
}
function cart(state = initialCart, action) {
  switch (action.type) {
    case 'tempProduct':
      return { ...state, tempProduct: action.product }
    case 'tempCategory':
      return { ...state, tempCategory: action.category }
    case 'cartItems':
      return { ...state, cartItems: [...state.cartItems, action.cartItems] }
    case 'removeCartItems':
      return { ...state, cartItems: [...state.cartItems.slice(0, action.index), ...state.cartItems.slice(action.index + 1)] }
    case 'removeAll':
      return { ...state, cartItems: [] }
    // case 'updateCartItems':
    //   return { ...state, cartItems: [...state.cartItems.splice(action.index.arrayInd,1, action.index.finalIteration)] }
    case 'updateCartItems':
    return { 
      ...state, 
      cartItems: state.cartItems.map(
          (data, i) => i === action.index.arrayInd ? {...data, ...action.index.finalIteration}
                                  : data
      )
   }
    case 'updateQuantity':
    return { 
      ...state, 
      cartItems: state.cartItems.map(
          (data, i) => i === action.index.key ? {...data, quantity: action.index.value}
                                  : data
      )
   }
    case 'updateQuantityCart':
    return { 
      ...state, 
      cartItems: state.cartItems.map(
          (data, i) => data.fingerPrint === action.data.cryptoFingerPrint ? {...data, quantity: parseInt(action.data.quantity, 10)}
                                  : data
      )
   }
      // return { ...state, cartItems: [...state.cartItems[action.index.key].quantity, action.index.value] }
    case 'firstStep':
      return { ...state, product: [...state.product, action.product] }
    case 'Logout':
      return { ...state, token: '', isLoggedIn: false }
    default:
      return state;
  }
}


const AppReducer = combineReducers({
  auth,
  cart,
  cus
});

export default AppReducer;
