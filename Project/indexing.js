import {initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCTL3eKUTdKo2l-eh9ERXKOmZZytZqdGrQ",
    authDomain: "to-do-list-f337b.firebaseapp.com",
    databaseURL: "https://to-do-list-f337b-default-rtdb.firebaseio.com",
    projectId: "to-do-list-f337b",
    storageBucket: "to-do-list-f337b.appspot.com",
    messagingSenderId: "720665752666",
    appId: "1:720665752666:web:90a4111473172961571463",
    measurementId: "G-011YVD0ZC1"
  };



    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    

    // assign value of what we typed in into  input
    let input = document.getElementById("input");
    let description = document.getElementById("description");
    //asign the list to the list 
    let list = document.getElementById("list");
    //saving data?
    // const saveRef = ref(db, "myData/" + input.value);
    // onValue(saveRef, (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //         const inp = childSnapshot.val();
    //         const des = childSnapshot.val();
    //         list.appendChild(inp.value + "\r\n" + des.value)
    //     });
        
    // })

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

            //reference, the myData/ is the pathway in firebase and we set the name as input.value
            const reference = ref(db, "myData/" + input.value);

            //we set these values in the database
            set(reference, {
                //the first word(description, taskname etc) is what it is called (task:) the values are what they will be equal to
                //first word can be anyhting you want, second word should be assigned
                description: description.value,
                taskName: input.value
                

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


            
            
            
            
        }

        


        //clear the text input after it is entered
        input.value = "";
        description.value ="";
    }
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

    window.Login = function Login(){
        console.log("clicked");
        
    }
