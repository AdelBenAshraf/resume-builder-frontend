import React, {useState} from 'react'
import swal from 'sweetalert'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar'

const CreateResume = () => {
    const navigate = useNavigate();

    const [resumeInput, setResume] = useState({
        name: '',
        email: '',
        age: '',
        phone: '',
        address: '',
        worktitle: '',
        workcompany: '',
        educationdiscipline: '',
        educationplace: '', 
        error_list: [],
    });

    const [image, setImage] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setResume({...resumeInput, [e.target.name]: e.target.value});
    }
    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }
    const submitResume = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', resumeInput.name);
        data.append('email', resumeInput.email);
        data.append('age', resumeInput.age);
        data.append('phone', resumeInput.phone);
        data.append('address', resumeInput.address);
        data.append('worktitle', resumeInput.worktitle);
        data.append('workcompany', resumeInput.workcompany);
        data.append('educationdiscipline', resumeInput.educationdiscipline);
        data.append('educationplace', resumeInput.educationplace);
        data.append('image', image.image);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/resumes', data).then(res => {
                if (res.data.status === 201)
                {
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else if (res.data.status === 400)
                {
                    setResume({...resumeInput, error_list: res.data.errors});
                }
            });
        });
    }

  return (
    <div>
        <Navbar />
        
        <div className='container py-5'>
            <h1>Create Resume:</h1>
            <br />
            <form onSubmit={submitResume}>
                <div className="row mb-3">
                    <label for="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" name='name' onChange={handleInput} value={resumeInput.name} placeholder='Enter your Name' required />
                        <span>{resumeInput.error_list.name}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name='email' onChange={handleInput} value={resumeInput.email} placeholder='Enter your Email' required />
                        <span>{resumeInput.error_list.email}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="age" className="col-sm-2 col-form-label">Age</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" min="16" max="60" id="age" name='age' onChange={handleInput} value={resumeInput.age} placeholder='Enter your Age' required />
                        <span>{resumeInput.error_list.age}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" id="phone" name='phone' onChange={handleInput} value={resumeInput.phone} pattern="[0-9]{11}" required placeholder='01234567890' />
                        <span>{resumeInput.error_list.phone}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="address" name='address' onChange={handleInput} value={resumeInput.address} placeholder='Enter your Address' required />
                        <span>{resumeInput.error_list.address}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="worktitle" className="col-sm-2 col-form-label">Job Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="worktitle" name='worktitle' onChange={handleInput} value={resumeInput.worktitle} placeholder='Enter your latest job title' required />
                        <span>{resumeInput.error_list.worktitle}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="workcompany" className="col-sm-2 col-form-label">Company</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="workcompany" name='workcompany' onChange={handleInput} value={resumeInput.workcompany} placeholder='Enter your latest company you have worked in' required />
                        <span>{resumeInput.error_list.workcompany}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="educationdiscipline" className="col-sm-2 col-form-label">Education</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="educationdiscipline" name='educationdiscipline' onChange={handleInput} value={resumeInput.educationdiscipline} placeholder='Enter your education discipline' required />
                        <span>{resumeInput.error_list.educationdiscipline}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="educationplace" className="col-sm-2 col-form-label">University</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="educationplace" name='educationplace' onChange={handleInput} value={resumeInput.educationplace} placeholder='Enter your University' required />
                        <span>{resumeInput.error_list.educationplace}</span>
                    </div>
                </div>
                <div className="row mb-3">
                    <label  for="image" className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input type="file" className="form-control" id="image" name='image' onChange={handleImage}  required />
                        <span>{resumeInput.error_list.image}</span>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
  )
}
export default CreateResume