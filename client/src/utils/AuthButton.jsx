import React from 'react'
import google from '../Components/Assets/google.png'
function AuthButton() {
    const handleLogin = async () => {
        window.open("https://blog-app-backend-blond.vercel.app/auth/google", "_self");
        setTimeout(() => {
            window.location.href("/auth-handler");
        }, 2000);
    };
    return (
        <div>
            <button
                className=" flex flex-row border p-2 rounded shadow items-center justify-center gap-1  w-max text-lg font-semibold hover:scale-105 transition-all"
                onClick={handleLogin}>
                <img
                    alt="google logo"
                    src={google}
                    width={30}
                    height={30}
                />
                Continue with Google</button>
        </div>
    )
}

export default AuthButton
