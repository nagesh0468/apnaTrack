import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"
import { User } from "../models"
import logger from "../middleware/loggerMiddleware"
import type { Request,Response } from "express"
type regData = {
    emailId:string,
    passwordKey:string
};
//use camel case for functioning naming
const signUp = async (req:Request,res:Response)=>{
    try{
     
        const {emailId,passwordKey} = req.body as regData;
        if(!emailId ||!passwordKey){
            logger.warn("Email and Password are required")
            return;
        }
      const hashedPassword = await bcrypt.hash(passwordKey, 10); //use camel case

    const newUser = await User?.create({ emailId, passwordKey: hashedPassword });
    logger.info("User registered successfully")
    return  res.status(201).json({ message: "User registered successfully",newUser });
    }
    catch(error){
        logger.error("Something went wrong");
        return;
    }

}
//using pascal case for functionig naming
const SignIn = async (req:Request,res:Response)=>{
    try{
         const {emailId,passwordKey} = req.body as regData;
         if (!emailId || !passwordKey) {
      logger.warn("Email and Password are required");
      return res.status(400).json({ message: "Email and Password are required" });
    }

    // Find user by email
    const userData = await User?.findOne({ where: { emailId } });

    if (!userData) {
      logger.warn("User not found: %s", emailId);
      return;
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(passwordKey, userData.getDataValue("passwordKey"));
    if (!isPasswordCorrect) {
      logger.warn("Invalid password for user: %s", emailId);
      return;
    }

    // Generate JWT token
    const tokenAccess = jwt.sign(
      { id: userData.getDataValue("id"), email: userData.getDataValue("emailId") },
      process.env.JWT!,
      { expiresIn: "7d" }
    );

    // Return safe user info
    const safeUser = {
      id: userData.getDataValue("id"),
      email: userData.getDataValue("emailId"),
    };

    logger.info("User logged in successfully: %o", safeUser);

    return res.status(200).json({ user: safeUser, tokenAccess });
    }
    catch(error){
       logger.error("Something went wrong");
        return; 
    }
}
export {signUp,SignIn};