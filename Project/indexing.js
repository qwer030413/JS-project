import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut   } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCTL3eKUTdKo2l-eh9ERXKOmZZytZqdGrQ",
authDomain: "to-do-list-f337b.firebaseapp.com",
databaseURL: "https://to-do-list-f337b-default-rtdb.firebaseio.com",
projectId: "to-do-list-f337b",
storageBucket: "to-do-list-f337b.appspot.com",
messagingSenderId: "720665752666",
appId: "1:720665752666:web:84c6ee49bac7cade571463",
measurementId: "G-PPWBZ8WQK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// assign value of what we typed in into  input
let input = document.getElementById("input");
let description = document.getElementById("description");
//asign the list to the list 
let list = document.getElementById("list");

// function runs when button clicked
window.add = function add(){
    if(input.value == '' || description.value =='')
    {
        alert("Nuh uh");
    }
    else{
        //create new element for list
        let li = document.createElement("li");
        

        
        li.setAttribute('style', 'white-space: pre;');
        //assign the value of the input into the li value
        li.textContent = input.value + "\r\n" + description.value;

        
        //add the text node to the newly created element
        list.appendChild(li);
        // list.appendChild(de);
        //span is a given/set value in the code(I didnt do anything with span)
        let span = document.createElement("span");
        //also a given thing, set span as x icon(the weird code is for the x icon, it is built in)
        span.textContent = "\u00d7";
        li.appendChild(span);
        // de.appendChild(span);
    }
    //clear the text input after it is entered
    input.value = "";
    description.value ="";
}
const el = document.getElementById('list');
if (el) {
    list.addEventListener("click", function(e)
    {
        //if the click happened in the list, cross out the text
        if(e.target.tagName === "LI")
        {
            //use e.target to target the list and toggle the checked in css code
            e.target.classList.toggle("checked");
        }
        //else if the click happened in span, delete the list
        else if(e.target.tagName === "SPAN")
        {
            //remove the target from the list
            e.target.parentElement.remove();
            
            
            
        }
    }, false)
}

//start of sign up/sign in/log out
const lg = document.getElementById('logout');
if(lg)
{
    logout.addEventListener('click', (e) =>{
        signOut(auth).then(() => {
            alert("user logged out");
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
          })
    });
}

//signup
const su = document.getElementById('sp');
if(su){
    sp.addEventListener('click',(e) => {

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var username = document.getElementById('name').value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                alert('Vertification email sent!');
                // Signed up 
                const user = userCredential.user;
                set(ref(database, 'users/'+  user.uid),{
                    displayName : username,
                    password: password,
                    email: email
                })
                alert('user Created!')
                // ...

                });;
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    });
}

const lb = document.getElementById('loginButton');
if(lb)
{
    loginButton.addEventListener('click', (e) => {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const date = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: date
    
    
                })
                
                
                
    
    
                alert('user signed in!')
    
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
    
            });
    
    });
}

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
    
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
    
        document.getElementById("status").textContent = "Welcome " + displayName;
    }
    const uid = user.uid;
    // ...
  } else {
    document.getElementById("status").textContent = "Guest";
    // User is signed out
    // ...
  }
}); 