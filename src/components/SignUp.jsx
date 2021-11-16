import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import undraw from './assets/udr.png'


const SignUp = () => {
    const navigate = useNavigate();

    const validate = Yup.object({
        name: Yup.string().max(30, 'Must be 30 characters or less').required('field cannot be empty'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        phone: Yup.string().max(15, 'phone number is invalid').required('phone number is required'),
        password: Yup.string().min(6, 'Password must be at least 6 charaters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required'),
    })
    return (
        <section className="md:w-9/12 w-11/12 md:flex-row flex-col mx-auto flex justify-between md:mt-20 mt-10 items-center">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validate}
                    onSubmit={values => {
                        axios.post('https://61879aaf057b9b00177f9a1b.mockapi.io/users', values).then(res => {
                        }).catch((error) => { console.log(error) })

                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 2000)
                    }}
                >
                    {formik => (
                        <div className="md:w-6/12 w-11/12">
                            <h1 className="">Sign Up</h1>
                            <Form>
                                <TextField label="Name" name="name" type="text" />
                                <TextField label="Email" name="email" type="email" />
                                <TextField label="Phone Number" name="phone" type="text" />
                                <TextField label="password" name="password" type="password" />
                                <TextField label="Confirm Password" name="confirmPassword" type="password" />
                                <button className="btn btn-dark mt-3" type="submit">Sign Up</button>
                            </Form>
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    )}                   
                </Formik>
            <div>
                <img className="md:w-8/12 w-11/12" src={undraw} alt="banner" />
            </div>
        </section>
    )
}

export default SignUp