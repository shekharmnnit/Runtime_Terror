import React from 'react';
import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import { Link } from "react-router-dom";


function AppFooter() {
    return (
        <footer className="container footer-style">
            <div className="centered-section">
                <section className="links">
                    <Link to="/" className="no-underline"><i className="fa fa-copyright"></i>&nbsp;2023 All Rights Reserved</Link>
                </section>
            </div>

        </footer>
    )
}
export default AppFooter;
