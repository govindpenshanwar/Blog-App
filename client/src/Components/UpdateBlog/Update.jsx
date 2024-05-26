import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip, InputBase, Button, TextareaAutosize, Select, MenuItem } from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from "../../utils/baseUrl.js";
import { categories } from "../Constants/data.js";

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
        <div
            className=" mx-12 mt-16"
        // className=" mx-12 mt-1"
        >
            <img
                // style={{ width: "100%", height: "68vh", objectFit: "cover" }}
                // src={require("../Assets/blog4.jpg")}
                className="sm:w-full max-h-[55vh] object-cover"
                src={blogImage}
                alt="Blog img"
            />
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

            <div
                className="mt-8 p-2 flex sm:flex-row flex-col sm:gap-6 gap-5 items-center justify-center"
            // className="mt-4 flex"
            >
                <label htmlFor="FileInput">
                    <Tooltip title="Add File" placement="bottom-start">
                        <AddCircleIcon style={{ marginTop: "10px" }} fontSize="medium" />
                    </Tooltip>
                </label>


                <InputBase
                    style={{ fontSize: "20px", }}
                    placeholder="Title"
                    className="ring-offset-2 ring-1 focus-within:ring-zinc-800 focus:ring-4 ring-gray-300  sm:w-[50%] w-full rounded    p-2 "
                    name="title"
                    value={post.title}
                    onChange={(e) =>
                        setPost({
                            ...post,
                            title: e.target.value,
                        })
                    }
                />

                <Select
                    value={post.categories}
                    displayEmpty
                    onChange={(e) => {
                        setPost({ ...post, categories: e.target.value })
                        console.log(e.target.value)
                    }}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Select a Category</em>;
                        }
                        return selected;
                    }}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.type}>
                            {category.type}
                        </MenuItem>
                    ))}
                </Select>

                <Button
                    variant="contained"
                    size="large"
                    endIcon={<SendSharpIcon />}
                    style={{ paddingLeft: "20px", marginLeft: "10px" }}
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
                className="text-justify mb-8"
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
