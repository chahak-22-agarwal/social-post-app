import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login Page</h1>

      <input type="email" placeholder="Email" />
      <br />
      <br />

      <input type="password" placeholder="Password" />
      <br />
      <br />

      <button>Login</button>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;