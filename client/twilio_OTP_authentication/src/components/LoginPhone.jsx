import React, { useState, useRef } from 'react';
import { redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';
import { useFlash } from '../context/Flashprovider';
import FlashMessage from '../components/FlashMessage';

function LoginPhone() {
    const [formErrors, setFormErrors] = useState({});
    const flash = useFlash();
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
            if (response.ok == true){
                flash('Proceed to verify OTP', 'success');
                setFormErrors({});
                return redirect('/verify-token/')
            } else if(response.ok == false){
                console.error('Hapa kuna shida', response)
                flash('Account does not exist please register', 'danger')
            };

            return response.json()})
        .then((data) => {
            // console.log('data', data)
            // flash(data.success, 'success');
            
        })
        .catch((error) => {
            console.error('Shida',error)
            flash('Failed: System encountered a problem.', 'danger')
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