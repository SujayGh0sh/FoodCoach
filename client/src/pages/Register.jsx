import React, { useState } from 'react';

import "./Register.css"
import { Link } from "react-router-dom"
import axios from 'axios';
export default function Register() {


    const [user, setUser] = useState({

        username: "", email: "", password: ""
    })
    let name, value;
    const HandleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }




    const postData = async (e) => {
        e.preventDefault();
        const { username, email, password } = user;

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username: username,
                email: email,
                password: password,
            })
            res.data && window.location.replace("/login");
        } catch (err) {
            alert("error while registration")
        }
    };


    return (
        <div className='Register'>
            <div className='bg-white text-dark rounded formdiv'>
                <h3 className='text-center mb-4'>Create Account </h3>
                <form>
                    <div className="mb-4">
                        <input type="text" className="form-control" value={user.username} name='username' onChange={HandleInputs} placeholder='Username (required)' required />

                    </div>

                    <div className="mb-4">
                        <input type="email" className="form-control" value={user.email} name='email' onChange={HandleInputs} placeholder='Email (required)' required />
                    </div>

                    <div className="mb-4">
                        <input type="password" className="form-control" value={user.password} name='password' onChange={HandleInputs} placeholder='Password (required)' required />
                    </div>

                    <button type="submit" className="Register_btn mb-4" onClick={postData}>Sign Up</button>

                    <div className="mb-2 text-center">
                        Already have an account? <Link to="/login"><u>Sign-in</u></Link >
                    </div>
                </form>
            </div>
        </div>
    )
}
