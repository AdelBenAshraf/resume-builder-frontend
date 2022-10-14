import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';

const ListResumes = () => {
    const [loading, setLoading] = useState(true);
    const [resumesList, setResumesList] = useState([]);
    useEffect(() => {

        axios.get('/api/resumes').then(res => {
            if (res.data.status === 200)
            {
                setResumesList(res.data.resumes);
            }
            setLoading(false);
        });
    }, []);

    const deleteResume = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        axios.delete(`/api/resumes/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status == 404)
            {
                swal("Success", res.data.message, "success");
                thisClicked.innerText= "Delete";
            }
        });
    }

    var listResumes = "";
    if (loading) {
        return <div>Loading Resumes...</div>
    }
    else
    {
        listResumes = resumesList.map((resume, index) => {
            return (
                <tr key={index}>
                    <td>{resume.id}</td>
                    <td>{resume.name}</td>
                    <td>{resume.email}</td>
                    <td>{resume.age}</td>
                    <td>{resume.phone}</td>
                    <td>{resume.address}</td>
                    <td>{resume.worktitle}</td>
                    <td>{resume.workcompany}</td>
                    <td>{resume.educationdiscipline}</td>
                    <td>{resume.educationplace}</td>
                    <td>
                        <img src={`http://localhost/images/${resume.image}`} className="rounded-circle" style={{width: '50px', height: '50px'}} />
                    </td>
                    <td>
                        <Link to={`/edit-resume/${resume.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button onClick={(e) => deleteResume(e,resume.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                    <td>
                        <Link to={`/show-resume/${resume.id}`} className="btn btn-primary btn-sm">Show</Link>
                    </td>
                </tr>
            )
        }
        );
    }

  return (
    <div className='container px-4'>
        <div className='card mt-4'>
            <div className='card-header'>
                <h3>Resumes List
                <Link to='/create-resume' className='btn btn-primary float-end'>Create Resume</Link>
                </h3>
            </div>
            <div className='card-body'>
                <table className='table table-bordered table striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Education</th>
                            <th>Education Institution</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Show</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listResumes}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ListResumes