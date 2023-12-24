import "./index.css";
import { useState } from 'react';




//function(method) that I can use!
//takes in a variable named value and inserts it in the button and returns it
//if wanna use it, <Square value = "1">
// function Square({value}){
    
//     //handling clicks
//     function handleClick(){
//         console.log("clicked!");
//     }
    
//     return <button className = "square" onClick = {handleClick}>{value}</button>;
// }


function Square(){
    //useState makes components remember things
    //value stores the value and setValue is a function that can be used to change the value
    //the null is the inital value of the state variable, which means values initial value is null
    // const [value, setValue] = useState(null);

    //array of size 9 with initial value null
    const [value, setValue] = useState(Array(9).fill(null));
    //handling clicks
    function handleClick(){
        //using setValue we created earlier
        setValue('X');
    }
    
    return (
    <button 
    className = "square" 
    onClick = {handleClick}
    >{value}</button>)
    ;
}

//export makes it so that this function is accessable outside of this file
//default tells other files using this code that this is the main function of my file
//the name Square is arbitary and it could be anything that I want
export default function Board() {
    //we can return many things by doing this
    return (
        <>
        <div className = "row">
            <Square />
            <Square />
            <Square />
        </div>
        <div className = "row">
            <Square />
            <Square />
            <Square />
        </div>
        <div className = "row">
            <Square />
            <Square />
            <Square />
        </div>
            

        </>

    );
    
    
    
}