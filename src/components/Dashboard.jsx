import React from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import useAxios from './useAxios';
import Loader from './Loader';
import { pageAnimation } from "../animations"
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { data: usersData } = useAxios('https://61879aaf057b9b00177f9a1b.mockapi.io/users')
    const navigate = useNavigate();

    const deleteUser = (value) => {
        axios.delete(`https://61879aaf057b9b00177f9a1b.mockapi.io/users/` + value)
        axios.delete(`https://61879aaf057b9b00177f9a1b.mockapi.io/assessment/` + value)
            .then(res => {

            }).catch((error) => { console.log(error) })
           

    }


    return (
        <motion.div
        variants={pageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-11/12 mx-auto mt-10">
            {usersData ? (
                <div>
                    {usersData.map((user, i) => (
                        <div className="md:w-6/12 w-11/12 px-4 px-6 mx-auto border border-2" key={i}>
                            <h6>{user.id}</h6>
                            <h6 className="py-2 text-green-600">{user.name}</h6>
                            <button className="text-red-500" onClick={() => deleteUser(user.id)}>remove</button>
                            <Link className="text-blue-500 ml-5" to={`/dashboard/${user.id}`}>
                                view
                            </Link>
                        </div>
                    ))}
                    <button className="absolute top-5 right-60 bg-gray-500 text-white p-2 rounded" onClick={() => navigate('/')}>Logout</button>
                </div>

            ) : <Loader />}

        </motion.div>
    )
}



export default Dashboard
