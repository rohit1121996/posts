import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDivide, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { Component } from "react";

class PostId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }
  async componentWillMount() {
    await fetch(
      `https://serverfake.herokuapp.com/posts${this.props.location.pathname}`
    )
      .then((res) => res.json())
      .then((psts) => {
        this.setState({ post: psts });
      });
  }
  render() {
    const setToggleUnfavorite = async (id) => {
      const newOnj = { ...this.state.post, isFavourite: false };
      this.setState({
        post: { ...newOnj },
      });
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOnj),
      };
      await fetch(
        `https://serverfake.herokuapp.com/posts/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
        });
    };
    const setTogglefavorite = async (id) => {
      const newOnj = { ...this.state.post, isFavourite: true };
      this.setState({
        post: { ...newOnj },
      });
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOnj),
      };
      await fetch(
        `https://serverfake.herokuapp.com/posts/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          //
        });
    };

    return (
      <div className="card-item">
        <div className="card">
          <h2 className="title">{this.state.post.title}</h2>
          <p>{this.state.post.body}</p>
          <span id="heart">
            {this.state.post.isFavourite ? (
              <FontAwesomeIcon
                icon={faHeart}
                className="heart-favorite"
                onClick={() => setToggleUnfavorite(this.state.post.id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className="heart-open"
                onClick={() => setTogglefavorite(this.state.post.id)}
              />
            )}
          </span>
          <span className="text">
            {this.state.post.isFavourite ? (
              <span className="favorite">Favoirte post</span>
            ) : (
              <span className="favorite">Click change favorite post</span>
            )}
          </span>
        </div>
      </div>
    );
  }
}
export default PostId;
