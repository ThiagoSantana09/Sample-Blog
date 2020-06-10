import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


let firebaseConfig = {
  apiKey: "AIzaSyCnVayVrdhNij--C6K3g4Xz0NWyFqYgkrU",
  authDomain: "blog-5bd5c.firebaseapp.com",
  databaseURL: "https://blog-5bd5c.firebaseio.com",
  projectId: "blog-5bd5c",
  storageBucket: "blog-5bd5c.appspot.com",
  messagingSenderId: "899400221696",
  appId: "1:899400221696:web:20f3f41fba9ad0c7a084e5",
  measurementId: "G-15MR42NWNG"
};

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);
    this.app = app.database();
  }

  login(email,password){
    return app.auth().signInWithEmailAndPassword(email,password);
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome,email,password)
  {
    await app.auth().createUserWithEmailAndPassword(email,password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    });
  }

  isInitialized(){
    return new Promise(resolve =>{
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);
  }

}

export default new Firebase();