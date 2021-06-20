import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqZarfKtMFdJHYJlUyupx-JetS6opAggw",
  authDomain: "final-output-social-media.firebaseapp.com",
  projectId: "final-output-social-media",
  storageBucket: "final-output-social-media.appspot.com",
  messagingSenderId: "989584747616",
  appId: "1:989584747616:web:764c379b8beeb0c4b6e705",
  measurementId: "G-LHWYFPRZGB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;