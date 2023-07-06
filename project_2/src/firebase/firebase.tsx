import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAgVU6Y4AU6qBwAhgqf7KogV-Stx4JlhSk",
  authDomain: "cms-ticket-sale-882a9.firebaseapp.com",
  databaseURL: "https://cms-ticket-sale-882a9-default-rtdb.firebaseio.com",
  projectId: "cms-ticket-sale-882a9",
  storageBucket: "cms-ticket-sale-882a9.appspot.com",
  messagingSenderId: "190399194013",
  appId: "1:190399194013:web:9dd503c1b284d99d0d8574",
  measurementId: "G-SPCLTZ4W56"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
