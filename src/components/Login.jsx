import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Input from './Input';
import useAxios from './useAxios';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const { data: allUsers } = useAxios('https://61879aaf057b9b00177f9a1b.mockapi.io/users')
    const notify = () => toast("Invalid user details");

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })


    const authUser = (e) => {
        e.preventDefault();
        const authenticateUser = allUsers && allUsers.find((el) =>
        (el.email && el.password) === (user.email && user.password))

        authenticateUser ? navigate('/dashboard') : notify();
    }


    return (
        <div className="w-6/12 mx-auto mt-28 border">
            LOGIN
            <ToastContainer />
            <form onSubmit={authUser}>
                <Input name="email" type="email" value={user.email} onChange={onChange} label="Email" required/>
                <Input name="password" type="password" value={user.password} onChange={onChange} label="Password" required/>
                <button className="bg-gray-200 p-1 mt-4" >
                    Submit
                </button>
            </form>
            Don't have an account? <Link to="/">signup here</Link>
        </div>

    )
}

export default Login
