import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";

  const firebaseConfig = {
    apiKey: "AIzaSyDpNvU6P5hKM6XZFZhOnQn8omh6v4XGWF8",
    authDomain: "club-sd-counter.firebaseapp.com",
    databaseURL: "https://club-sd-counter-default-rtdb.firebaseio.com",
    projectId: "club-sd-counter",
    storageBucket: "club-sd-counter.appspot.com",
    messagingSenderId: "181109959257",
    appId: "1:181109959257:web:05bb5cd3a4070a661b5f48"
  };
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)

  // FIREBASE DATABASE
  const dbRef = ref(getDatabase(app));
  get(child(dbRef, `/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
      case 'updateValue':
        const time = new Date().getTime()
        set(ref(db, '/'), {
          count: JSON.parse(msg.number) || 0,
          timeStamp: time
        })
        response('success');
        break;
      default:
        response('unknown request');
        break;
    }
  });
