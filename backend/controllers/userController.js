import jwt from 'jsonwebtoken';
import User from '../models/userSchems.js';
import bcrypt from 'bcrypt'

const signupHandler = async (req,res)=>{
 try {
    const  { name, email, password } = req.body;
    console.log("Signup request body:", req.body);
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }       
    const existingUser = await User.find({email});
    console.log("Existing User:", existingUser);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn : "13d"});
    res.status(201).json({ token });
 } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Internal server error' }); 
 }
}

const loginHandler = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn : "13d"});
        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const profileHandler = async (req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ id : user._id, email: user.email, name: user.name });
    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {signupHandler,loginHandler,profileHandler};