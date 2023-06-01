import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { Link } from 'react-router-dom';

function LoginPhone() {
    const [formErrors, setFormErrors] = useState({});
    const phoneNumberField = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const phone_number = phoneNumberField.current.value;

        const errors = {};

        if(!phone_number){
            errors.phone_number = 'Phone Number must not be empty.';
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
                    <InputField name='phone_number' label='Phone Number*' type='tel' placeholder='format: 0710200300' error={formErrors.phone_number} fieldRef={phoneNumberField} autoFocus/>
                    <div className="text-center">
                    <Button variant='primary' type='submit' style={{ width: '20rem'}}>Login</Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default LoginPhone