# E-commerce

### Installation

Git clone


### Firebase

* Create an account at `firebase.google.com`
* Firebase Database > Register project > Get configuration code.
* Go to `/utils/firebase/firebase.utils.js` and change the following block for your configuration:

```javascript
const firebaseConfig = {
  apiKey: "******",
  authDomain: "******",
  projectId: "******",
  storageBucket: "******",
  messagingSenderId: "******",
  appId: "******",
};
```