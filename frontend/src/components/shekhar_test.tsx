import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import '../assets/css/shekhar.css';


function Shekhar_test() {
    const [justifyActive, setJustifyActive] = useState('tab1');
    

  async function postRequest() {
  }

    return (
        <div>
                <form className="responsive-form">
                <input type="text" id="fname" name="fname" placeholder="First name" required />
                <input  type="text" id="fname" name="fname" value="John"/>
                <input type="text" id="lname" name="lname" value="Doe"/>
                <input type="text" id="age" name="age" value="age"/>
                <input type="text" id="address" name="address" value="address"/>
                <input type="submit" value="Submit"/>
            
        </form>
        </div>

    )
};
export default Shekhar_test;