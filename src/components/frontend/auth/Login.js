import React, {useState} from 'react'
import axios from 'axios';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';

import Navbar from '../../../layouts/frontend/Navbar'

const Login = () => {
    const navigate = useNavigate();

    const [loginInput, setLogin] =useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password
        }
            axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then(res => {
                if (res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                    
                }
                else if (res.data.status === 401)
                {
                    swal('Warning', res.data.message, 'warning');
                }
                else
                {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }
    
  return (
    <div>
      <Navbar />
      <div className='container py-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h3>Login</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={loginSubmit}>
                            <div className='form-group mb-3'>
                                <label>Email</label>
                                <input type='email' name='email' onChange={handleInput} value={loginInput.email} className='form-control' id='email' placeholder='Enter Email'  />
                                <span>{loginInput.error_list.email}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Password</label>
                                <input type='password' name='password' onChange={handleInput} value={loginInput.password} className='form-control' id='password' placeholder='Enter Password'  />
                                <span>{loginInput.error_list.password}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <button type='submit' className='btn btn-primary btn-block'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login