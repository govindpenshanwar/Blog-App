import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
function UserProfilePage() {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axios.get(`${baseUrl}/auth/user`, { withCredentials: true })
                setUserInfo(res.data);
                console.log("user info => ", res.data)
            } catch (error) {
                console.log("err fetching user info => ", error.message)
            }
        };
        fetchInfo();
    }, []);

    return (
        <div>
            {userInfo && userInfo.given_name ? (
                <div>
                    <p>Name: {userInfo.given_name}</p>
                    <img src={userInfo.picture} alt="User profile" />
                </div>
            ) :
                (
                    <p className='text-center text-2xl font-bold mt-20'>Please Login... </p>

                )}
        </div>
    )
}

export default UserProfilePage
