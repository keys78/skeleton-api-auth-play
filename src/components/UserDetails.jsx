import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from "axios";
import Input from './Input';
import useAxios from './useAxios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Loader';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: loadAssessment } = useAxios('https://61879aaf057b9b00177f9a1b.mockapi.io/assessment')
    const { data: user } = useAxios(`https://61879aaf057b9b00177f9a1b.mockapi.io/users/${id}`)
    const notify = () => toast("user assessment updated");

    const [assessment, setAssessment] = useState({
        userId: id,
        punctuality: "",
        accredibility: ""
    })
    const onChange = e => setAssessment({ ...assessment, [e.target.name]: e.target.value })

    const updateAssessment = (e) => {
        e.preventDefault();
        axios.post('https://61879aaf057b9b00177f9a1b.mockapi.io/assessment', assessment).then(res => {
        }).catch((error) => {
            console.log(error)
        })
        notify();
        setTimeout(() => {
            navigate('/dashboard')
        }, 2500)

    }
    const matched = loadAssessment && loadAssessment.find((el) => el.userId === id)


    return (
        <div className="w-11/12 mx-auto mt-10">
            {user ? (
                <div className="md:w-6/12 w-11/12 px-4 px-6 mx-auto border border-2">
                    <button className="mb-5 text-red-500" onClick={() => navigate(-1)}>Back</button>
                    <ToastContainer />
                    <h1>{user.id}</h1>
                    <h1 className="py-2 text-green-600">{user.name}</h1>
                    <h1>{user.email}</h1>
                    <h1>{user.phone}</h1>
                    <h1 className="mt-10">ASSESMENT</h1>
                    <form>
                        <Input name="punctuality" value={matched ? matched.punctuality : assessment.punctuality} onChange={onChange} label="Punctuality" />
                        <Input name="accredibility" value={matched ? matched.accredibility : assessment.accredibility} onChange={onChange} label="Accredibility" />
                        <button onClick={updateAssessment} className="bg-gray-200 p-1 mt-4" >
                            update {user.id}
                        </button>
                    </form>
                </div>
            ) : <Loader /> }

        </div>
    )
}

export default UserDetails
