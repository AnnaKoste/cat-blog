import React from "react"
import { NavLink } from 'react-router-dom';

const BLOG_API = 'https://f.3337.tk/';

class TagsMenu extends React.Component{
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
        <ul className="menu-tags">
        {this.state.tags.map(item => (
          <li key={item.id}><NavLink to={`/tags/${item.id}`} className="menu-tags">{item.name}</NavLink></li>
        ))}
        </ul>
    </div>
  }
}

export default TagsMenu
