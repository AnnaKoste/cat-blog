import React from "react"
import { NavLink } from 'react-router-dom';
const BLOG_API = 'https://f.3337.tk/';

function getDate(date) {
  date = date.slice(0, -9);
  return date;
}

class Tags extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    };
  }
  componentWillMount () {
    return fetch(BLOG_API + '/wp-json/wp/v2/posts?_embed&tags=' + this.props.match.params.id)
    .then((response) => response.json())
    .then(posts => {
      this.setState({
        posts: posts,
      });
    })
  }
  render() {
    return (
      <div>
        {this.state.posts.map(item => (
           <div key={item.id}>
             <NavLink className="post-link" to={`/post/${item.id}`}>
             <div className="post">
               <div className="post-img">
                 <img src={item._embedded['wp:featuredmedia']['0'].source_url} alt={"money"}/>
               </div>
               <div className="post-data">
                 <h3 className="post-title">{item.title.rendered}</h3>
                 <p className="post-small">{getDate(item.date)}</p>
                 <div className="post-description" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered}}></div>
                 <p className="post-small">(Read more)</p>
               </div>
             </div>
             </NavLink>
          </div>
      ))}
      </div>
    )
  }
}

export default Tags
