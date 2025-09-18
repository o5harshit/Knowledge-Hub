import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import UserModel from "../Models/UserModel.js";


dotenv.config();

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userdata = await UserModel.findOne({email});
    if (!name && !email && !password) {
      return res.status(400).send("Email and Password and name Required");
    }
    if (userdata) {
      return res.json({
        success: false,
        message: "User with Email already exist",
      });
    }

    const user = await new UserModel({
      name : name,
      email: email,
      password: password,
    });
    await user.save();
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
   return  res.json({
      success: true,
      message: {
        success: true,
        message: {
          id : user._id,
          name : user.name,
          email: user.email,
          role : user.role,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password,role } = req.body;
    if (!email && !password) {
      return res.json({
        success: false,
        message: "Email and Password Required",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message:
          "User with the Email and Password Dont exist create your account first",
      });
    }
    const auth = await bcrypt.compare(password,user.password);
    if(!auth){
        return  res.json({
        success: false,
        message:
          "The Password dont match! Please enter correct passowrd",
      });
    }
     // Role validation
    if (role === "admin" && user.role !== "admin") {
      return res.json({
        success: false,
        message: "You are not authorized as Admin",
      });
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.json({
      success: true,
      message: {
        name : user.name,
        email: user.email,
        role : user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.json({ success: false, message: "User with given id not found" });
    }
    res.json({
      success: true,
      message: {
        name : user.name,
        email: user.email,
        id : user._id,
        role : user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};


export const Logout = async (req,res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};











