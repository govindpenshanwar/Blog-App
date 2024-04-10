import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments/Comments";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import getAuthToken from "../../utils/authToken";
import toast from "react-hot-toast";
import baseUrl from '../../utils/baseUrl'

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const username = getAuthToken();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getData/${id}`, { withCredentials: true });
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (BlogId) => {
    try {
      const api = await axios.delete(
        `${baseUrl}/deleteBlog/${BlogId} `, { withCredentials: true }
      );
      console.log("Deleted Blog => ", api.data);
      toast.success("Blog Deleted Successfully");
      navigate("/home");
    } catch (error) {
      console.error("Err deleting blog => ", error.message);
    }
  };

  return (
    <>
      <div className="container m-5 mt-20 w-full sm:ml-16  flex flex-col sm:px-2 px-5  ">
        <div className="flex items-center justify-center  ">
          <img
            className="w-[30rem] "
            src={blog.picture}
            alt="Blog"
          />
        </div>
        <div className="flex  ml-0  ">
          {username === blog.username && (
            <div className="ml-auto flex gap-4 flex-row">
              <Delete onClick={() => handleDelete(blog._id)} />
              <Link to={`/updatePost/${id}`}>
                <EditIcon />
              </Link>
            </div>
          )}
        </div>
        <h2 className="font-bold text-3xl text-center font-sans mt-6">
          {blog.title}
        </h2>
        <span className="mt-6 font-sans text-zinc-500 text-right">
          {new Date(blog.createdDate).toDateString()}
        </span>

        <h2 className="ml-0 -mt-4 mb-4  text-xl font-bold text-zinc-500  ">
          <span className="font-medium text-zinc-400">Author : </span>
          {blog.username}
        </h2>
        <h2 className="ml-0 -mt-4 mb-4  text-xl font-bold text-zinc-500  ">
          <span className="font-medium text-zinc-400">Category : </span>
          {blog.categories}
        </h2>

        <p className="w-full  text-justify font-semibold font-sans">
          Description: {blog.description}
        </p>
      </div>
      <Comments blog={blog} />
    </>
  );
}

export default SingleBlog;
