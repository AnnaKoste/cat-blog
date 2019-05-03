import React from "react";
import { Link } from 'react-router-dom';
import fb from './img/fb.png';
import instagram from './img/instagram.png';
import telegram from './img/telegram.png';

class About extends React.Component{
    render(){
        return (
          <footer>
            <Link to="/" ><img className="social-media" src={fb} alt="facebook"/></Link>
            <Link to="/" ><img className="social-media" src={instagram} alt="instagram"/></Link>
            <Link to="/" ><img className="social-media" src={telegram} alt="telegram"/></Link>
            <p className="footer-text">©2019 All rights reserved. Icons from <Link to="icon-icons.com" className="footer-text">icon-icons.com</Link></p>
          </footer>
        );
    }
}

export default About
