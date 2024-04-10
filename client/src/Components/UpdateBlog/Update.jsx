import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip, InputBase, Button, TextareaAutosize } from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from "../../utils/baseUrl.js";

function Update() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        description: "",
        categories: "",
        picture: null,
        createdDate: new Date(),
    });

    useEffect(() => {
        const fetchData = async () => {
            const api = await axios.get(`${baseUrl}/getData/${id}`, {
                withCredentials: true,
            });
            const response = api.data;
            setPost(response);
            console.log("Posts", response);
        };
        fetchData();
    }, [id]);

    const handleChange = async () => {
        try {
            // const formData = new FormData();
            // formData.append("title", post.title);
            // formData.append("description", post.description);
            // formData.append("picture", post.picture);

            const response = await axios.put(
                `${baseUrl}/updateBlog/${id}`,
                {
                    title: post.title,
                    description: post.description
                },
                {
                    withCredentials: true
                }
            );
            const blog = response.data;
            console.log("new blog => ", blog);
            toast.success("Blog Updated Successfully");
            navigate(`/singleBlog/${id}`);
        } catch (error) {
            console.error("Error posting blog => ", error.message);
        }
    };

    const blogImage = post.picture
        ? require("../Assets/blog4.jpg")
        : post.picture;

    return (
        <div className=" mx-12 mt-1">
            <img
                style={{ width: "100%", height: "68vh", objectFit: "cover" }}
                // src={require("../Assets/blog4.jpg")}
                src={blogImage}
                alt="Blog img"
            />

            <div className="mt-4 flex">
                <label htmlFor="FileInput">
                    <Tooltip title="Add File" placement="bottom-start">
                        <AddCircleIcon style={{ marginTop: "10px" }} fontSize="medium" />
                    </Tooltip>
                </label>
                <input
                    type="file"
                    id="FileInput"
                    name="picture"
                    onChange={(e) =>
                        setPost({
                            ...post,
                            picture: e.target.files[0],
                        })
                    }
                    style={{ display: "none" }}
                />

                <InputBase
                    style={{ margin: "0 30px", fontSize: "25px", width: "88%" }}
                    placeholder="Title"
                    name="title"
                    value={post.title}
                    onChange={(e) =>
                        setPost({
                            ...post,
                            title: e.target.value,
                        })
                    }
                />

                <Button
                    variant="contained"
                    size="large"
                    endIcon={<SendSharpIcon />}
                    style={{ paddingLeft: "20px" }}
                    onClick={handleChange}
                >
                    Update
                </Button>
            </div>

            <TextareaAutosize
                minRows={6}
                name="description"
                placeholder="Tell me your story..."
                style={{
                    width: "100%",
                    marginTop: "50px",
                    fontSize: "18px",
                    border: "none",
                    outlineStyle: "none",
                }}
                value={post.description}
                onChange={(e) =>
                    setPost({
                        ...post,
                        description: e.target.value,
                    })
                }
            />
        </div>
    );
}

export default Update;
