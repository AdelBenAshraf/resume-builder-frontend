import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';


import axios from 'axios';
const Navbar = () => {
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/logout').then(res =>{
            if (res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                navigate('/login');
                swal("Success", res.data.Response, "success");
            }
        })
    });
    }

    var AuthButtons = '';
    if (localStorage.getItem('auth_token') === null) {
        AuthButtons = (
            <>
                <li className="nav-item" >
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
        );
    } else {
        AuthButtons = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/list-resumes">List Resumes</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/create-resume">Create Resume</Link>
                </li>
                <li className="nav-item">
                    <button type='button' onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
                </li>
            </>
            
        );
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
        <div className="container">
            <Link className="navbar-brand" to="/create-resume">Resume builder</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                {AuthButtons}
                
            </ul>
            
            </div>
        </div>
    </nav>
  )
}

export default Navbar