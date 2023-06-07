import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFlash } from '../context/Flashprovider';
import InputField from './inputField';

function Verify(){

    const [formErrors, setFormErrors ] = useState({});
    const tokenField = useRef();
    const flash = useFlash();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const accessToken = JSON.parse(token)
    const user = accessToken['accessToken']

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
        let userInput = {
            'token': token
        }


        fetch('http://localhost:8000/api/verify-otp/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user}`
              },
            body: JSON.stringify(userInput)
        }).then((response) => {

            console.log('res', response)
            if (!response.ok){
                flash('Unable to verify contact Admin', 'danger')
                flash('Login success', 'success');
            } 
            if(response.ok == true && response.status === 200){
                flash('Login success', 'success');
            };

            return response.json()})
        .then((data) => {
            console.log('data', data)
            if(data !== undefined){
                navigate('/dashboard/')
            }
            return data;
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