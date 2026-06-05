import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";

function Feed() {
  const [posts, setPosts] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/posts"
      );

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">
        🌍 Social Feed
      </h1>

      {posts.map((post) => (
        <Card key={post._id} className="mb-3 shadow">
          <Card.Body>
            <Card.Title>
              👤 {post.username}
            </Card.Title>

            <Card.Text>
              {post.text}
            </Card.Text>
{post.image && (
  <img
    src={post.image}
    alt="Post"
    style={{
      width: "100%",
      maxHeight: "400px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px",
    }}
  />
)}
            <p>❤️ Likes: {post.likes.length}</p>

            <Button
              variant="danger"
              onClick={async () => {
                await axios.post(
  "http://localhost:5000/like",
  {
    postId: post._id,
    username: localStorage.getItem("username"),
  }
);

                fetchPosts();
              }}
            >
              Like ❤️
            </Button>
{post.username === localStorage.getItem("username") && (
  <Button
    variant="danger"
    className="ms-2"
    onClick={async () => {
      await axios.delete(
        `http://localhost:5000/delete-post/${post._id}`
      );

      fetchPosts();
    }}
  >
    Delete 🗑️
  </Button>
)}
            <hr />

            <Form.Control
              type="text"
              placeholder="Write a comment..."
              onBlur={async (e) => {
                if (!e.target.value) return;

              await axios.post(
  "http://localhost:5000/comment",
  {
    postId: post._id,
    username: localStorage.getItem("username"),
    comment: e.target.value,
  }
);

                fetchPosts();
              }}
            />

            <p className="mt-3">
              💬 Comments: {post.comments.length}
            </p>

            {post.comments.map((c, index) => (
              <Card
                key={index}
                className="mb-2 p-2 bg-light"
              >
                <b>{c.username}</b>: {c.comment}
              </Card>
            ))}
          </Card.Body>
        </Card>
      ))}

      <Button
  variant="dark"
  onClick={() => {
    localStorage.clear();
    navigate("/login");
  }}
>
  Logout 🚪
</Button>

    </Container>
  );
}

export default Feed;