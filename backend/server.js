const Post = require("./models/Post");
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.json({
      message: "User Saved Successfully ✅",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});
app.post("/create-post", async (req, res) => {
  try {
    const { username, text, image } = req.body;

    const newPost = new Post({
      username,
      text,
      image,
    });

    await newPost.save();

    res.json({
      message: "Post Created Successfully ✅",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
app.post("/like", async (req, res) => {
  try {
    const { postId, username } = req.body;

    const post = await Post.findById(postId);

    if (!post.likes.includes(username)) {
      post.likes.push(username);
      await post.save();
    }

    res.json({
      message: "Post Liked ✅",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.delete("/delete-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post Deleted Successfully ✅",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/comment", async (req, res) => {
  try {
    const { postId, username, comment } = req.body;

    const post = await Post.findById(postId);

    post.comments.push({
      username,
      comment,
    });

    await post.save();

    res.json({
      message: "Comment Added ✅",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
 app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    res.json({
      message: "Login Successful ✅",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});