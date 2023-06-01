import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter , Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from './components/Welcome'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //Login got lifted
  

  //Signup got up

  

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/welcome' element={<Welcome isLoggedIn/>} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}  />
        <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
