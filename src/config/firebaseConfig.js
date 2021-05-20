import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const fbConfig = {
  apiKey: "AIzaSyCB0jzdTTsyse_qQPXsyJ6OAoIRAJ84XYY",
  authDomain: "upwork-d66e9.firebaseapp.com",
  databaseURL: "https://upwork-d66e9.firebaseio.com",
  projectId: "upwork-d66e9",
  storageBucket: "upwork-d66e9.appspot.com",
  messagingSenderId: "588059255308",
  appId: "1:588059255308:web:55a3c75a57bde381dcc429",
};

firebase.initializeApp(fbConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
