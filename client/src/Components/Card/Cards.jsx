import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import {
    CardActionArea,
    CardContent,
    CardMedia,
    CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

function Cards({ searchQuery }) {
    const [blogData, setBlogData] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isViewAll, setIsViewAll] = useState(false);
    const limit = 9;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API = await axios.get(`${baseUrl}/getData`, {
                    withCredentials: true,
                });
                const response = API.data;
                const blogs = isViewAll ? response : response.slice(0, limit);
                setBlogData(blogs);
                setLoading(false);
                // console.log("Blog => ", response);
            } catch (error) {
                console.error("Err at fetching Data => ", error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [isViewAll]);

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            const filtered = blogData.filter((blog) =>
                blog.categories.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogData);
        }
    }, [searchQuery, blogData]);

    if (loading) {
        return (
            <div className="flex  flex-1 justify-center items-center mt-28">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <p
                className="cursor-pointer self-end px-4 py-4 text-xl font-semibold"
                onClick={() => setIsViewAll((prev) => !prev)}

            >
                {isViewAll ? "View Less" : "View All"}
            </p>
            {filteredBlogs.length > 0 ? (
                <div
                    className="grid  grid-flow-row gap-5  grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-10  lg:gap-5 place-items-center place-content-center justify-center "
                // className=" mt-[1.2rem] mb-4   "
                >
                    {filteredBlogs.map((blog) => (
                        <Link to={`/singleBlog/${blog._id}`}>
                            <Card
                                key={blog._id}
                                className=" h-fit  "
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

                                    <CardContent className="flex flex-col gap-3 ">
                                        <p className="text-base font-semibold ">{blog.title}</p>

                                        <p className="text-base font-normal md:line-clamp-3  line-clamp-4">
                                            {blog.description}
                                        </p>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className=" flex items-center justify-center">
                    <h1 className=" text-xl text-center font-bold">No Posts found...</h1>
                </div>
            )}
        </>
    );
}

export default Cards;
