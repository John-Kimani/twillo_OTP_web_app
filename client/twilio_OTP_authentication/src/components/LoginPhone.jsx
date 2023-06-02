import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { useFlash } from '../context/Flashprovider';
import FlashMessage from '../components/FlashMessage';

function LoginPhone() {
    const [formErrors, setFormErrors] = useState({});
    const flash = useFlash();
    const phoneNumberField = useRef();
    const navigate = useNavigate();

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

        let user_input = {
            'phone_number': phone_number
        }

        fetch('http://localhost:8000/api/login-phone/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(user_input) 
        }).then((response) => {
            console.log('res', response)
            if (!response.ok){
                flash('Unable to fetch account', 'danger')
            }

            if (response.ok === true && response.status === 200){
                flash('Account found, proceed to verify OTP', 'success')
            }

            return response.json()})
        .then((data) => {
            console.log('data', data)
            if(data !== undefined){
                let auth_tokens = data.data.auth_tokens
                localStorage.setItem('token', JSON.stringify({
                    'accessToken': auth_tokens['access'],
                    'refreshToken': auth_tokens['refresh']
                }));
                navigate(`/verify-token/${uuidv4()}`)
            };
            flash('Trouble on login', 'warning')
            return data;
        })
        .catch((error) => {
            flash('Failed: System encountered a problem.', 'danger')
            return error;
        })
    }
    return (
        <main className='container container-fluid'>
            <div className="row align-items-center">
                <FlashMessage />
                <h3 className='text-center'>Login with Phone</h3>
                <Form onSubmit={onSubmit}>
                    <InputField name='phone_number' label='Phone Number*' type='tel' placeholder='format: 710200300' error={formErrors.phone_number} fieldRef={phoneNumberField} autoFocus/>
                    <div className="text-center">
                    <Button variant='primary' type='submit' style={{ width: '20rem'}}>Login</Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default LoginPhone