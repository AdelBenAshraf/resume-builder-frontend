import axios from 'axios';
import swal from 'sweetalert'
import { useNavigate, useParams } from 'react-router-dom';
import React,{useEffect, useState} from 'react'
import './ShowResume.css';

const ShowResume = () => {
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
        image: '', 
        error_list: [],
    });
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
                navigate('/list-resumes');
            }
            
        });
    }, [id]);
    


  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <div class="resume-wrapper">
        <section class="profile section-padding">
          <div class="container2">
            <div class="picture-resume-wrapper">
              <div class="picture-resume">
                <span><img src={"http://localhost/images/"+resumeInput.image}/></span>
                <svg version="1.1" viewBox="0 0 350 350">

                  <defs>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" result="cm" />
                    </filter>
                  </defs>

                  <g filter="url(#goo)">

                    <circle id="main_circle" class="st0" cx="171.5" cy="175.6" r="130" />

                    <circle id="circle" class="bubble0 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble1 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble2 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble3 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble4 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble5 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble6 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble7 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble8 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble9 st1" cx="171.5" cy="175.6" r="122.7" />
                    <circle id="circle" class="bubble10 st1" cx="171.5" cy="175.6" r="122.7" />

                  </g>
                </svg>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="name-wrapper">
              <h1>{resumeInput.name}</h1>
            </div>
            <div class="clearfix"></div>
            <div class="contact-info clearfix">
              <ul class="list-titles">
                <li>Call</li>
                <li>Mail</li>
                <li>Web</li>
                <li>Home</li>
              </ul>
              <ul class="list-content ">
                <li>{resumeInput.phone}</li> 
                <li>{resumeInput.email}</li> 
                <li><a href="#">janderson.com</a></li> 
                <li>{resumeInput.address}</li> 
              </ul>
            </div>
            <div class="contact-presentation">
              
              <p><span class="bold">Lorem</span> ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod congue nisi, nec consequat quam. In consectetur faucibus turpis eget laoreet. Sed nec imperdiet purus. </p>
            </div>
            <div class="contact-social clearfix">
              <ul class="list-titles">
                <li>Twitter</li>
                <li>Dribbble</li>
                <li>Codepen</li>
              </ul>
              <ul class="list-content">
                
                <li><a href="">@janderson</a></li> 
                <li><a href="">janderson</a></li> 
                <li><a href="">janderson</a></li> 
              </ul>
            </div>
          </div>
        </section>

        <section class="experience section-padding">
          <div class="container">
            <h3 class="experience-title">Experience</h3>

            <div class="experience-wrapper">
              <div class="company-wrapper clearfix">
                <div class="experience-title">{resumeInput.workcompany}</div> 
                <div class="time">Nov 2012 - Present</div> 
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">{resumeInput.worktitle} </div> 
                <div class="company-description">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p> 
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Company name</div> 
                <div class="time">Nov 2010 - Present</div> 
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">Freelance, Web Designer / Web Developer</div> 
                <div class="company-description">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p> 
                </div>
              </div>

              <div class="company-wrapper clearfix">
                <div class="experience-title">Company name</div> 
                <div class="time">Nov 2009 - Nov 2010</div> 
              </div>

              <div class="job-wrapper clearfix">
                <div class="experience-title">Web Designer </div> 
                <div class="company-description">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p> 
                </div>
              </div>

            </div>
            

            <div class="section-wrapper clearfix">
              <h3 class="section-title">Skills</h3> 
              <ul>
                <li class="skill-percentage">HTML / HTML5</li>
                <li class="skill-percentage">CSS / CSS3 / SASS / LESS</li>
                <li class="skill-percentage">Javascript</li>
                <li class="skill-percentage">Jquery</li>
                <li class="skill-percentage">Wordpress</li>
                <li class="skill-percentage">Photoshop</li>

              </ul>

            </div>

            <div class="section-wrapper clearfix">
              <h3 class="section-title">Hobbies</h3> 
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p>
            </div>

          </div>
        </section>

        <div class="clearfix"></div>
      </div>
    </div>
  )
}

export default ShowResume