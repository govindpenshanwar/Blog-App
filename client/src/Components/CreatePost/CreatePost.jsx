import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip, InputBase, Button, TextareaAutosize } from "@mui/material";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import baseUrl from '../../utils/baseUrl'


function CreatePost() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    // username: "",
    categories: category,
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
    <div className=" mx-12 mt-1">
      <img
        style={{ width: "100%", height: "68vh", objectFit: "cover" }}
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

      <div className="mt-4 flex">
        <label htmlFor="FileInput">
          <Tooltip title="Add File" placement="bottom-start">
            <AddCircleIcon style={{ marginTop: "10px" }} fontSize="medium" />
          </Tooltip>
        </label>

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
