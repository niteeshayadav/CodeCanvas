import jwt from "jsonwebtoken";
import BlackList from "../models/blacklist.model.js";

const authenticatedUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ 
            message: 'Unauthorized, token not found' 
        });
    }
    try{
        const isBlackListed = await BlackList.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ 
                message: 'Unauthorized, token is blacklisted' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); /*If the token is valid, 
        it will return the decoded payload (which contains the user details in this case).
        Otherwise it will throw an error(invalid token-maybe token expired or tampered with)
        */
        req.user = decoded; // Attach the decoded user details to the request object for use in subsequent middleware or route handlers

        next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({ 
            message: 'invalid token' 
        });
    }
}

export default authenticatedUser;