import React, { useRef, useState } from 'react';
import { redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './inputField';

function Verify(){

    const [formErrors, setFormErrors ] = useState({});
    const tokenField = useRef();

    const onVerify = (e) => {
        e.preventDefault();

        const token = tokenField.current.value;

        const errors = {};

        if(!token){
            errors.token = 'Field cannot be empty.'
        }
        
        setFormErrors(errors);
        if (Object.keys(errors).length > 0){
            return;
        }

        console.log('token', token);
        let userInput = {
            'token': token
        }

        fetch('http://localhost:8000/api/verify-otp/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userInformation)
        }).then((response) => {
            if (response.ok == true){
                flash('Login success', 'success');
                setFormErrors({});
                return redirect('/dashboard')
            } else if(response.ok == false){
                console.error('Hapa kuna shida', response)
                flash('Unable to verify contact Admin', 'danger')
            };

            return response.json()})
        .then((data) => {
            // console.log('data', data)
            // flash(data.success, 'success');
            
        })
        .catch((error) => {
            console.error('Shida',error)
            flash('Failed to verify OTP', 'danger')
        })
    };

  return (
    <section>
        <Form onSubmit={onVerify}>
            <InputField name='token' label='Token' type='text' error={formErrors.token} fieldRef={tokenField} autofocus/>
            <div className="text-center">
                    <Button variant='primary' type='submit' style={{ width: '100%'}}>Verify</Button>
            </div>
        </Form>
    </section>
  )
}

export default Verify