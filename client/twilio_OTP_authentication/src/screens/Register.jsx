import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputField from '../components/inputField';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Register() {
    const [formErrors, setFormErrors] = useState({});
    const firstNameField = useRef();
    const lastNameField = useRef();
    const userNameField = useRef();
    const emailField = useRef();
    const passwordField = useRef();
    const password2Field = useRef();
    const phoneNumberField = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const first_name = firstNameField.current.value;
        const last_name = lastNameField.current.value;
        const username = userNameField.current.value;
        const email = emailField.current.value;
        const phone_number = phoneNumberField.current.value;
        const password = passwordField.current.value;
        const password2 = password2Field.current.value;


        if (passwordField.current.value !== password2Field.current.value) {
            setFormErrors({ password2: "Passwords don't match" })
        } else {
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
            if(!password){
                errors.password ='Password should not be blank'
            }
            if(!password2){
                errors.password2 ='Confirm should not be blank'
            }

            setFormErrors(errors);
            if (Object.keys(errors).length > 0) {
                return;
            }

            console.log(`You have entered: FN ${first_name}, LN ${last_name}, UN ${username}, EM ${email}, PN ${phone_number}`)
        }

    }
    return (
        <>
            <NavBar />
            <main className='container container-fluid'>
                <div className="row">
                    <div className="col-md-4"></div>
                    <Card className="col-md-4 mt-4" style={{padding: 0}}>
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
                                        <InputField name='phone_number' label='Phone Number*' type='number' error={formErrors.phone_number} fieldRef={phoneNumberField} />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col">
                                        <InputField name='password' label='Password' type='password' error={formErrors.password} fieldRef={passwordField} />
                                    </div>
                                    <div className="col">
                                        <InputField name='password2' label='Confirm Password' type='password' error={formErrors.password2} fieldRef={password2Field} />
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