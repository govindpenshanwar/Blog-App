import React, { useState, useEffect, useContext } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { TextField, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import AllComments from './AllComments';
import toast from 'react-hot-toast';
import baseUrl from '../../../utils/baseUrl';
import { UserContext } from '../../Context/UserContext';


const initialValues = {
    name: '',
    postId: "",
    comments: "",
    date: new Date()
}
function Comments({ blog }) {
    const { username } = useContext(UserContext)
    const [comment, setComment] = useState(initialValues);
    const [allComments, setAllComments] = useState([]);
    const [toogle, setToogle] = useState(false);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: username,
            postId: blog._id,
            comments: e.target.value

        })
    }

    const addComment = async () => {
        try {
            const api = await axios.post(`${baseUrl}/comments`, comment, { withCredentials: true });
            const response = api.data;
            console.log(response);
            toast.success("Comment added Successfully !!")
            setToogle(prevState => !prevState);
        } catch (error) {
            console.error("Err at posting comment => ", error.message);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = await axios.get(`${baseUrl}/getComments/${blog._id}`, { withCredentials: true });
                const response = api.data;
                setAllComments(response.data);
                console.log("Comment =>", response.data);
            } catch (error) {
                console.error("Err at all comment page => ", error.message);
            }
        }
        fetchData();
    }, [blog._id, toogle])
    return (
        <div className=' flex flex-col items-center justify-center mb-5    '>
            <div className='flex flex-row mt-32    w-2/3 items-center justify-center gap-1'>

                <TextField
                    placeholder="What's on your mind ?"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                    className='rounded-lg '
                    style={{ width: '100%', height: '55px', padding: "" }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon fontSize='medium' />
                            </InputAdornment>
                        ),
                    }}

                />
                <button
                    onClick={addComment}
                    className='flex'>
                    <SendIcon fontSize='large' />
                </button>
            </div>
            <AllComments allComments={allComments} setToogle={setToogle} />
        </div>
    );
}

export default Comments;
