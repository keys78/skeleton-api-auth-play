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

    const [exams, setExams] = useState([{
        subject:'',
        score:''
    }])


    const handleScore = (e, index) => {
		const { name, value } = e.target;

		const item = [...exams];
		item[index][name] = value;
		setExams(item)
	}

    const handleAddInput = () => {
        setExams([...exams,{ subject: '', score: '' }]);
    }

    const handleRemoveInput = (index) => {
        setExams([...exams].splice(index, 1));
    }

   

	






    const [assessment, setAssessment] = useState({
        userId: id,
        punctuality: "",
        accredibility: ""
    })
    const onChange = e => setAssessment({ ...assessment, [e.target.name]: e.target.value })

    const updateAssessment = (e) => {
        e.preventDefault();
        axios.post('https://61879aaf057b9b00177f9a1b.mockapi.io/assessment', exams).then(res => {
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
                    <h6>{user.id}</h6>
                    <h6 className="py-2 text-green-600">{user.name}</h6>
                    <h6>{user.email}</h6>
                    <h6>{user.phone}</h6>
                    <h6 className="mt-10">ASSESMENT</h6>
                    <form>
                        <Input name="punctuality" value={matched ? matched.punctuality : assessment.punctuality} onChange={onChange} label="Punctuality" />
                        <Input name="accredibility" value={matched ? matched.accredibility : assessment.accredibility} onChange={onChange} label="Accredibility" />
                        <br />
                        <button onClick={updateAssessment} className="bg-gray-200 p-1 mt-4 rounded" >
                            update user{user.id}
                        </button>
                    </form>


                    {exams.map((list, i) => (
                        <div key={i} className="mt-20 flex gap-4">
                            <input value={list.subject} onChange={e => handleScore(e, i)} className="border" name="subject" />
                            <input value={list.score} onChange={e => handleScore(e, i)} className="border" name="score" />

                            {exams.length - 1 === i && <input type="button" value="add" onClick={handleAddInput} />}
                            {exams.length !== 1 && <input type="button" value="remove" onClick={handleRemoveInput} />}

                        </div>
                    ))}

                </div>
            ) : <Loader />}

        </div>
    )
}

export default UserDetails
