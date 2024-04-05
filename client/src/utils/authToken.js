
const getAuthToken = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));

    if (token) {
        try {
            const tokenValue = token
            // .split('=')[1]; // Extract token value from cookie
            const payload = JSON.parse(atob(tokenValue.split('.')[1])); // Decode token payload
            console.log(payload);
            const { username } = payload;
            return username;
        } catch (error) {
            console.error("Error decoding token:", error.message);
        }
    } else {
        console.log("No token found");
    }
}

export default getAuthToken;
