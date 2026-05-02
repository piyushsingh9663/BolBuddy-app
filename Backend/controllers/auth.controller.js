import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const exists = await User.findOne({ email:String(email) });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await User.create({ username, email, password });
    console.log("User Created:",user)

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email:String(email) });
    if (!user) {
      return res.status(404).json({ error: "User no found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const deleteMe = async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findByIdAndDelete(userId);
        if(!user)return res.status(404).json({error:"User not found"});
        localStorage.removeItem("token",req.data.token);
        return res.status(200).json({message:"Account Deleted"});
    }
    catch(err){
        return res.status(500).json({error:"Delete Failed"});
    }
};