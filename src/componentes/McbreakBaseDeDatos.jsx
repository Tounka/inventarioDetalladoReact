import React from "react";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhHtlxlOEuT-dgxg9WvLpTdQhSFCBRbx4",
  authDomain: "breakempleados.firebaseapp.com",
  projectId: "breakempleados",
  storageBucket: "breakempleados.appspot.com",
  messagingSenderId: "876862792337",
  appId: "1:876862792337:web:2d1fbc5759914bb19e5530"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);