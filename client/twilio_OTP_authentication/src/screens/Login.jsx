import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import NavBar from '../components/NavBar';
import LoginEmail from '../components/LoginEmail';
import LoginPhone from '../components/LoginPhone';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Login() {

    const [phoneLogin, setPhoneLogin] = useState(false);

    const togglePhoneLogin = () => {
        setPhoneLogin(current => !current);
    };

    const toggleEmailLogin = () => {
        setPhoneLogin(false)
    }

    return (
        <>
            <NavBar />
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-4">
                    <Card>
                    <Card.Header>
                        <div className="d-flex justify-content-around">
                        <Button variant='outline-secondary' onClick={toggleEmailLogin}>Login with Email</Button>
                        <Button variant='outline-secondary' onClick={togglePhoneLogin}>Login with Phone</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {phoneLogin ? <LoginPhone/> : <LoginEmail />}
                    </Card.Body>
                    <Card.Footer className='text-center'>
                        <p>Don&apos;t have an account? <Link to='/sign-up'>Register</Link></p>
                    </Card.Footer>
                    </Card>
                </div>
                <div className="col-md-4"></div>
            </div>

        </>
    )
}

export default Login