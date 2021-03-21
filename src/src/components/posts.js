import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { Switch, Route } from "react-router";
import PostId from "./PostId";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 1,
    };
  }
  componentWillMount() {
    fetch(`https://serverfake.herokuapp.com/posts/?_page=${this.state.page}`)
      .then((res) => res.json())
      .then((psts) => {
        this.setState({ posts: psts });
      });
  }
  render() {
    const goToIdPage = (id) => {
      <Switch>
        <Route
          exact
          activeClassName="active"
          path={`/${id}`}
          component={PostId}
        ></Route>
      </Switch>;
    };
    const fetchPosts = (page) => {
      console.log(page);
      fetch(`https://serverfake.herokuapp.com/posts/?_page=${page}`)
        .then((res) => res.json())
        .then((psts) => {
          const ids = this.state.posts
            .map((ele) => ele.id)
            .sort((a, b) => a.id - b.id);
          const pstsId = psts.map((ele) => ele.id).sort((a, b) => a.id - b.id);
          if (!JSON.stringify(ids).includes(JSON.stringify(pstsId))) {
            const posts = [...this.state.posts, ...psts];
            this.setState({ posts: posts });
          } else {
            //
          }
        });
    };
    const seeMorePost = () => {
      this.setState({ page: this.state.page + 1 });
      fetchPosts(this.state.page + 1);
    };
    const setToggleUnfavorite = (id) => {
      const index = this.state.posts.findIndex((ele) => ele.id === id);
      const newOnj = { ...this.state.posts[index], isFavourite: false };
      const filterItem = this.state.posts.filter((ele) => ele.id !== id);
      const newSet = [...filterItem, newOnj].sort((a, b) => {
        return a.id - b.id;
      });
      this.setState({
        posts: [...newSet],
      });
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOnj),
      };
      fetch(`https://serverfake.herokuapp.com/posts/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
        });
    };
    const setTogglefavorite = (id) => {
      const index = this.state.posts.findIndex((ele) => ele.id === id);
      const newOnj = { ...this.state.posts[index], isFavourite: true };
      const filterItem = this.state.posts.filter((ele) => ele.id !== id);
      const newSet = [...filterItem, newOnj].sort((a, b) => {
        return a.id - b.id;
      });
      this.setState({
        posts: [...newSet],
      });
      console.log(this.state.posts[index]);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOnj),
      };
      fetch(`https://serverfake.herokuapp.com/posts/${id}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //
        });
    };
    const postItem = this.state.posts.map((post) => (
      <div className="card" key={post.id}>
        <h2 className="title" onClick={() => goToIdPage(post.id)}>
          {post.title}
        </h2>
        <p>{post.body}</p>
        <span id="heart">
          {post.isFavourite ? (
            <FontAwesomeIcon
              icon={faHeart}
              className="heart-favorite"
              onClick={() => setToggleUnfavorite(post.id)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faHeart}
              className="heart-open"
              onClick={() => setTogglefavorite(post.id)}
            />
          )}
        </span>
        <span className="text">
          {post.isFavourite ? (
            <span className="favorite">Favoirte post</span>
          ) : (
            <span className="favorite">Click change favorite post</span>
          )}
        </span>
      </div>
    ));
    return (
      <div className="posts">
        {postItem}
        {this.state.posts && this.state.posts.length ? (
          <div className="button-see-more">
            <button onClick={seeMorePost}>see more</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
export default Posts;
