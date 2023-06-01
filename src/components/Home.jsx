import React from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    
    const handleS = () => {
        navigate("/signup");
    }
    const handleL = () => {
        navigate("/login");
    }
    

  return (
    <div>
        <h2>Lets Go Inn...</h2>
        <div className='btn'>

            <button className='abd' onClick={handleL}>Login</button>
            <button className='abd' onClick={handleS}>SignUp</button>
        </div>
    </div>
  )
}

export default Home
