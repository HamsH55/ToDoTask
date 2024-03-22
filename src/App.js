import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
//import ToDOList from '@mui/material/IconButton';
import ToDOList from "./component/ToDoList";
// import ToDO from "./component/ToDo";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  typography:{
   fontFamily:[
    "Alexandria"
   ]
  },
});

function App() {
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
      
      <ToDOList />
    
    </div>
    </ThemeProvider>
  );
}

export default App;
