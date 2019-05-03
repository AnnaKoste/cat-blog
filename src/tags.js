import React from "react"
import { NavLink } from 'react-router-dom';
const BLOG_API = 'https://f.3337.tk/';

class Tags extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      tags: []
    };
  }
  componentWillMount () {
    return fetch(BLOG_API + '/wp-json/wp/v2/tags').then((response) => response.json())
    .then(tags => {
      this.setState({
        tags: tags,
      });
    })
  }
  render() {
    return <div>
      <h2>CATegories</h2>
        <ul>
        {this.state.tags.map(item => (
          <li><NavLink to="/">{item.name}</NavLink></li>
        ))}
        </ul>
    </div>
  }
}

export default Tags
