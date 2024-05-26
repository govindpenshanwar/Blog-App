import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import {
    CardActionArea,
    CardContent,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from '../../utils/baseUrl'

function Cards({ searchQuery }) {
    const [blogData, setBlogData] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API = await axios.get(`${baseUrl}/getData`, { withCredentials: true });
                const response = API.data;
                setBlogData(response);
                // console.log("Blog => ", response);
            } catch (error) {
                console.error("Err at fetching Data => ", error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            const filtered = blogData.filter(blog =>
                blog.categories.includes(searchQuery)
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogData);
        }
    }, [searchQuery, blogData]);

    return (
        <>
            {filteredBlogs.length > 0 ?
                filteredBlogs.map((blog) => (
                    <div
                        key={blog._id}
                        className=" mt-[1.2rem] mb-4   ">
                        <Link to={`/singleBlog/${blog._id}`}>
                            <Card
                                className="h-[53vh] "
                                sx={{ width: 350 }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140px"
                                        className="w-full h-64"
                                        image={blog.picture}
                                        alt="blog image"
                                    />

                                    <CardContent
                                        className="flex flex-col gap-3 "
                                    >
                                        <p className="text-lg font-bold ">
                                            {blog.title}
                                        </p>

                                        <p className="text-base font-normal md:line-clamp-3 line-clamp-4">
                                            {blog.description}
                                        </p>

                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        </Link>

                    </div>
                ))
                :
                <div className=" flex items-center">
                    <h1 className=" text-xl text-center  font-bold">No Posts found...</h1>
                </div>
            }

        </>
    );
}

export default Cards;
