import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext'

function Contact() {
    const { username } = useContext(UserContext)
    return (
        <div>
            This is contact page
            Hello : {username}
        </div>
    )
}

export default Contact
