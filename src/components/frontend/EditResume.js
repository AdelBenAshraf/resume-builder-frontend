import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar'

const EditResume = () => {
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
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setResume({...resumeInput, [e.target.name]: e.target.value});
    }
    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/resumes/${id}`).then(res => {
            if (res.data.status === 200)
            {
                setResume(res.data.resume);
                
                console.log(res.data.resume);
            }
            else if (res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
            }
            setLoading(false);
        });
    }, [id]);

    const updateResume = (e) => {
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
        data.append('_method', 'PUT');
        axios.get('/sanctum/csrf-cookie').then(response => {
            console.log(data);
            axios.post(`/api/resumes/${id}`, data).then(res => {
                if (res.data.status === 200)
                {
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else if (res.data.status === 422)
                {                
                    swal("All fields are mandatory", "", "error");
                }
                else if (res.data.status === 404)
                {                
                    swal("Error", res.data.message, "error");
                    navigate('/');
                }
            });
        });
    }

    if(loading)
    {
        return <div><h4>Loading...</h4></div>
    }


  return (
    <div>
        <Navbar />
        
        <div className='container py-5'>
            <h1>Edit Resume:</h1>
            <br />
            <form onSubmit={updateResume}>
                <div className="row mb-3">
                    <label  className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" name='name' onChange={handleInput} value={resumeInput.name} placeholder='Enter your Name' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name='email' onChange={handleInput} value={resumeInput.email} placeholder='Enter your Email' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Age</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" min="16" max="60" id="age" name='age' onChange={handleInput} value={resumeInput.age} placeholder='Enter your Age' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" id="phone" name='phone' onChange={handleInput} value={resumeInput.phone} pattern="[0-9]{11}" required placeholder='01234567890' />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="address" name='address' onChange={handleInput} value={resumeInput.address} placeholder='Enter your Address' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Job Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="worktitle" name='worktitle' onChange={handleInput} value={resumeInput.worktitle} placeholder='Enter your latest job title' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Company</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="workcompany" name='workcompany' onChange={handleInput} value={resumeInput.workcompany} placeholder='Enter your latest company you have worked in' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Education</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="educationdiscipline" name='educationdiscipline' onChange={handleInput} value={resumeInput.educationdiscipline} placeholder='Enter your education discipline' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">University</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="educationplace" name='educationplace' onChange={handleInput} value={resumeInput.educationplace} placeholder='Enter your University' required />
                        
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input type="file" className="form-control" id="image" name='image' onChange={handleImage} />
                        
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Edit</button>
            </form>
        </div>
    </div>
  )
}
export default EditResume