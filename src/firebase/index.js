import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB29mH0VsFhajkcfMAqU-0KUGs2E2Wpo2o",
    authDomain: "my-todo-list-548e3.firebaseapp.com",
    projectId: "my-todo-list-548e3",
    storageBucket: "my-todo-list-548e3.appspot.com",
    messagingSenderId: "1034902438230",
    appId: "1:1034902438230:web:5941f894a75471d1b496f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}