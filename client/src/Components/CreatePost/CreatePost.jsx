import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip, InputBase, Button, TextareaAutosize, Select, MenuItem } from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from '../../utils/baseUrl'
import { categories } from '../Constants/data.js'

function CreatePost() {

  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    // username: "",
    categories: "",
    picture: null,
    createdDate: new Date(),
  });


  const handleChange = async (e) => {
    try {
      const formData = new FormData();
      formData.append("picture", post.picture);
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("categories", post.categories);


      const response = await axios.post(
        `${baseUrl}/blogData`,
        formData,
        {
          withCredentials: true,
        }
      );
      const blog = response.data;
      console.log("new blog => ", blog);
      toast.success("Blog Published Successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error posting blog => ", error.message);
    }
  };

  const blogImage = require("../Assets/blog4.jpg");

  return (
    <div className=" mx-12 mt-16">
      <img
        // style={{ width: "100%", height: "68vh", objectFit: "cover" }}
        className="sm:w-full max-h-[55vh] object-cover"
        // src={require("../Assets/blog4.jpg")}
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



      <div className="mt-8 p-2 flex sm:flex-row flex-col sm:gap-6 gap-5 items-center justify-center">
        <label htmlFor="FileInput">
          <Tooltip title="Add File" placement="bottom-start">
            <AddCircleIcon style={{ marginTop: "10px" }} fontSize="medium" />
          </Tooltip>
        </label>

        <InputBase
          style={{ fontSize: "20px", }}
          className="ring-offset-2 ring-1 focus-within:ring-zinc-800 focus:ring-4 ring-gray-300  sm:w-[50%] w-full rounded    p-2 "
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
          Publish
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

export default CreatePost;
