import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import toast from 'react-hot-toast'
import baseUrl from '../../../utils/baseUrl'
import { UserContext } from '../../Context/UserContext';

function AllComments({ allComments, setToogle }) {
    // const username = getAuthToken();
    const { username } = useContext(UserContext);
    const handleDelete = async (commentId) => {
        try {
            const api = await axios.delete(`${baseUrl}/deleteComment/${commentId}`, { withCredentials: true });
            const response = api.data;
            toast.success("Comment Deleted Successfully !!")
            setToogle(prevState => !prevState)

        } catch (error) {
            console.error("Err deleting comment at all comments page => ", error.message);
        }
    }
    return (
        <div className='md:w-2/5 w-4/5  '>
            {allComments.map((comment) => (
                <div
                    className='mt-5 bg-zinc-200 p-2 rounded '>
                    <div
                        key={comment.id}
                        className='flex flex-row gap-3 mb-2 font-sans px-2 '>
                        <p className='font-bold text-xl font-sans'>{comment.name}   </p>
                        <p className='sm:ml-4 ml-1 md:ml-6 font-normal mt-1  text-sm text-gray-400'>{new Date(comment.date).toDateString()}</p>
                        <button
                            onClick={() => handleDelete(comment._id)}
                            className='ml-auto hover:scale-110 transition-all'>
                            {comment.name === username && <DeleteIcon className='hover:scale-110 hover:text-red-600' />}
                        </button>

                    </div>
                    <div>
                        <p className=' text-base font-normal font-sans px-2'>{comment.comments}</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default AllComments
