import React from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
// import { categories } from '../Constants/data'
import { Link, useSearchParams } from 'react-router-dom';

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

                {/* <Table className='grid col-span-2'
                    style={{ border: '1px solid rgba(224,224,224,1)', marginTop: '10px', marginLeft: '15px' }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                <Link to={"/home"}>
                                    All Categories
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell style={{ fontSize: '1.1rem', fontWeight: 'revert-layer' }} >
                                        <Link to={`/home?category=${category.type}`}>
                                            {category.type}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table> */}
            </div>
        </div>
    )
}

export default Categories