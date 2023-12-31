import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {

  const [log_email, setLogEmail] = useState('')
  const [log_password, setLogPassword] = useState('')

  const [justifyActive, setJustifyActive] = useState('tab1');
  const [f_name, setFirstName] = useState('')
  const [l_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_cnf, setCnfPassword] = useState('')
  const [tag1, setTag1] = useState('')
  const [tag2, setTag2] = useState('')
  const [tag3, setTag3] = useState('')
  const [tag4, setTag4] = useState('')
  const [tag5, setTag5] = useState('')



  // Validation functions
  const isFieldValid = (value) => value.trim() !== '';
  const isEmailValid = (value) => /\S+@\S+\.\S+/.test(value);
  const isPasswordValid = (value) => value.length >= 6;

  // Error states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  async function register() {

    // Initialize an array to collect error messages
    const errors: String[] = [];


    if (!isFieldValid(f_name)) {
      errors.push('Please enter the first name.');
    }
    if (!isFieldValid(l_name)) {
      errors.push('Please enter the last name.');
    }
    if (!isEmailValid(email)) {
      errors.push('Please enter a valid email address.');
    }
    if (!isPasswordValid(password)) {
      errors.push('Password must be at least 6 characters.');
    }
    if (!isFieldValid(tag1)) {
      errors.push('Please enter at least 1 skill.');
    }
    if (password !== password_cnf) {
      errors.push('Password and confirm password do not match.');
    }
    // If there are errors, display them all
    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      alert(errorMessage);
      return;
    }


    let register_obj = {
      "firstName": f_name,
      "lastName": l_name,
      "email": email,
      "password": password,
      "skills": [tag1, tag2, tag3, tag4, tag5]
    }

    localStorage.setItem('local_first_name', f_name);
    // let localFname= localStorage.getItem('local_first_name');   
    // console.log(localFname);

    localStorage.setItem('local_last_name', l_name);
    // let localLname= localStorage.getItem('local_last_name');   
    // console.log(localLname);

   // localStorage.setItem('local_reg_email', email);

   localStorage.setItem('local_login_email', email);

    localStorage.setItem('local_reg_user_id', '1');
    // localStorage.setItem('local_tags', JSON.stringify([tag1, tag2, tag3, tag4, tag5]));
    let skillsString = JSON.stringify(register_obj.skills);
    localStorage.setItem("local_user_skills", skillsString);

    try {
      const response = await axios.post(localStorage.getItem('apiServerURL') + "api/user", register_obj);
      localStorage.setItem('local_login_token', response.data.token);
      await getProfileDetails()
      alert("Registration successfully done.");
      console.log(response)
      navigate('/home');
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("Registration failed. Please try again." + error.message);
    }
  }

  async function getProfileDetails(){
    let localToken = (String)(localStorage.getItem('local_login_token'));
    const profileResponse = await axios.get(localStorage.getItem('apiServerURL') + "api/user/fetchProfile/1", {
      headers: {
        'x-auth-token': localToken,
        'Content-Type': 'application/json'
      },
    });
    localStorage.setItem('local_login_email', profileResponse.data.user.email);
    localStorage.setItem('local_first_name', profileResponse.data.user.firstName);
    localStorage.setItem('local_last_name', profileResponse.data.user.lastName);
    localStorage.setItem('local_loggedin_userid', profileResponse.data.user._id);
    localStorage.setItem("local_user_skills", profileResponse.data.user.skills);
  }

  async function login() {

    const errors: String[] = [];

    if (!isEmailValid(log_email)) {
      errors.push('Please enter a valid email address.');
    }
    if (!isPasswordValid(log_password)) {
      errors.push('Password must be at least 6 characters.');
    }

    // If there are errors, display them all
    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      alert(errorMessage);
      return;
    }

    let login_cred = {
      "email": log_email,
      "password": log_password,
    }

    try {
      const loginResponse = await axios.post(localStorage.getItem('apiServerURL') + "api/login", login_cred);
      console.log(loginResponse.data)
      localStorage.setItem('local_login_token', loginResponse.data.token);
      console.log(loginResponse.data.token)
      
      //fetch logged in profile details
      await getProfileDetails()
      alert("Successfully logged in");
      navigate("/home");
    } catch (error) {
      console.error("Error during Login:", error.message);
      alert("Login failed. Please try again" + error.message);
    }
  }


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('continueAsGuest', 'true');
    localStorage.setItem('local_first_name', 'Guest');
    // alert('Continuing as Guest');
    window.location.replace('http://localhost:3000/home');
  };




  return (
    // <MDBContainer >

    <div className='' style={{}}>
      <div style={{ backgroundColor: '#F5F5F5', height: '100%', width: '50%', position: 'fixed', left: '0', padding: '5% 3% 0vh 3%' }}>
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>

            <MDBTabsLink
              onClick={() => handleJustifyClick('tab1')}
              active={justifyActive === 'tab1'}
              style={{
                backgroundColor: justifyActive === 'tab1' ? '#710808' : '#FFFFFF',
                color: justifyActive === 'tab1' ? 'white' : '#710808',
              }}
            >
              LOGIN
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick('tab2')}
              active={justifyActive === 'tab2'}
              style={{
                backgroundColor: justifyActive === 'tab2' ? '#710808' : '#FFFFFF',
                color: justifyActive === 'tab2' ? 'white' : '#710808',
              }}
            >
              REGISTER
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>

            <MDBInput wrapperClass='mb-4' value={log_email} onChange={(e) => setLogEmail(e.target.value)} placeholder='Email address' type='email' style={{ backgroundColor: '#D9D9D9' }} />
            <MDBInput wrapperClass='mb-4' value={log_password} onChange={(e) => setLogPassword(e.target.value)} placeholder='Password' id='form2' type='password' style={{ backgroundColor: '#D9D9D9' }} />

            <button className="w-100 btn btn-primary" onClick={login} style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN IN</button>
            <button className="text-left" onClick={handleContinueAsGuest} style={{ border: 'none', padding: 0, background: 'none' }}><a href="/home" style={{ color: '#710808' }} >Continue as Guest</a></button>

          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === 'tab2'}>
            {/* <form> */}
            <div style={{ height: '53vh', overflow: 'auto' }}>
              <MDBInput wrapperClass='mb-4' value={f_name} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' type='text' style={{ backgroundColor: '#D9D9D9' }} />
              {/* {firstNameError && <p className="error-message">{firstNameError}</p>} */}
              <MDBInput wrapperClass='mb-4' value={l_name} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' type='text' style={{ backgroundColor: '#D9D9D9' }} />

              <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' style={{ backgroundColor: '#D9D9D9' }} />

              <MDBInput wrapperClass='mb-4' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type='password' style={{ backgroundColor: '#D9D9D9' }} />

              <MDBInput wrapperClass='mb-4' value={password_cnf} onChange={(e) => setCnfPassword(e.target.value)} placeholder='Confirm Password' type='password' style={{ backgroundColor: '#D9D9D9' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' value={tag1} onChange={(e) => setTag1(e.target.value)} type='text' placeholder='Tag 1' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' value={tag2} onChange={(e) => setTag2(e.target.value)} placeholder='Tag 2' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' value={tag3} onChange={(e) => setTag3(e.target.value)} placeholder='Tag 3' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' value={tag4} onChange={(e) => setTag4(e.target.value)} placeholder='Tag 4' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <MDBInput wrapperClass='mb-4' value={tag5} onChange={(e) => setTag5(e.target.value)} placeholder='Tag 5' type='text' style={{ backgroundColor: '#D9D9D9' }} />
              </div>
            </div>

            <button className="w-100 btn btn-primary" onClick={register} style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</button>
            {/* </form> */}

          </MDBTabsPane>
        </MDBTabsContent>

      </div >
      <div style={{ height: '100%', width: '50%', position: 'fixed', right: '0' }}>
        <div style={{ background: '#710808', height: '100vh' }}>
          <div style={{ textAlign: 'center', color: 'white', padding: '35% 5% 0% 5%' }}>
            <div style={{ display: 'inline-flex' }}>
              <i className="fa-solid fa-user-pen fa-3x"></i>
              <h1><em>REVIEW ME</em></h1>
            </div>
            <p>Welcome to Review Me, your go-to platform for peer reviews of posts and content. Our community of writers, researchers, and creators is dedicated to providing valuable feedback to help you improve your work. Simply submit your content, and our diverse group of expert reviewers will offer constructive insights to elevate your creations. Join us today, collaborate, and enhance your skills as you grow with Review Me.</p>
          </div>
        </div>
      </div>
    </div >
    // </MDBContainer>

  );
}

export default Login;