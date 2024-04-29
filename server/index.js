const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 4000;
const app = express();
const connect = require("./DbConfig/DbConfig");
const User = require("./Models/model");
const bcryptjs = require("bcryptjs");
const Blog = require("./Models/blogModel");
const path = require("path");
const jwt = require("jsonwebtoken");
// const authenticateToken = require("./middlewares/authToken");
const coookieParser = require("cookie-parser");
const commentsSchema = require("./Models/comments");
const upload = require("./middlewares/multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

require("dotenv").config();

app.use(coookieParser());

app.use(
    cors({
        // origin: "http://localhost:3000",
        origin: "https://blog-app-mu-vert.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use(express.json({ limit: "40mb" }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));
// app.use("/Uploads", express.static(path.join(__dirname, "/Uploads")));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
    res.json("Hello World");
});

app.get("/getData", async (req, res) => {
    try {
        const blog = await Blog.find();
        // console.log("Blog Data => ", blog);
        res.send(blog);
    } catch (error) {
        console.error("Err at getting Data => ", error.message);
    }
});

app.get("/getMyBlogs/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const blog = await Blog.find({ username });
        if (!blog) {
            return res.status(404).json({
                message: "No blog found",
                success: false,
            });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/getData/:id", async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID parameter from the request
        const blog = await Blog.findById(id); // Find the blog post by its ID
        // console.log("Blog Data => ", blog);
        res.send(blog);
    } catch (error) {
        console.error("Error fetching blog data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/getData/:id", async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID parameter from the request
        const blog = await Blog.findById(id); // Find the blog post by its ID
        // console.log("Blog Data => ", blog);
        res.send(blog);
    } catch (error) {
        console.error("Error fetching blog data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/loginData", async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log("Username => ", username);

        const user = await User.findOne({ username });
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!user || !validPassword) {
            res.status(404).json({
                message: "User Doesn't Exists",
                success: false,
            })

        }

        const tokenData = {
            id: user._id,
            username: user.username,
        };

        const tokenSecret = process.env.tokenSecret;
        const token = await jwt.sign(tokenData, tokenSecret, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.status(200).json({
            message: "Login Successfull",
            success: true,
            token,
        });
    } catch (error) {
        console.error("Err at login Route => ", error.message);
    }
});

app.get("/logout", async (req, res) => {
    try {
        // res.clearCookie('token',expiresIn = Date.now(0));
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
        });
        res.status(200).json({
            message: "Logout Successfull",
            success: true,
        });
    } catch (error) {
        console.log("Err at logout route => ", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
});

app.post("/signUpData", async (req, res) => {
    const { username, email, password } = await req.body;
    try {
        console.log("Username is : ", username);
        console.log("Password is : ", password);
        console.log("Email : ", email);

        const findUser = await User.findOne({ email });

        if (findUser) {
            res
                .json({
                    success: false,
                    message: "User already Exists",
                })
                .status(500);
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res
            .json({
                success: true,
                message: "Submitted Successfully !!",
                newUser,
            })
            .status(200);
    } catch (error) {
        console.error("Err at signup route => ", error.message);
    }
});

app.post("/blogData", upload, async (req, res) => {
    try {
        const { title, description, categories } = req.body;
        const picture = req.file;

        if (!picture) {
            return res.status(400).json({ error: "No picture uploaded" });
        }

        const result = await cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "auto",
                },
                async (error, result) => {
                    if (error) {
                        console.error("Error uploading image to Cloudinary:", error);
                        return res.status(500).json({
                            error: "Failed to upload image to Cloudinary",
                            success: false,
                        });
                    }

                    const cloudinaryUrl = result.url;

                    const decodedToken = jwt.verify(req.cookies.token, "Shhh");
                    const { username } = decodedToken;

                    const createdDate = new Date();

                    const newBlog = new Blog({
                        title,
                        username,
                        description,
                        picture: cloudinaryUrl,
                        categories,
                        createdDate,
                    });

                    await newBlog.save();

                    res.status(200).json({
                        message: "Blog Added Successfully",
                        title,
                        description,
                        picture: cloudinaryUrl,
                        createdDate,
                        username,
                    });
                }
            )
            .end(picture.buffer);
    } catch (error) {
        console.error("Error at blogData route => ", error);
        res.status(500).json({
            error: error.message,
            success: false,
        });
    }
});

app.post("/comments", async (req, res) => {
    const { name, postId, comments, date } = await req.body;
    try {
        const newComment = new commentsSchema({
            name,
            postId,
            comments,
            date,
        });

        await newComment.save();

        res.status(200).json({
            success: true,
            message: "Comment Saved Successfully",
        });
    } catch (error) {
        console.error("Err at comment route => ", error.message);
    }
});

app.get("/getComments/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const data = await commentsSchema.find({ postId });
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("err getting posts from db => ", error.message);
    }
});

app.delete("/deleteComment/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedComment = await commentsSchema.findByIdAndDelete(id);
        return res.json({
            success: true,
            message: "ID Deleted",
        });
    } catch (error) {
        console.error("err deleting comment => ", error.message);
    }
});

app.put("/updateBlog/:id", async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        const { title, description } = req.body;

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "No post found",
            });
        }

        const updatedPost = { title, description };
        const result = await Blog.findByIdAndUpdate(req.params.id, {
            $set: updatedPost,
        });
        return res.status(200).json({
            success: true,
            message: "Blog updated",
        });
    } catch (error) {
        console.error("Err updating post => ", error.message);
    }
});

app.delete("/deleteBlog/:id", async (req, res) => {
    try {
        const deletedPost = await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Blog Deleted Successfully",
        });
    } catch (error) {
        console.error("Err at delete route => ", error.message);
    }
});

connect();
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
