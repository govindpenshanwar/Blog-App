import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import {
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'
// import getAuthToken from "../../utils/authToken";
import { UserContext } from "../Context/UserContext";
import ErrorPage from "../../utils/ErrorPage";

function MyBlogs() {
    const [blogData, setBlogData] = useState([]);
    // const username = getAuthToken();
    const { username } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const API = await axios.get(`${baseUrl}/getMyBlogs/${username}`, { withCredentials: true });
                const response = API.data;
                console.log("Response => ", response);
                setBlogData(response);
                setLoading(false)
            } catch (error) {
                console.error("Err at fetching Data => ", error.message);
                setLoading(false)
            }
        };
        fetchData();
    }, [username]);
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-28">
                <CircularProgress />
            </div>
        );
    }
    return (
        <>
            {blogData.length === 0 ? (
                <div className="flex flex-col mt-28  items-center justify-center gap-10">
                    <p className="text-xl text-center mt-6 font-semibold font-sans "> No Blogs Posted Yet !</p>
                    <ErrorPage />
                </div>
            ) :

                <div className="flex  flex-wrap md:gap-14 items-center justify-center sm:gap-6 gap-4   mt-24 mb-5  ">
                    {
                        blogData.map((blog) => (
                            <Link to={`/singleBlog/${blog._id}`}>
                                <div >
                                    <Card
                                        key={blog._id}
                                        // className="md:h-[53vh] h-[66vh] "
                                        // sx={{ width: 345 }}
                                        className=" h-fit  "
                                        sx={{ width: 350 }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140px"
                                                className="w-full h-64"
                                                // image={blog}
                                                z image={blog.picture}
                                                alt="blog image"
                                            />

                                            {/* <CardContent>
                                                <p className="text-xl font-bold ">
                                                    {blog.title}
                                                </p>
                                                <div className="h-36 ">
                                                    <p className="text-base font-normal md:line-clamp-3 line-clamp-4">
                                                        {blog.description}
                                                    </p>
                                                </div>
                                            </CardContent> */}
                                            <CardContent className="flex flex-col gap-3 ">
                                                <p className="text-base font-semibold ">{blog.title}</p>

                                                <p className="text-base font-normal md:line-clamp-3  line-clamp-4">
                                                    {blog.description}
                                                </p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            </Link>

                        ))
                    }
                </div>
            }
        </>
    );
}

export default MyBlogs;
