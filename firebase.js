var firebaseConfig = {
  apiKey: "AIzaSyBst7t-lWUe1r1KIVKnlIZNmvDxLLYMzsU",
  authDomain: "shopclone-a05ca.firebaseapp.com",
  projectId: "shopclone-a05ca",
  storageBucket: "shopclone-a05ca.appspot.com",
  messagingSenderId: "506712120449",
  appId: "1:506712120449:web:f82b692e07486edb084180",
  measurementId: "G-P0PD5HG6E0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();