import React from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import useAxiosFetch from './useAxiosFetch';
import Loader from './Loader';
import { pageAnimation } from "../animations"
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { data: usersData, isLoading, fetchError } = useAxiosFetch('https://61879aaf057b9b00177f9a1b.mockapi.io/users')
    const navigate = useNavigate();

    const deleteUser = (value) => {
        axios.delete(`https://61879aaf057b9b00177f9a1b.mockapi.io/users/` + value)
        axios.delete(`https://61879aaf057b9b00177f9a1b.mockapi.io/assessment/` + value)
            .then(res => {

            }).catch((error) => { console.log(error) })
    }

    // let info = [
    //     {name:'a', age:'1'},
    //     {name:'b', age:'2'},
    //     {name:'ac', age:'3'}

    // ]
 
    // console.log(info.map(el => el.name))

    // let person = {name: "Sarah", country: "Nigeria", job: "Developer"};
    // let {name, country, job} = person;

    return (
        <>
        {isLoading && <p className="statusMsg"><Loader /></p>}
        <motion.div
            variants={pageAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-11/12 mx-auto mt-10">
            <div>
                
                {!isLoading && fetchError && <div className="statusMsg" style={{ color: "red" }}>{fetchError}</div>}
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
            {/* {info.map((inf, i) => ( */}
                {/* <div>
                    {name}
                    {job}
                    {country}
                </div> */}
            {/* ))} */}
        </motion.div>
        </>
    )
}



export default Dashboard
