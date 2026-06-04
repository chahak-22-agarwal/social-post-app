import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        padding: "15px",
        background: "#0d6efd",
      }}
    >
      <Link
        to="/feed"
        style={{
          color: "white",
          marginRight: "20px",
        }}
      >
        Feed
      </Link>

      <Link
        to="/create-post"
        style={{
          color: "white",
        }}
      >
        Create Post
      </Link>
    </div>
  );
}

export default Navbar;