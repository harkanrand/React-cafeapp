import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import itemReducer from './itemReducer';
import productReducer from './productReducer';
import supplierReducer from './supplierReducer';
import cafeReducer from './cafeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  product: productReducer,
  item: itemReducer,
  cafe: cafeReducer,
  supplier: supplierReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
