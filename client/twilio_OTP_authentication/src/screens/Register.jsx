import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputField from '../components/inputField';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useFlash } from '../context/Flashprovider';
import FlashMessage from '../components/FlashMessage';

function Register() {
    const [formErrors, setFormErrors] = useState({});
    const firstNameField = useRef();
    const lastNameField = useRef();
    const userNameField = useRef();
    const emailField = useRef();
    const phoneNumberField = useRef();
    const flash = useFlash();

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const first_name = firstNameField.current.value;
        const last_name = lastNameField.current.value;
        const username = userNameField.current.value;
        const email = emailField.current.value;
        const phone_number = phoneNumberField.current.value;

        const errors = {};

        if (!first_name) {
            errors.first_name = 'This field is required'
        }
        if (!last_name) {
            errors.last_name = 'This field is required'
        }

        if (!username) {
            errors.username = 'Username cannot be blank'
        }
        if (!email) {
            errors.email = 'Email is required'
        }
        if (!phone_number) {
            errors.phone_number = 'Phone is required'
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        let userInformation = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'username': username,
            'phone_number': phone_number
        }

        fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userInformation)
        }).then((response) => {
            if (!response.ok){
                flash('Unable to create account', 'danger');
                // throw new Error(
                //     `This is an HTTP errror: The status is ${response.status}`
                // )
                console.log(response)
            } 
            
            if (response.ok === true && response.status === 201){
            flash('You have successfully registered an account', 'success');
            navigate('/')
             }

            return response.json()})
        .then((data) => { 
            return data;
        })
        .catch((error) => {
            flash('Failed to create account', 'danger');
            return error;
        })

    }

    return (
        <>
            <NavBar />
            <main className='container container-fluid'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <Card className="col-md-4 mt-4" style={{padding: 0}}>
                        <FlashMessage />
                        <Card.Title className='text-center pt-3'> REGISTER</Card.Title>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <InputField name='first_name' label='First Name*' type='text' error={formErrors.first_name} fieldRef={firstNameField} />
                                    </div>
                                    <div className="col">
                                        <InputField name='last_name' label='Last Name*' type='text' error={formErrors.last_name} fieldRef={lastNameField} />
                                    </div>
                                </div>
                                <InputField name='email' label='Enter your email*' type='email' error={formErrors.email} fieldRef={emailField} />
                                <div className="row">
                                    <div className="col">
                                        <InputField name='username' label='Username*' type='text' error={formErrors.username} fieldRef={userNameField} />
                                    </div>
                                    <div className="col">
                                        <InputField name='phone_number' label='Phone Number*' type='tel' placeholder='format: 0710200300' error={formErrors.phone_number} fieldRef={phoneNumberField} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Button variant='primary' type='submit' style={{ width: '15rem' }}>Sign Up</Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                        <p>Already have an account? <Link to='/'>Login</Link></p>
                        </Card.Footer>
                    </Card>
                    <div className="col-md-4"></div>
                </div>
            </main>

        </>

    )
}

export default Register