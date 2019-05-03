import React from "react"
import { NavLink } from 'react-router-dom';
const BLOG_API = 'https://f.3337.tk/';

class Recommended extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    };
  }
  componentWillMount () {
    return fetch(BLOG_API + '/wp-json/wp/v2/posts?categories=11')
    .then((response) => response.json())
    .then(posts => {
      this.setState({
        posts: posts,
      });
    })
  }
  render() {
    return (
      <div className="recommended">
      <p className="recommended-top">Recommended posts:</p>
        {this.state.posts.map(item => (
           <div className="recommended-block" key={item.id}>
             <NavLink className="post-link" to={`/post/${item.id}`}>
               <h3 className="recommended-text">{item.title.rendered}</h3>
               <div className="recommended-text" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered}}></div>
             </NavLink>
          </div>
      ))}
      </div>
    )
  }
}

export default Recommended
