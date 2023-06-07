import React from 'react';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
  return (
    <>
        <NavBar />
        <div className="container container-fluid">
        <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 mt-4">
                        <Card>
                            <Card.Header className='text-center'><h4>WELCOME</h4></Card.Header>
                            <Card.Body>
                                <h5>Dear: User</h5>
                                <p>You are logged in successfully</p>
                            </Card.Body>
                            <Card.Footer className='text-center'>
                            <Button onClick={logout} variant='outline-danger'>Logout</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className="col-md-4"></div>
                </div>
        </div>
    </>
  )
}

export default Dashboard