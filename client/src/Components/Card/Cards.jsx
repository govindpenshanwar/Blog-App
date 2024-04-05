import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import {
    Button,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'

function Cards() {
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = await axios.get(`${baseUrl}/getData`, { withCredentials: true });
                const response = API.data;
                setBlogData(response);
                console.log("Blog => ", response);
            } catch (error) {
                console.error("Err at fetching Data => ", error.message);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {
                blogData.map((blog) => (
                    <div
                        key={blog._id}
                        className="flex  flex-wrap gap-8 ml-14 mt-[4.5rem] mb-5  ">
                        <Link to={`/singleBlog/${blog._id}`}>
                            <Card

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

                            </Card>
                        </Link>

                    </div>
                ))
            }
        </>
    );
}

export default Cards;
