import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { Link } from 'react-router-dom';

function LoginPhone() {
    const [formErrors, setFormErrors] = useState({});
    const phoneNumberField = useRef();
    const passwordField = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const phone_number = phoneNumberField.current.value;
        const password = passwordField.current.value;

        const errors = {};

        if(!phone_number){
            errors.phone_number = 'Phone Number must not be empty.';
        }
        // if(phone_number.length < 1 || phone_number.length > 10){
        //     errors.phone_number = 'Please provide a valid phone number'
        // }
        if (!password){
            errors.password = 'Password must not be empty.'
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0){
            return;
        }

        console.log(`You have entered ${phone_number}:${password}`)
    }
    return (
        <main className='container container-fluid'>
            <div className="row align-items-center">
                <h3 className='text-center'>Login with Phone</h3>
                <Form onSubmit={onSubmit}>
                    <InputField name='email' label='Phone Number' type='number' error={formErrors.phone_number} fieldRef={phoneNumberField} autoFocus/>
                    <InputField name='password' label='Password' type='password' error={formErrors.password} fieldRef={passwordField}/>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>

                <div className="mt-2">
                    <hr />
                    <p>Don&apos;t have an account? <Link to='/sign-up'>Register</Link></p>
                </div>
            </div>
        </main>
    )
}

export default LoginPhone