import { initializeApp } from "firebase/app";

let serverUrl, clientUrl;

if (process.env.NODE_ENV === "development") {
  serverUrl = "http://localhost:8080";
  clientUrl = "http://localhost:3000";
} else {
  serverUrl = "https://server.qampus.co.za";
  clientUrl = "https://qampus.co.za";
}

  // serverUrl = "http://localhost:8080";
  // clientUrl = "http://localhost:3000";

export const config = {
  firebaseConfig: {
    apiKey: "AIzaSyCG9RxUrLuToPUZoq4Qs8ZeH7xm6mdBPM0",
    authDomain: "qampus-app-4f577.firebaseapp.com",
    projectId: "qampus-app-4f577",
    storageBucket: "qampus-app-4f577.appspot.com",
    messagingSenderId: "235277490352",
    appId: "1:235277490352:web:510bf32336916d4e094375",
    measurementId: "G-BKBWY5JRCQ",
  },
  serverUrl,
  clientUrl,
};

export const app = initializeApp(config.firebaseConfig);
