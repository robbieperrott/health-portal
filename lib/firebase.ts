import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAviqm08xWLhNfrXGfYQGtAOBA9Y0ONvAQ",
  authDomain: "nuraxi-fcb5f.firebaseapp.com",
  projectId: "nuraxi-fcb5f",
  storageBucket: "nuraxi-fcb5f.firebasestorage.app",
  messagingSenderId: "280176162641",
  appId: "1:280176162641:web:6b610c6394dd1316334570",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
