import User from '../models/user.model.js';
import BlackList from '../models/blacklist.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * @name registerUser
 * @desc Register a new user, expects username, email and password in the request body
 * @access Public
 */

const registerUser = async (req, res, next) => {
    const { username, fullname, email, password, rememberMe } = req.body;
    if (!username || !fullname || !email || !password) {
        return res.status(400).json({ 
            message: 'Please provide username, fullname, email and password' 
        });
    }
    if(password.length < 6) {
        return res.status(400).json({ 
            message: 'Password must be at least 6 characters' 
        });
    }
    try {
        const isUserAlreadyExists = await User.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({ 
                message: 'Username or email already exists' 
            });
        }
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);

        const NewUser = await User.create({
            username,
            email,
            fullname,
            password: hashedPassword
        });

        const token = await jwt.sign({
            id: NewUser._id,
            username: NewUser.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        );

        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        };
        
        if(rememberMe) {
            cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
        }
       
        res.cookie("token", token, cookieOptions);

        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                id: NewUser._id,
                username: NewUser.username,
                fullname: NewUser.fullname,
                email: NewUser.email,
            }
        });

    }
    catch (err) {
        next(err);
    }
}

/**
 * 
 * @name loginUser
 * @desc Login a user, expects email and password in the request body
 * @access Public 
 */

const loginUser = async (req, res, next) => {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Please provide email and password' 
        });
    } 

    try {
        const ExistingUser = await User.findOne({ email });
    if (!ExistingUser) {
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, ExistingUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }

    const token = jwt.sign({
        id: ExistingUser._id,
        username: ExistingUser.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
    );
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    if (rememberMe) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
    }

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: ExistingUser._id,
            username: ExistingUser.username,
            fullname: ExistingUser.fullname,
            email: ExistingUser.email,
        }
    });
    }
    catch (err) {
        next(err);
    }
}

/**
 * @name logoutUser
 * @desc Logout a user by clearing the token from cookies and Blacklisting the token
 * @access Public
 */

const logoutUser = async (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: 'No token provided'
        });
    }
    try{
        await BlackList.create({ token });
        res.clearCookie('token');
        res.status(200).json({
            message: 'User logged out successfully'
        });
    }
    catch(err){
        next(err);
    }
}

/**
 * @name getMe
 * @desc Get the logged in user's details, expects token in the cookies
 * @access Private
 */

const getMe = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field from the response
    res.status(200).json({
        message: 'User details fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email
        }
    });
    }
    catch(err){
        next(err);
    }
}

const authController = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}

export default authController;