import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handlePost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-post",
        {
          username: localStorage.getItem("username"),
          text,
          image: "",
        }
      );

      alert(response.data.message);

      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">
        ✨ Create New Post
      </h2>

      <p className="text-center">
        Welcome, {localStorage.getItem("username")} 👋
      </p>

      <Card className="shadow p-4">
        <h2>Create Post ✨</h2>

        <Form.Control
          as="textarea"
          rows={4}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          className="mt-3"
          onClick={handlePost}
        >
          Post 🚀
        </Button>

        <Button
          variant="secondary"
          className="mt-2"
          onClick={() => navigate("/feed")}
        >
          View Feed 👀
        </Button>
      </Card>
    </Container>
  );
}

export default CreatePost;