import React, { useRef, useContext } from 'react'
import "./Register.css"
import { Link } from "react-router-dom"
import axios from 'axios';
import { ContextProvider } from '../Context';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    // const { name } = useContext(SocketContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(emailRef.current.value, passwordRef.current.value)
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            console.log(res);
        } catch (err) {
            alert('Error while Login');
        }
    };


    return (
        <div className='Login'>
            <div className='bg-white text-dark rounded formdiv'>
                <h3 className='text-center mb-4'>Sign in  </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder='Email' ref={emailRef} />
                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control" placeholder='Password' ref={passwordRef} />
                    </div>

                    <button type="submit" className="Register_btn mb-4">Sign In</button>

                    <div className="mb-2 text-center">
                        Don't have an account?  <Link to="/register"><u>Create one</u></Link >
                    </div>
                </form>
            </div>
        </div>

    )
}
