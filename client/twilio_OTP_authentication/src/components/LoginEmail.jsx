import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { Link } from 'react-router-dom';

function LoginEmail() {
    const [formErrors, setFormErrors] = useState({});
    const emailField = useRef();
    const passwordField = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailField.current.value;
        const password = passwordField.current.value;

        const errors = {};

        if(!email){
            errors.email = 'Email must not be empty.';
        }
        if (!password){
            errors.password = 'Password must not be empty.'
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0){
            return;
        }

        console.log(`You have entered ${email}:${password}`)
    }
    return (
        <main className='container container-fluid'>
            <div className="row align-items-center">
                <h3 className='text-center'>Login</h3>
                <Form onSubmit={onSubmit}>
                    <InputField name='email' label='Email' type='email' error={formErrors.email} fieldRef={emailField} autoFocus/>
                    <InputField name='password' label='Password' type='password' error={formErrors.password} fieldRef={passwordField}/>
                    <div className="text-center">
                    <Button variant='primary' type='submit' style={{ width: '20rem'}}>Login</Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default LoginEmail