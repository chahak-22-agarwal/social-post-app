import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

     localStorage.setItem(
  "username",
  response.data.user.username
);

      navigate("/create-post");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed ❌"
      );
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">
          Welcome Back 👋
        </h2>

        <Form.Control
          className="mb-3"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          variant="primary"
          className="w-100"
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </Card>
    </Container>
  );
}

export default Login;