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

  async function register() {
    let obj = [{
      "first_name": f_name,
      "last_name": l_name,
      "email": email,
      "password": password,
      "password_cnf": password_cnf,
      "tags": [tag1, tag2, tag3, tag4, tag5]
    }]

    localStorage.setItem('local_first_name', f_name);
    // let localFname= localStorage.getItem('local_first_name');   
    // console.log(localFname);

    localStorage.setItem('local_last_name', l_name);
   

    localStorage.setItem('local_reg_email', email);
   
    alert("Registration successfully done.");
    window.location.replace("http://localhost:3000/home");
    console.warn(obj)
    // let result = fetch("http://localhost:8000/api/regsiter", {
    //   method:'POST',
    //   body:JSON.stringify(obj),
    //   headers: {
    //     "Content-type":'application/json',
    //     "Accept": 'application/json'
    //   }
    // })
    // result = (await result).json()
    // console.warn("registeration result", result)
  }

  async function login() {
    let obj = [{
      "login_email": log_email,
      "login_password": log_password,
    }]

    localStorage.setItem('Local_login_email', log_email);
    // let localUserEmail= localStorage.getItem('Local_login_email');   
    // console.log(localUserEmail);
    alert("Successfully loged in.");
    window.location.replace("http://localhost:3000/home");
  }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    // <MDBContainer >
      <div className='' style={{  }}>
        <div  style={{ backgroundColor: '#F5F5F5',height:'100%', width:'50%', position: 'fixed', left: '0',padding:'5% 3% 0vh 3%' }}>
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
              <p className="text-left"><a href="#!" style={{ color: '#710808' }}>Continue as Guest</a></p>

            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>


              <div style={{ height: '53vh', overflow: 'auto' }}>
              <MDBInput wrapperClass='mb-4' value={f_name} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' type='text' style={{ backgroundColor: '#D9D9D9' }} />
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

              {/* <MDBBtn className="mb-4 w-100"  style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</MDBBtn> */}
              <button className="w-100 btn btn-primary" onClick={register} style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</button>
            </MDBTabsPane>
          </MDBTabsContent>

        </div >
        <div  style={{height:'100%', width:'50%', position: 'fixed', right: '0' }}>
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
      </div>
    // </MDBContainer>

  );
}

export default Login;