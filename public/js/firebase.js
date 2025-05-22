let firebaseConfig = {
  apiKey: "AIzaSyC5mBT1s9SJUyFUFLeiuL2sB0UC8LTBUAU",
  authDomain: "blogging-site-2be72.firebaseapp.com",
  projectId: "blogging-site-2be72",
  storageBucket: "blogging-site-2be72.appspot.com", // fix typo: .app → .appspot.com
  messagingSenderId: "377164370061",
  appId: "1:377164370061:web:e5b449b8ad36f5c44f92c4",
  measurementId: "G-GWTWH8EPF4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
