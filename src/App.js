
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NoteState from './context/Note/NoteState';
import Alert from './components/Alert';
import AlertContext from './context/Alert/AlertContext';
import { useContext } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {

  const alertContext = useContext(AlertContext);
  const {alert} = alertContext;

  return (
    <>
    <NoteState>
    
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    {/* <Alert alert={alert}/> */}
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/about' element={<About/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
