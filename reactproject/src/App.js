import logo from './logo.svg';
import './App.css';
import pln from './Images/planner.png'
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, onValue,set, ref, update, push, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut   } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { useState } from 'react'
import React, { Component } from 'react';

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
//TODO: finished storing data in fire base.
//need to figure out how to read and iterate data and show it on list if logged in
//idk what I did, good luck understanding what I did
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export default function App() {
  
  // assign value of what we typed in into  input
const [input, add] = useState('');
// let input = document.getElementById("input");
let description = document.getElementById("description");
//asign the list to the list 
let list = document.getElementById("list");

const adding = event => {
   add(event.target.value)
  
    if(input.value == "" || description.value =="")
    {
        alert("Nuh uh");
    }
    else{
      //create new element for list
      let li = document.createElement("li");
      

      
      li.setAttribute('style', 'white-space: pre;');
      //assign the value of the input into the li value
      li.textContent = input.value + "\r\n" + description.value;
      const todo = li.textContent;
      //get user id and current user
      onAuthStateChanged(auth, (user) => {
          //if logged in
          if (user) {
              //get user id
              const uid = user.uid;
              
              //get a ref and set the folder locatioin
              const postListRef = ref(database, 'users/' + uid + '/todo/');
              
              //push the info to the folder
              const newPostRef = push(postListRef);
              
              //setting the newpost ref, which is postlistref being pushed
              set(newPostRef, {
                  todo 
              });
            
            // ...
          } else {
            
          }
        });
      
          
      
      
      //add the text node to the newly created element
      list.appendChild(li);
      // list.appendChild(de);
      //span is a given/set value in the code(I didnt do anything with span)
      let span = document.createElement("span");
      //also a given thing, set span as x icon(the weird code is for the x icon, it is built in)
      span.textContent = "\u00d7";
      li.appendChild(span);
      // de.appendChild(span);
      //clear the text input after it is entered
      input.value = "";
      description.value ="";
  }


  
  

}


  return (
    <div 
    style={{
      backgroundColor: 'darkslategrey'
     
      }} 
      >
    <div className="login">
        <button  id = "log" onClick = "window.location.href = 'Project/login.html';">Login</button>
        <button id = "logout">Log out</button>
        <h1 id = "status">Guest</h1>
    </div>
    <div className="container">
        <h1 style={{textAlign: 'center'}}>Planner              <img src={pln} width="100" height="90"/></h1>
        <div className="row">

          <input value = "" type="text"  id = "input" placeholder="Task name" />
            
        </div>
        <div className="descrip">
            <textarea id="description" cols="40" rows="8" placeholder="Description"></textarea>
            <button id = "add" onChange={adding()}>Add Task</button>
        </div>

        <ul id ="list">
            
        </ul>
        
    </div>
    <div id = "form"> </div>

    <div id = "loginpage"></div>

    
    
    


</div>
  );
}


