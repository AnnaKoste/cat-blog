import * as serviceWorker from './serviceWorker';

import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import About from './about.js'
import Footer from './footer.js'
import Tags from './tags.js'
import Recommended from './recommended.js'
import logo from './img/logo.png'
const BLOG_API = 'https://f.3337.tk/';

function getDate(date) {
  date = date.slice(0, -9);
  return date;
}

class PostsList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    };
  }
  componentWillMount () {
    return fetch(BLOG_API + '/wp-json/wp/v2/posts?_embed')
    .then((response) => response.json())
    .then(posts => {
      this.setState({
        posts: posts,
      });
    })
  }
  render() {
    return (
      <div className="left-blocks">
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

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null
    };
  }
  componentWillMount () {
    return fetch(BLOG_API + '/wp-json/wp/v2/posts/' + this.props.match.params.id+'?_embed').then((response) => response.json())
    .then(post => {
      this.setState({
        post: post,
      });
    })
  }
  render() {
    if (!this.state.post) return <div>Downloads...</div>
    return <div className="main-post">
        <div>
          <img className="main-post-img" src={this.state.post._embedded['wp:featuredmedia']['0'].source_url} alt={"money"}/>
        </div>
        <div>
          <h2 className="main-post-title">{this.state.post.title.rendered}</h2>
          <p className="main-post-small">{getDate(this.state.post.date)}</p>
          <div className="main-post-text" dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered}}></div>
          <Link to='/' className="main-post-back">Back</Link>
        </div>
      </div>
    }
}

const Main = () => (
  <main>
    <div className="left">
    <Switch>
      <Route exact path="/" component={PostsList} />
      <Route path="/post/:id" component={Post} />
      <Route path="/tags" component={Tags} />
      <Route path="/about" component={About} />
    </Switch>
    </div>
    <div className="right">
      <Recommended />
    </div>
  </main>
)

const Header = () => (
  <header>
    <nav className="top-menu">
      <Link to={'/'} className="logo"><img className="logo-img" src={logo} alt={"logo"}/></Link>
      <h1 className="header-text">Cat's Blog</h1>
      <ul className="menu">
        <li><NavLink to='/'>Posts</NavLink></li>
        <li><NavLink to='/tags'>Tags</NavLink></li>
        <li><NavLink to='/about'>About Blog</NavLink></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div className="page">
    <Header />
    <Main />
    <Footer />
  </div>
)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
