import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import { setUser } from "../services/auth.js";
export const UserLogin = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    if (!email || phone || !password) {
      return res
        .status(400)
        .json({ error: "please provide neccessary details!" });
    }
    let user;
    if (phone) {
      user = await User.findOne({ email }, { phone });
    } else {
      user = await User.findOne({ email });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    console.log(isPasswordCorrect);
    if (!user) {
      return res.status(404).json({ error: "Invalid info user not found." });
    }

    if (!isPasswordCorrect) {
      return res.status(404).json({ error: "wrong password." });
    }
    req.session.user = user;
    const token = setUser(user);
    console.log(token);
    res.cookie("token",token,{httpOnly:true});
    return res.status(200).json({ data: user,token });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const UserSignUp = async (req, res) => {
  try {
    const { fullName, fatherName, phone, email, password } = req.body;
    console.log(req.body);
    if (!fullName || !fatherName || !phone || !email || !password) {
      return res.status(400).json({ error: "provied full info." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] }); // stop searching if found!
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ error: "user already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        fullName,
        fatherName,
        phone,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ data: "user created successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
