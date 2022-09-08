'use strict'

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, set, ref as dRef, update, get, child, push } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
  import { getStorage, ref as sRef, uploadBytes, } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-storage.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
    // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const storage = getStorage(app);
  const auth = getAuth();

  const user = auth.currentUser;
  let cookies = document.cookie;
  let cookiesArray = cookies.split(';');

  let fileName = 0;
  let product_name = 0;
  let product_describe = 0;
  let price = 0;
  let id = 0;
  let ext = 0;
  let file_type = 0;

  onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      const uid = user.uid;
      const dbref=dRef(database)
      get(child(dbref, 'users/' + uid)).then((snapshot)=>{
          if(snapshot.exists()){
              console.log(snapshot.val());
              var username=snapshot.val().username;

                for (let c of cookiesArray){
                  var cArray = c.split('=');
                  if (cArray[0].trim(' ') === 'fileName') {
                    fileName = decodeURIComponent(cArray[1]);
                  }else if (cArray[0].trim(' ') === 'itemName') {
                    product_name = decodeURIComponent(cArray[1]);
                  } else if (cArray[0].trim(' ') === 'introContent') {
                    product_describe = decodeURIComponent(cArray[1]);
                  } else if (cArray[0].trim(' ') === 'sellPoint') {
                    price = cArray[1];
                  } else if (cArray[0].trim(' ') === 'id') {
                    id = cArray[1];
                  } else if (cArray[0].trim(' ') === 'ext') {
                    ext = cArray[1];
                  } else {
                    console.log('だめで〜す'+cArray[1]);
                  }
                }
                //console.log(product_name);
                document.getElementById("product_name").textContent += product_name;
                document.getElementById("product_describe").textContent += product_describe;
                document.getElementById("price").textContent += price;
                

                //var tag = ここも;
                const dt = new Date();
                const base = 'http://127.0.0.1:5500/informarket/';
                const url = new URL('product_detail.html', base );
                // const url2 = new URL('buy_check.html', base );
                // const url3 = new URL('post_complete.html', base );

                url.hash = id;

                update(dRef(database, 'product/' + id),{
                  id: id,
                  myproduct: url,
                  post_username: username,
                  product_name: product_name,
                  product_describe:product_describe,
                  price: price,
                  ext: ext,
                  upload_date: dt.toLocaleString(),
                })
                update(dRef(database, 'users/' + uid + '/myproduct/' + id),{
                  url
                })                  
                
          }else{
              alert("No data found");
          }
      })
      // .catch((error)=>{
      //     alert("unsuccessful, error"+error);
      // });
      
  } else {
      // User is signed out
      location.replace("./index.html");
  }
  });
  document.getElementById("comp").addEventListener('click', ()=>{
      location.href = './post_complete.html';
  })