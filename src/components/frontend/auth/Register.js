import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar'
import React, {useState} from 'react'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();

    const [registerInput, setRegister] = React.useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: []
    });
    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 201)
                {
                    swal("Success", res.data.message, "success");
                    navigate('/login');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors});
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
                        <h3>Register</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={registerSubmit}>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input type='text' name='name' onChange={handleInput} value={registerInput.name} className='form-control' id='name' placeholder='Enter Name'/>
                                <span>{registerInput.error_list.name}</span>
                                {console.log(registerInput.error_list.name)}
                                
                            </div>
                            <div className='form-group mb-3'>
                                <label>Email</label>
                                <input type='email' name='email' onChange={handleInput} value={registerInput.email} className='form-control' id='email' placeholder='Enter Email' />
                                <span>{registerInput.error_list.email}</span>
                                
                            </div>
                            <div className='form-group mb-3'>
                                <label>Password</label>
                                <input type='password' name='password' onChange={handleInput} value={registerInput.password} className='form-control' id='password' placeholder='Enter Password' />
                                <span>{registerInput.error_list.password}</span>
                                
                            </div>

                            <div className='form-group mb-3'>
                                <label>Confirm Password</label>
                                <input type='password' name='password_confirmation' onChange={handleInput} value={registerInput.password_confirmation} className='form-control' id='password_confirmation' placeholder='Confirm password' />
                            </div>

                            <div className='form-group mb-3'>
                                <button type='submit' className='btn btn-primary btn-block'>Register</button>
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

export default Register