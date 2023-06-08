import { initializeApp } from "firebase/app";

let serverUrl, clientUrl;

// if (process.env.NODE_ENV === "development") {
//   serverUrl = "http://localhost:8080";
//   clientUrl = "http://localhost:3000";
// } else {
//   serverUrl = "https://server.qampus.co.za";
//   clientUrl = "https://qampus.co.za";
// }

// serverUrl = "https://server.qampus.co.za";
// clientUrl = "https://testing-environment-c66b9.web.app/";
 serverUrl = "http://localhost:8080";
clientUrl = "http://localhost:3000";

export const config = {
  firebaseConfig: {
    // apiKey: "AIzaSyCG9RxUrLuToPUZoq4Qs8ZeH7xm6mdBPM0",
    // authDomain: "qampus-app-4f577.firebaseapp.com",
    // projectId: "qampus-app-4f577",
    // storageBucket: "qampus-app-4f577.appspot.com",
    // messagingSenderId: "235277490352",
    // appId: "1:235277490352:web:510bf32336916d4e094375",
    // measurementId: "G-BKBWY5JRCQ",
      apiKey: "AIzaSyAWuBiMqkXmQATbLIJOAzzb4bhh-kf9UGo",
      authDomain: "testing-environment-c66b9.firebaseapp.com",
      projectId: "testing-environment-c66b9",
      storageBucket: "testing-environment-c66b9.appspot.com",
      messagingSenderId: "768435897378",
      appId: "1:768435897378:web:0add7ef845684efab7b67b",
      measurementId: "G-Z0XZHG4EBF",
  },
  serverUrl,
  clientUrl,
};

export const app = initializeApp(config.firebaseConfig);
