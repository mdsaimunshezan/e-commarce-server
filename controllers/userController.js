import joi from "joi";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import createToken from "../utils/createToken.js";

//CREATE USER
export const reguster = async (req, res) => {
  const { name, email, password } = req.body;

  //VALIDATION INPUT FIELD
  const shcema = joi.object({
    name: joi.string().min(3).max(30).trim().required(),
    email: joi.string().min(5).max(40).required().trim().email(),
    password: joi.string().min(5).max(40).trim().required(),
  });
  const { error } = shcema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    //EMAIL ALREADY EXIST
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist)
      return res.status(400).json({ message: "User Already Exist" });

    //PASSWORD HASE
    const hasePassword = await bcrypt.hash(password, 10);

    //CREATE USER
    const createUser = new UserModel({
      name,
      email,
      password: hasePassword,
    });

    //SAVE USER
    const user = await createUser.save();
    //TOKEN GENERATE
    const token = createToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN USER
export const login = async (req, res) => {
  const { email, password } = req.body;

  //VALIDATION INPUT FIELD
  const shcema = joi.object({
    email: joi.string().min(5).max(40).required().trim().email(),
    password: joi.string().min(5).max(40).trim().required(),
  });
  const { error } = shcema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    //EMAIL ALREADY EXIST
    const emailExist = await UserModel.findOne({ email: email });
    if (!emailExist) return res.status(400).json({ message: "User Not Found" });

    //MATCH PASSWORD
    const isMatchPassword = await bcrypt.compare(password, emailExist.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Password Not Match" });

    //TOKEN GENERATE
    const token = createToken(emailExist);

    res.status(200).json({ user: emailExist, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const customer = await UserModel.find({}).sort({admin:-1})
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "server internal error" });
  }
};
