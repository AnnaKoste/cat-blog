import React from "react";
import { Link } from 'react-router-dom';

class Contacts extends React.Component{
    render(){
      return <div className="about">
               <h2>Contacts:</h2>
               <p>Please reach out to <Link className='post-link' to="mailto:kostechuk.anna@gmail.com">kostechuk.anna@gmail.com</Link> or <Link className='post-link' to="www.linkedin.com/in/anna-kostechuk" target="_blank">linkedin</Link>.</p>
             </div>
    }
}

export default Contacts
