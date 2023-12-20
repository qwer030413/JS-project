import logo from './logo.svg';
import './App.css';
import pln from './Images/planner.png'
function App() {
  return (
    <div 
    style={{
      backgroundColor: 'darkslategrey'
     
      }} 
      >
    <div className="login">
        <button  id = "log" onclick = "window.location.href = 'Project/login.html';">Login</button>
        <button id = "logout">Log out</button>
        <h1 id = "status">Guest</h1>
    </div>
    <div className="container">
        <h1 style={{textAlign: 'center'}}>Planner              <img src={pln} width="100" height="90"/></h1>
        <div className="row">

            <input type="text" id = "input" placeholder="Task name"/>
            
        </div>
        <div className="descrip">
            <textarea id="description" cols="40" rows="8" placeholder="Description"></textarea>
            <button id = "add" onclick="add()">Add Task</button>
        </div>

        <ul id ="list">
            
        </ul>
        
    </div>
    <div id = "form"> </div>

    <div id = "loginpage"></div>

    
    
    


</div>
  );
}

export default App;
