import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx2g4KO2eBa0CW5TGO3cXSau-R0Gwfio4",
  authDomain: "ravindu-portfolio-be4c8.firebaseapp.com",
  projectId: "ravindu-portfolio-be4c8",
  storageBucket: "ravindu-portfolio-be4c8.firebasestorage.app",
  messagingSenderId: "464125489649",
  appId: "1:464125489649:web:eac432fd97c255b7051450"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
