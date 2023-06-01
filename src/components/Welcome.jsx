import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome(isLoggedIn) {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
    }

  return (

    <div>
      <h1>Welcome</h1>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default Welcome
