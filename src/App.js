import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Card, Image, Icon } from "semantic-ui-react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserinput] = useState("");
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    html_url,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setUrl(html_url);
  };

  const handleSearch = (e) => {
    setUserinput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };

  return (
  <div className="container">
    <div className="navbar">
      Github Search
      <Icon
        name="github"
        size="big"
        onClick={() => window.location.reload()}
        style={{ cursor: "pointer", display: "block", margin: "0 auto" }}
      />
    </div>
    <div className="search">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Github username"
            name="github user"
            onChange={handleSearch}
          />
          <Form.Button content="Search" />
        </Form.Group>
      </Form>
    </div>
    {error ? (
      <h1>{error}</h1>
    ) : (
      <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{userName}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <img
                src="https://cdn0.iconfinder.com/data/icons/octicons/1024/repo-512.png"
                alt="GitHub Repo Icon"
              />
              {repos} Repos
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {following} Following
            </a>
          </Card.Content>
          <Card.Content extra>
            <a href={url} target="_blank">
              <Icon name="linkify" />
              {url}
            </a>
          </Card.Content>
        </Card>
      </div>
    )}
  </div>
  );
}

export default App;
