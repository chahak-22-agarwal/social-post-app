import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          username,
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed ❌"
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
          width: "450px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">
          Create Account 🚀
        </h2>

        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

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
          variant="success"
          className="w-100"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </Card>
    </Container>
  );
}

export default Signup;