import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase , onValue,set, ref, update, push, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut   } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, getDocs, deleteDoc, addDoc, setDoc, doc, getDoc, query, arrayUnion,arrayRemove, updateDoc,where, } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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
//TODO: firestore is the way
//storing in firestore is done but I am trying to read it and it keeps giving me quiry thing
//we are working on the onauthchange method

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const fs = getFirestore(app);
var curuser;



// assign value of what we typed in into  input
let input = document.getElementById("input");
let description = document.getElementById("description");
//asign the list to the list 
let list = document.getElementById("list");
// let liststore = []
var liststore;

//fetching data

// getDoc(c)
//     .then((snapshot) => {
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({...doc.data(), id: doc.id})
//         })
//         console.groupCollapsed(books)
//     })
    
//writing data
// const addinfo = document.querySelector('.add')
// addinfo.addEventListener('submit' ,(e) => {

//     e.preventDefault()

//     addDoc(colRef, {

//     })

    
// })
// function runs when button clicked
// const userref = collection(fs, 'users');
// const colRef = collection(userref, '9KymWdGBHUYf7EEKOv8mrWVQXzF3', 'list');
// const q = query(userref, where("list", "array-contains", "asd asd"));

// const querysnapshot = await getDocs(q);
// querysnapshot.forEach((doc) => {
//     console.log(doc.id(), " => ", doc.data())
// })



const el = document.getElementById('list');
if (el) {
    list.addEventListener("click", async function(e)
    {
        //if the click happened in the list, cross out the text
        if(e.target.tagName === "LI")
        {
            //use e.target to target the list and toggle the checked in css code
            e.target.classList.toggle("checked");
            console.log(e.target.textContent);
        }
        //else if the click happened in span, delete the list
        else if(e.target.tagName === "SPAN")
        {
            
            
            if(curuser != null)
            {
                
                // console.log(e.target.parentElement.innerText.substring(0 , e.target.parentElement.innerText.length - 1));
                const colref = doc(fs, 'users', curuser);
                let rawdata = e.target.parentElement.innerText.substring(0 , e.target.parentElement.innerText.length - 1);
                let data = e.target.parentElement.innerText.substring(0 , e.target.parentElement.innerText.length - 1).replace(/(\r\n|\n|\r)/gm," ");
                data = data.trim();
                console.log(rawdata);
                await updateDoc(colref, {
                    list: arrayRemove(data)
                });
            }
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
            input.value = "";
            description.value ="";
            
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
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(fs, "users",  user.uid), {
                    list: []
                });
                
                sendEmailVerification(auth.currentUser)
                .then(() => {
                alert('Vertification email sent!');
                // Signed up 
                
                set(ref(database, 'users/'+  user.uid),{
                    profile : username,
                    password: password,
                    email: email
                })
                alert('user Created!')
                console.log("signed up");
            

                // ...

                });
                    
                })
                
                
            
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    });
}

//sign in
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
                console.log("signed in");
    
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
    
            });
    
    });
}

onAuthStateChanged(auth, async (user) => {
const button = document.getElementById("log");

  if (user) {
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.profile;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
        curuser = uid;

        
        
        //not working
        // const col = collection(fs, 'users');
        const docref = doc(fs, 'users', user.uid);
        const docsnap = await getDoc(docref);
        const todolist = docsnap.data().list;
        
        for(var key in todolist)
        {
            // console.log(todolist[key]);
            let li = document.createElement("li");
            let span = document.createElement("span");
            li.setAttribute('style', 'white-space: pre;');
            li.textContent = todolist[key].substring(0,todolist[key].indexOf(' ')) + "\r\n" + todolist[key].substring(todolist[key].indexOf(' ') + 1,todolist[key].length);
            list.appendChild(li);
            span.textContent = "\u00d7";
            
            li.appendChild(span);
            
            
            
        }
        // console.log(docsnap.data()[0]);
        
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        button.disabled = true;
        document.getElementById("status").textContent = "Welcome " + email;

    
  } 
  else {
    document.getElementById("status").textContent = "Guest";
    button.disabled = false;
    curuser = null;
    // User is signed out
    // ...
  }
}); 
window.add = async function add(){

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
        
        if(curuser != null)
        {   
            liststore = li.textContent.replace(/(\r\n|\n|\r)/gm," ");
            // liststore = li.textContent;
            
            const listref = doc(fs,"users",curuser);
            await updateDoc(listref, {
                list: arrayUnion(liststore)
            });
           
            
        }
        // const todo = li.textContent;
       
        
            
        
        
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
    // console.log(liststore);
}




    
