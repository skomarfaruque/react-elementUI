import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';


export default function configureStore(initialAmountState) {
  const store = createStore(
    reducer,
    initialAmountState,
    applyMiddleware(thunk),
  )
  return store;
}
