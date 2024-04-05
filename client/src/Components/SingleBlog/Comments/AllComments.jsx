import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import toast from 'react-hot-toast'
import getAuthToken from '../../../utils/authToken';
import baseUrl from '../../../utils/baseUrl'

function AllComments({ allComments, setToogle }) {
    const username = getAuthToken();
    const handleDelete = async (commentId) => {
        try {
            const api = await axios.delete(`${baseUrl}/deleteComment/${commentId}`, { withCredentials: true });
            const response = api.data;
            console.log(response);
            toast.success("Comment Deleted Successfully !!")
            setToogle(prevState => !prevState)

        } catch (error) {
            console.error("Err deleting comment at all comments page => ", error.message);
        }
    }
    return (
        <div className='mt-10 w-2/3 mb-5 ml-24  '>
            {allComments.map((comment) => (
                <div className='mt-5 bg-zinc-100 p-2 rounded ml-8'>
                    <div className='flex flex-row gap-3 mb-2 font-sans '>
                        <p className='font-bold text-xl font-sans'>{comment.name}   </p>
                        <p className='ml-6 font-normal mt-1  text-sm text-gray-400'>{new Date(comment.date).toDateString()}</p>
                        <button
                            onClick={() => handleDelete(comment._id)}
                            className='ml-auto hover:scale-110 transition-all'>
                            {comment.name === username && <DeleteIcon />}
                        </button>

                    </div>
                    <div>
                        <p className=' text-base font-normal font-sans'>{comment.comments}</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default AllComments