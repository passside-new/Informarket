'use strict'

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

import { getStorage, ref as sRef, uploadBytes, } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKV9myWvVsqSP_z6zD6ipY1YtvUN3_Dqc",
  authDomain: "myfirebase-54d4c.firebaseapp.com",
  databaseURL: "https://myfirebase-54d4c-default-rtdb.firebaseio.com",
  projectId: "myfirebase-54d4c",
  storageBucket: "myfirebase-54d4c.appspot.com",
  messagingSenderId: "774352724222",
  appId: "1:774352724222:web:0b40ee42cf9314d934c5af",
  measurementId: "G-3DZ6JKED7W"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth();

const user = auth.currentUser;

const file = document.getElementById("upload");
const item = document.getElementById("product_name");
const intro = document.getElementById("product_describe");
const sell = document.getElementById("price");
const tag = document.getElementById("tag");

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("btn_primary").addEventListener('click',()=>{
      const itemName = encodeURIComponent(item.value);
      const introContent = encodeURIComponent(intro.value);
      if (file.files.length == 0) {
        alert("空です");
      } else {
        const id = Math.floor( Math.random() * 10000000001);
        const fileContent = file.files[0];
        const name = fileContent.name;
        const ext = name.split('.').pop();
        const storageRef = sRef(storage, `file/${id}.${ext}`);
        uploadBytes(storageRef, fileContent).then((snapshot) => {
          console.log('Uploaded an array!');
          console.log()
          });
          
      //const tagName = encodeURIComponent(tag.value);
      document.cookie = 'fileName=' + name;
      document.cookie = 'itemName=' + itemName;
      document.cookie = 'introContent=' + introContent;
      document.cookie = 'sellPoint=' + sell.value;
      document.cookie = 'id=' + id;
      document.cookie = 'ext=' + ext;
      //document.cookie = 'tagName=' + tag.value;
      setTimeout(function(){
        location.href = './post_check.html';
      }, 1*1000);
    }
    });
  } else {
    location.replace("./index.html");
  }
});