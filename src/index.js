import * as serviceWorker from './serviceWorker';

import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import About from './about.js'
import Contacts from './contacts.js'
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
          <p className="main-post-small">{getDate(this.state.post.date)}</p>
          <div className="main-post-text" dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered}}></div>
          <Link to='/' className="main-post-back">Back</Link>
        </div>
      </div>
    }
}

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

const Main = () => (
  <main>
    <div className="">
    <Switch>
      <Route exact path="/" component={PostsList} />
      <Route path="/post/:id" component={Post} />
      <Route path="/tags/:id" component={Tags} />
      <Route path="/about" component={About} />
      <Route path="/contacts" component={Contacts} />
    </Switch>
    </div>
  </main>
)

class Header extends React.Component{
  constructor() {
		super();
		this.state = {
			shown: true,
		};
	}

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}
  render() {
    if (document.body.clientWidth < 600) {
  		var shown = {
  			display: this.state.shown ? "block" : "none"
  		};

  		var hidden = {
  			display: this.state.shown ? "none" : "block"
  		}
    }

    return (
      <header >
        <label className="showmenu" onClick={this.toggle.bind(this)} style={ hidden }>&#9776;</label>
        <nav className="top-menu" style={ shown } onClick={this.toggle.bind(this)} >
          <h1 className="header-text">Cat's Blog</h1>
          <Link to={'/'} className="logo"><img className="logo-img" src={logo} alt={"logo"}/></Link>
          <ul className="menu">
            <li className="menu-item"><NavLink to='/' className="menu-link">Posts</NavLink></li>
            <li className="menu-item"><NavLink to='/about' className="menu-link">About Blog</NavLink></li>
            <li className="menu-item"><NavLink to='/contacts' className="menu-link">Contacts</NavLink></li>
            <li className="menu-item menu-link"><Recommended /></li>
            <li className="menu-item menu-link menu-tag">Tags:
              <TagsMenu />
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

const App = () => (
  <div className="page">
    <Header />
    <Main />
  </div>
)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
