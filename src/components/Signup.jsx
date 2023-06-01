import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup({setIsLoggedIn}) {

  const initialvalues = {name: "", username: "", email: "", password:""};

  const [formvalues, setFromValues] = useState(initialvalues);
  const [formErrors, setFromErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // const [name, setName] = useState('');
  const navigate = useNavigate();


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({name, username, email, password});
//     // Perform signup logic here
//     handleSignup(name, username, email, password);
//   };

const handleChange = (e) => {
  const {name, value} = e.target;
  setFromValues({...formvalues, [name]: value});
}



const handleSignup = (e) => {
    e.preventDefault();
    setFromErrors(validate(formvalues));
    setIsSubmit(true);
    // Retrieve existing user data from local storage
    const existingUsers = localStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    // Check if the username already exists
  const isUsernameTaken = users.some(user => user.username === formvalues.username);
  
  if (isUsernameTaken) {
    // Display an error or show a message indicating the username is already taken
    alert('Username is already taken. Please choose a different username.');
    return;
  }

    // Generate a unique ID for the new user
    const id = Date.now();

    // Create a new user object
    const newUser = {
      id,
      ...formvalues
    };

    // Add the new user to the existing data
    users.push(newUser);

    // Store the updated user data in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Perform any additional signup logic here

    // Set isLoggedIn state to true upon successful signup
    setIsLoggedIn(true);

    // Redirect to the welcome page
    navigate('/welcome');
      

  };

  useEffect(() => {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formvalues);
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.name){
      errors.name = "Name is Required!";
    } 
    if(!values.username){
      errors.username = "Username is Required!"
    }
    if(!values.email){
      errors.email = "Email is Required!"
    }else if(!regex.test(values.email)){
      errors.email = "This is not a valid email format!";
    }
    if(!values.password){
      errors.password = "Password is Required!"
    }else if(values.password.length < 6){
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  }

  return (
    <div className='mdiv'>
      <h2 className='heading'>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            name='name'
            value={formvalues.name}
            onChange={handleChange}
          />
          <p className='errors'>{formErrors.name}</p>
        </label>
        <label>
          Username:
          <input
            type="text"
            name='username'
            value={formvalues.username}
            onChange={handleChange}
            />
            <p className='errors'>{formErrors.username}</p>
        </label>
        <label>
          Email:
          <input
            name='email'
            type="text"
            value={formvalues.email}
            onChange={handleChange}
            />
            <p className='errors'>{formErrors.email}</p>
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Signup;
