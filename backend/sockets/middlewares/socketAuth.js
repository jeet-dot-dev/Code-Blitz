import jwt from 'jsonwebtoken';

const socketAuth = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        // console.log("Socket authentication token:", token);
        if(!token) {
            const err = new Error('Authentication error: No token provided');
            err.data = { content: "Please provide a valid token" }
            return next(err);
        }

            // Decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded
            next();
    } catch (error) {
        console.error("Socket authentiacation error:", error);
        next(new Error('Authentication error: Invalid token'));
        
    }
}

export default socketAuth;