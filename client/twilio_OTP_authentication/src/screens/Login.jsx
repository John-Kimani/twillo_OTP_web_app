import React, { useState } from 'react';
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

    if (phoneLogin) {
        return (
            <>
                <NavBar />
                <LoginPhone />
                <div className="text-center mt-2">
                    <hr/>
                    <Button variant='secondary' onClick={togglePhoneLogin}>Login with Email</Button>
                    <p>or</p>
                    <p>Don&apos;t have an account? <Link to='/sign-up'>Register</Link></p>
                </div>
            </>)
    }

    return (
        <>
            <NavBar />
            <LoginEmail />
            <div className="text-center mt-2">
                <hr />
                <Button variant='secondary' onClick={togglePhoneLogin}>Login with Phone</Button>
                <p>or</p>
                <p>Don&apos;t have an account? <Link to='/sign-up'>Register</Link></p>
            </div>
        </>
    )
}

export default Login