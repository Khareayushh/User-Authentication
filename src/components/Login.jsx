import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

function Login({setIsLoggedIn}) {
  const initialvalues = { username: "", password: ""}
  const [formvalues, setFromValues] = useState(initialvalues);
  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform login logic here
//     handleLogin(username, password);
//   };

const handleChange = (e) => {
  // console.log(e.target);
  const {name, value} = e.target;
  setFromValues({...formvalues, [name]: value});
}


const handleLogin = (e) => {
    e.preventDefault();
    setFromErrors(validate(formvalues));
    setIsSubmit(true);

  //   // Retrieve user data from local storage
  const existingUsers = localStorage.getItem('users');
  const users = JSON.parse(existingUsers);

  // // Find the user with the matching username
  const user = users.find(item => item.username === formvalues.username);
  if (!user) {
    // Display an error or show a message indicating the username is not found
    alert('Username not found. Please check your credentials.');
    return;
  }
  
  // // Check if the password matches
  if (user.password === formvalues.password) {
    // Perform additional actions upon successful login
    // For example, redirect to the welcome page and pass the user data
      
      // Set isLoggedIn state to true upon successful login
    setIsLoggedIn(true);
    // Redirect to the welcome page
    setTimeout(() => {
      navigate('/welcome');
    }, 1000);
  } else {
    // Display an error or show a message indicating the password is incorrect
    alert('Incorrect password. Please check your credentials.');
  }

  };

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formvalues);
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {};
    if(!values.username){
      errors.username = "Username is required!";
    }
    if(!values.password){
      errors.password = "Password is required!";
    }else if(values.password.length < 6) {
      errors.password = "Password must of minimum 6 size!"
    }
    return errors;
  }

  return (
    <div className='mdiv'>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            name='username'
            type="text"
            value={formvalues.username}
            onChange={handleChange}
          />
          <p className='errors'>{formErrors.username}</p>
        </label>
        <label>
          Password:
          <input
            name='password'
            type="password"
            value={formvalues.password}
            onChange={handleChange}
            />
            <p className='errors'>{formErrors.password}</p>
        </label>
        <Link className='link' to="/signup">Create account</Link> 
        <button type="submit">Submit</button>
      </form>

      {/* <pre>
        { JSON.stringify(formvalues, undefined, 2)}
      </pre> */}
    </div>
  );
}

export default Login;
