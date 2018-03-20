import { combineReducers } from 'redux';

const initialAmountState = { value: 0 };
function amountReducer(state = initialAmountState, action) {
  return { ...state, value: action.value ? action.value : 0 }
}

const AppReducer = combineReducers({
  amountReducer
});

export default AppReducer;
