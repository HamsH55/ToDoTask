//import logo from './logo.svg';
import './App.css';
//import Button from '@mui/material/Button';
//import ToDOList from '@mui/material/IconButton';
import ToDOList from "./component/ToDoList";
// import ToDO from "./component/ToDo";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
const theme = createTheme({
  typography:{
   fontFamily:[
    "Alexandria"
   ]
  },
  // palette:{
  //   primary:{}

  // }
});


// define an Array
const initialTodos =[
  {
    id:uuidv4(),
    title:"Read Book",
    details:"Letting go",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"Read Quran",
    details:"close from Allah",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"Medetaition",
    details:"Relax ",
    isCompleted:false
  },
]
function App() {
  const title = "TO DO List ";

  const [todos,setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
    <div className="App"
    style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"purple",
      height:"100vh",
      direction :"ltr"
    }}>
    
   <TodosContext.Provider value={{todos:todos ,setTodos:setTodos}}>
   <ToDOList title = {title} />
   </TodosContext.Provider>
   
    </div>
    </ThemeProvider>
  );
}

export default App;
