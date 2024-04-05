import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState("");

    const login = (username) => {
        setUsername(username)
    }

    return (
        <UserContext.Provider value={{ username, login }}>
            {children}
        </UserContext.Provider>
    )
}