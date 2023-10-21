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

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className='container'>
      <div className='row' style={{ backgroundColor: '#F5F5F5' }}>
        <div className="col-md-6 my-5" >
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
              <MDBInput wrapperClass='mb-4' placeholder='Email address' type='email' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password' style={{ backgroundColor: '#D9D9D9' }} />

              <button className="w-100 btn btn-primary" style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN IN</button>
              <p className="text-left"><a href="#!" style={{ color: '#710808' }}>Continue as Guest</a></p>

            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>



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

              {/* <MDBBtn className="mb-4 w-100"  style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</MDBBtn> */}
              <button className="w-100 btn btn-primary" onClick={register} style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</button>
            </MDBTabsPane>
          </MDBTabsContent>

        </div >
        <div className="col-md-6">
          <div style={{ background: '#710808', height: '100vh' }}>
            <div style={{ textAlign: 'center', color: 'white', padding: '35% 5% 0% 5%' }}>
              <h1 >REVIEW ME</h1>
              <p>Welcome to Review Me, your go-to platform for peer reviews of posts and content. Our community of writers, researchers, and creators is dedicated to providing valuable feedback to help you improve your work. Simply submit your content, and our diverse group of expert reviewers will offer constructive insights to elevate your creations. Join us today, collaborate, and enhance your skills as you grow with Review Me.</p>
            </div>
          </div>
        </div>
      </div>
    </MDBContainer>

  );
}

export default Login;