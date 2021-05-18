import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const fbConfig = {
  apiKey: "AIzaSyAteEyLfY3nKYE9qeTqntqyl91Z1RDHu8E",
  authDomain: "cafeapp-fa619.firebaseapp.com",
  databaseURL: "https://cafeapp-fa619.firebaseio.com",
  projectId: "cafeapp-fa619",
  storageBucket: "cafeapp-fa619.appspot.com",
  messagingSenderId: "822666439897",
  appId: "1:822666439897:web:596619c8fe3d7bd3e222c8",
  measurementId: "G-90EKNMP5D1"
};

firebase.initializeApp(fbConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
