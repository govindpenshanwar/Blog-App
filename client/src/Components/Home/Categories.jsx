import React from 'react'
import { Button } from '@mui/material'
// import { categories } from '../Constants/data'
import { Link, } from 'react-router-dom';

function Categories() {
    // const [searchParam] = useSearchParams();
    // const category = searchParam.get('category')


    return (
        <div className='md:max-w-max sm:max-w-max max-w-max '>
            <div className='flex flex-col'>
                <Link
                    to={'/createPost'}
                // to={`/createPost?category=${category || ''}`}
                >
                    <Button
                        variant='contained'
                        color='error'
                        size='large'
                        style={{ marginTop: '20px', marginLeft: '15px' }}
                    >
                        Create Blog
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Categories