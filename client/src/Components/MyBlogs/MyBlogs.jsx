import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import error from '../Assets/error.jpg'
import {
    Button,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'
import getAuthToken from "../../utils/authToken";

function MyBlogs() {
    const [blogData, setBlogData] = useState([]);
    const username = getAuthToken();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = await axios.get(`${baseUrl}/getMyBlogs/${username}`, { withCredentials: true });
                const response = API.data;
                console.log("Response => ", response);
                if (response && typeof response === 'object') {
                    setBlogData([response]);
                } else {
                    console.error("Invalid data format: expected object, received: ", response);
                }

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

                <div className="flex  flex-wrap gap-8 ml-10 mt-24 mb-5  ">

                    {(blogData.map((blog) => (
                        <Link to={`/singleBlog/${blog._id}`}>
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
                                            {/* My Blog */}
                                            {blog.title}
                                        </p>
                                        <div className="h-36 overflow-y-auto">
                                            <p className="text-base font-normal">
                                                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique alias asperiores sint ipsum neque aperiam quas temporibus accusantium libero error sit itaque enim laborum, provident rem soluta corrupti sequi consectetur? */}
                                                {blog.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Link>

                    )))}
                </div>
            }
        </>
    );
}

export default MyBlogs;
