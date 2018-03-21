import { combineReducers } from 'redux';

const initialAuthState = { token: '', isLoggedIn: false };
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

const AppReducer = combineReducers({
  auth
});

export default AppReducer;
