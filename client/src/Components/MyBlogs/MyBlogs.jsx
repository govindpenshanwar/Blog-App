import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import error from '../Assets/error.jpg'
import {
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'
// import getAuthToken from "../../utils/authToken";
import { UserContext } from "../Context/UserContext";

function MyBlogs() {
    const [blogData, setBlogData] = useState([]);
    // const username = getAuthToken();
    const { username } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = await axios.get(`${baseUrl}/getMyBlogs/${username}`, { withCredentials: true });
                const response = API.data;
                console.log("Response => ", response);
                setBlogData(response);

            } catch (error) {
                console.error("Err at fetching Data => ", error.message);
            }
        };
        fetchData();
    }, [username]);
    return (
        <>
            {blogData.length === 0 ? (
                <div className="flex flex-col mt-28 items-center justify-center gap-10">
                    <p className="text-xl text-center mt-6 font-semibold font-sans "> No Blogs Posted Yet !
                        <img src={error} alt="error 404" className="w-[25rem] mt-20" />
                    </p>
                </div>
            ) :

                <div className="flex  flex-wrap md:gap-14 items-center justify-center sm:gap-6 gap-4   mt-24 mb-5  ">

                    {(blogData.map((blog) => (
                        <Link to={`/singleBlog/${blog._id}`}>
                            <div >
                                <Card
                                    key={blog._id}
                                    className="h-[500px] overflow-y-scroll"
                                    sx={{ width: 345 }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140px"
                                            className="w-full h-64"
                                            // image={blog}
                                            image={blog.picture}
                                            alt="blog image"
                                        />

                                        <CardContent>
                                            <p className="text-xl font-bold ">
                                                {blog.title}
                                            </p>
                                            <div className="h-36 overflow-y-scroll">
                                                <p className="text-base font-normal md:line-clamp-3 line-clamp-4">
                                                    {blog.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </Link>

                    )))}
                </div>
            }
        </>
    );
}

export default MyBlogs;
