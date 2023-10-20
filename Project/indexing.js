    
    
    // assign value of what we typed in into  input
    let input = document.getElementById("input");
    let description = document.getElementById("description");
    //asign the list to the list 
    let list = document.getElementById("list");

    // function runs when button clicked
    function add(){
        if(input.value == '' || description.value =='')
        {
            alert("Nuh uh");
        }
        else{
            //create new element for list
            let li = document.createElement("li");
            //assign the value of the input into the li value
            // li.innerHTML = input.value + ",  " + description.value;
            li.innerHTML = input.value;
            // li.innerHTML = description.value;
            //add the text node to the newly created element
            list.appendChild(li);
            // list.appendChild(de);
            //span is a given/set value in the code(I didnt do anything with span)
            let span = document.createElement("span");
            //also a given thing, set span as x icon(the weird code is for the x icon, it is built in)
            span.innerHTML = "\u00d7";
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
