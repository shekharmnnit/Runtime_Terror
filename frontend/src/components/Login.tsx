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

  const [justifyActive, setJustifyActive] = useState('tab1');;

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
              <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password' style={{ backgroundColor: '#D9D9D9' }} />

              <button className="w-100 btn btn-primary"  style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN IN</button>
              <p className="text-left"><a href="#!" style={{ color: '#710808' }}>Continue as Guest</a></p>

            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>



              <MDBInput wrapperClass='mb-4' placeholder='First Name' id='form1' type='text' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Last Name' id='form1' type='text' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password' style={{ backgroundColor: '#D9D9D9' }} />
              <MDBInput wrapperClass='mb-4' placeholder='Confirm Password' id='form1' type='password' style={{ backgroundColor: '#D9D9D9' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' id='form1' type='text' placeholder='Tag 1' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' placeholder='Tag 2' id='form2' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' placeholder='Tag 3' id='form3' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <MDBInput wrapperClass='mb-4' placeholder='Tag 4' id='form4' type='text' style={{ backgroundColor: '#D9D9D9' }} />
                </div>
                <MDBInput wrapperClass='mb-4' placeholder='Tag 5' id='form5' type='text' style={{ backgroundColor: '#D9D9D9' }} />
              </div>

              {/* <MDBBtn className="mb-4 w-100"  style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</MDBBtn> */}
              <button className="w-100 btn btn-primary"  style={{ backgroundColor: '#710808', borderColor: '#710808' }}>SIGN UP</button>
            </MDBTabsPane>
          </MDBTabsContent>

        </div >
        <div className="col-md-6">
          <div style={{ background: 'lightcoral', height: '100vh' }}>
            Right Half
          </div>
        </div>
      </div>
    </MDBContainer>

  );
}

export default Login;