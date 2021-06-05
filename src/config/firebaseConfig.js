import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const fbConfig = {
  apiKey: "AIzaSyAteEyLfY3nKYE9qeTqntqyl91Z1RDHu8E",
  authDomain: "cafeapp-fa619.firebaseapp.com",
  databaseURL: "https://cafeapp-fa619.firebaseio.com",
  projectId: "cafeapp-fa619",
  storageBucket: "cafeapp-fa619.appspot.com",
  messagingSenderId: "822666439897",
  appId: "1:822666439897:web:596619c8fe3d7bd3e222c8",
  measurementId: "G-90EKNMP5D1",
};

const sergenFbConfig = {
  apiKey: "AIzaSyCB0jzdTTsyse_qQPXsyJ6OAoIRAJ84XYY",
  authDomain: "upwork-d66e9.firebaseapp.com",
  databaseURL: "https://upwork-d66e9.firebaseio.com",
  projectId: "upwork-d66e9",
  storageBucket: "upwork-d66e9.appspot.com",
  messagingSenderId: "588059255308",
  appId: "1:588059255308:web:55a3c75a57bde381dcc429",
};

firebase.initializeApp(sergenFbConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
