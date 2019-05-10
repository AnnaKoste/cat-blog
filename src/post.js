import React from "react"
import { Link } from 'react-router-dom';

const GetDate = (date) => date = date.slice(0, -9);
const BLOG_API = 'https://f.3337.tk/';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null
    };
  }
  fetchData(postId) {
    fetch(BLOG_API + '/wp-json/wp/v2/posts/' + postId+'?_embed')
    .then((response) => response.json())
    .then(post => {
      this.setState({
        post: post
      });
    })
  }
  componentWillMount () {
    let postId = this.props.match.params.id;
    this.fetchData(postId)
  }
  componentWillReceiveProps(nextProps) {
    let postId = nextProps.match.params.id;
    this.fetchData(postId)
  }
  render() {
    if (!this.state.post) return <div>Downloads...</div>
    return <div className="main-post">
        <div>
          <img className="main-post-img" src={this.state.post._embedded['wp:featuredmedia']['0'].source_url} alt={"money"}/>
        </div>
        <div>
          <h2 className="main-post-title">{this.state.post.title.rendered}</h2>
          <p className="main-post-small">{GetDate(this.state.post.date)}</p>
          <div className="main-post-text" dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered}}></div>
          <Link to='/' className="main-post-back">Back</Link>
        </div>
      </div>
    }
}

export default Post
