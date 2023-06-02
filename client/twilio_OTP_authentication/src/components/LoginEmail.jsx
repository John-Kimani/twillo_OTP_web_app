import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { useFlash } from '../context/Flashprovider';

function LoginEmail() {
    const [formErrors, setFormErrors] = useState({});
    const emailField = useRef();
    const flash = useFlash();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailField.current.value;

        const errors = {};

        if(!email){
            errors.email = 'Email must not be empty.';
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0){
            return;
        }

        console.log(`You have entered ${email}`)

        let userInput = {
            'email': email
        }

        fetch('http://localhost:8000/api/login-email/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userInput) 
        }).then((response) => {
            // console.log('res', response)
            if (!response.ok){
                flash('Unable to fetch account', 'danger')
                // throw new Error(
                //     `This is an HTTP error: The status code is ${response.status}`
                // )
            }

            if (response.ok === true && response.status === 200){
                flash('Account found, proceed to verify OTP', 'success')
            }

            return response.json()
        }).then((data) => {
            if(data !== undefined){
                let auth_tokens = data.data.auth_tokens
                localStorage.setItem('token', JSON.stringify({
                    'accessToken': auth_tokens['access'],
                    'refreshToken': auth_tokens['refresh']
                }))
                navigate(`/verify-token/${uuidv4()}`)
            };

            flash('Trouble on login', 'warning')
            return data;
        }).catch((error) => {
            console.error(error)
            flash('Failed: System encountered a problem.', 'danger')
            return error;
        })
    }
    return (
        <main className='container container-fluid'>
            <div className="row align-items-center">
                <h3 className='text-center'>Login With Email</h3>
                <Form onSubmit={onSubmit}>
                    <InputField name='email' label='Email*' type='email' error={formErrors.email} fieldRef={emailField} autoFocus/>
                    <div className="text-center">
                    <Button variant='primary' type='submit' style={{ width: '20rem'}}>Login</Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default LoginEmail