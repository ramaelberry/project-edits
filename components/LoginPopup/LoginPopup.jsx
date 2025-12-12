import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../pages/Context/StoreContext'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Sign Up");
    const { login } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }

        if (currState === "Sign Up" && !formData.name) {
            setError('Please enter your name');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Password validation (minimum 6 characters)
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // In a real app, you would call an API here
        // For now, we'll just create a user object and login
        const userData = {
            name: formData.name || 'User', // For login, we might not have name
            email: formData.email,
            id: Date.now() // Simple ID generation
        };

        login(userData);
        setShowLogin(false);
        setFormData({ name: '', email: '', password: '' }); // Reset form
        setError('');
    };

  return (
    <div className='login-popup'>
        <div className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2> <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="login-popup-inputs">
                    {currState==="Sign Up"?<input 
                        type="text" 
                        name="name"
                        placeholder='Your name' 
                        value={formData.name}
                        onChange={handleChange}
                    />:<></>}
                    <input 
                        type="email" 
                        name="email"
                        placeholder='Your email' 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Password' 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{color: 'red', fontSize: '14px', margin: '10px 0'}}>{error}</p>}
                <button type="submit">{currState==="Login"?"Login":"Create account"}</button>
            </form>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>{setCurrState('Sign Up'); setError(''); setFormData({ name: '', email: '', password: '' });}}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=>{setCurrState('Login'); setError(''); setFormData({ name: '', email: '', password: '' });}}>Login here</span></p>
            }
        </div>
    </div>
  )
}

export default LoginPopup
