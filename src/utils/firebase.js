import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDq5A2vx9tF7LHN7qjLDDo2sYmjZpYxxAs",
  authDomain: "social-media-react-77796.firebaseapp.com",
  projectId: "social-media-react-77796",
  storageBucket: "social-media-react-77796.appspot.com",
  messagingSenderId: "141817296334",
  appId: "1:141817296334:web:0b1846f514e638b572679f",

  // apiKey: "AIzaSyDqZarfKtMFdJHYJlUyupx-JetS6opAggw",
  // authDomain: "final-output-social-media.firebaseapp.com",
  // projectId: "final-output-social-media",
  // storageBucket: "final-output-social-media.appspot.com",
  // messagingSenderId: "989584747616",
  // appId: "1:989584747616:web:764c379b8beeb0c4b6e705",
  // measurementId: "G-LHWYFPRZGB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;