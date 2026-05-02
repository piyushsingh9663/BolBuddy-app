import express from "express";
import { register,login,deleteMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {body,validationResult} from "express-validator";

const router=express.Router();

const validateRegister=[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Min 6 chars")
];

const checkValidation=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
};

router.post("/register",validateRegister,checkValidation,register);
router.post("/login",validateRegister,checkValidation,login);
router.delete("/me",protect,deleteMe);
export default router;