// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccountKey.json');

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    // await firestoreService.restore('./data-clean/firebase/users.json');
    await firestoreService.restore('./acaricides.json');
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();



// const firestoreService = require('firestore-export-import');
// const serviceAccount = require('./serviceAccountKey.json');
 
// // Initiate Firebase App
// firestoreService.initializeApp(serviceAccount, databaseURL);
 
// // Start exporting your data
// firestoreService
//   .backup('testusers')
//   .then(data => console.log(JSON.stringify(data)))




// const firestoreService = require('firestore-export-import');
// const serviceAccount = require('./serviceAccountKey.json');
 
// // Initiate Firebase App
// firestoreService.initializeApp(serviceAccount, databaseURL);
 
// // Start importing your data
// // The array of date and location fields are optional
// firestoreService.restore('./users.json');