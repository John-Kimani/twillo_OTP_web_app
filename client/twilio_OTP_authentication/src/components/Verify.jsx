import React, { useRef, useState } from 'react';
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