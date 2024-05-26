import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments/Comments";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import baseUrl from '../../utils/baseUrl'
import { UserContext } from "../Context/UserContext";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const { username } = useContext(UserContext);
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
      <div className="flex flex-col  mt-20 w-full   md:px-10 px-6   ">
        <div className="flex items-center justify-center  ">
          <img
            className="w-[30rem] "
            src={blog.picture}
            alt="Blog"
          />
        </div>
        <div className="flex  ml-0  ">
          {username === blog.username && (
            <div className="ml-auto mt-5 flex gap-4 flex-row items-center">
              <Delete
                className="hover:scale-110 cursor-pointer hover:text-red-600 transition-all"
                onClick={() => handleDelete(blog._id)}
              />
              <Link to={`/updatePost/${id}`}>
                <EditIcon
                  className="hover:scale-110 cursor-pointer hover:text-sky-600 transition-all"
                />
              </Link>
            </div>
          )}
        </div>
        <h2 className="font-bold md:text-2xl sm:text-xl text-lg text-center font-sans mt-6">
          {blog.title}
        </h2>
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center mt-8 ">
          <div className="flex flex-col gap-3 ">
            <h2 className="ml-0 -mt-4 mb-4  md:text-xl text-lg font-bold text-zinc-500  ">
              <span className="font-medium text-zinc-400">Author : </span>
              {blog.username}
            </h2>
            <h2 className="ml-0 -mt-4 mb-4   md:text-xl text-lg font-bold text-zinc-500  ">
              <span className="font-medium text-zinc-400">Category : </span>
              {blog.categories}
            </h2>
          </div>
          <span className="mt-2 mb-5 font-sans  md:text-lg text-base text-zinc-500 text-right">
            {new Date(blog.createdDate).toDateString()}
          </span>
        </div>

        <p className="w-full  text-justify text-base font-normal font-sans">
          <span className="text-lg font-semibold">
            Description:
          </span>  {blog.description}
        </p>
      </div>
      <Comments blog={blog} />
    </>
  );
}

export default SingleBlog;
