{/* <Input name="punctuality" value={fetchedAss[fetchedData.id].userId === fetchedData.id ? fetchedAss[fetchedData.id].punctuality
    : assessment.punctuality}
    onChange={onChange} label="Punctuality" />


    import React from 'react'
import { useField } from 'formik'


const Input = ({name, value, onChange, label, type, required}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label className="block">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="border"
                type={type}
                required={required}
            />
        </>
    )
}

export default Input




import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Input from './Input';
import { Formik, Form } from 'formik';


const SignUp = () => {
    const navigate = useNavigate();
    const notify = () => toast("Oga check your password");
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })


    const postUser = (e) => {
        e.preventDefault();

        if (user.password === user.confirmPassword) {
            axios.post('https://61879aaf057b9b00177f9a1b.mockapi.io/users', user).then(res => {
            }).catch((error) => { console.log(error) })

            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)
        } else {
            notify();
        }
    }


    return (
        <div className="w-6/12 mx-auto mt-28 border">
            <ToastContainer />
            
            <form onSubmit={postUser}>
                <Input name="name" type="text" value={user.name} onChange={onChange} label="Name" required />
                <Input name="email" type="email" value={user.email} onChange={onChange} label="Email" required />
                <Input name="phone" type="text" value={user.phone} onChange={onChange} label="Phone Number" required />
                <Input name="password" type="password" value={user.password} onChange={onChange} label="Password" required />
                <Input name="confirmPassword" type="password" value={user.confirmPassword} onChange={onChange} label="Confirm Password" required />

                <button className="bg-gray-200 p-1 mt-4" >
                    Submit
                </button>
            </form>
            Already have an account? <Link to="/">Log In</Link>
        </div>

    )
}

export default SignUp





import { useState, useEffect } from 'react'
import axios from 'axios'

const useAxiosFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
         axios.get(url).then(res => {
            if (res.status >= 200 && res.status < 300) {
                setData(res.data)
            } 
        }).catch((error) => { console.log(error) })

    }, [url])

    return {data, setData}
}

export default useAxiosFetch


 */}
