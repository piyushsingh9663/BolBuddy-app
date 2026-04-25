import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";
import { generateReply } from "../src/geminiService.js";


export const Message=async(req,res)=>{
  try{
    const {text}=req.body;

    if(!text?.trim()){
      return res.status(400).json({error:"Text cannot be empty"});
    }

    const user=await User.create({
      sender:"user",
      text
    });

    const botResponse=await generateReply(text);

    const bot=await Bot.create({
      text:botResponse
    });
    return res.status(200).json({
      userMessage:user.text,
      botMessage:bot.text,
    })
}
    catch(error){
      console.log("Error in message controller",error);
      return res.status(500).json({error:"Internal server error"});
    }
}
