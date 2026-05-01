import conversation from "../models/conversation.model.js";
import { generateReply } from "../src/geminiService.js";


export const sendMessage=async(req,res)=>{
  try{
    const {text}=req.body;

    if(!text?.trim()){
      return res.status(400).json({error:"Text cannot be empty"});
    }
    const userId=req.user.id;
    const user=await conversation.create({
      userId,
      sender:"user",
      content:text
    });

    const botResponse=await generateReply(text);

    const bot=await conversation.create({
      userId,
      sender:"bot",
      content:botResponse
    });
    return res.status(200).json({
      userMessage:user.content,
      botMessage:bot.content,
    })
}
    catch(error){
      console.log("Error in message controller",error);
      return res.status(500).json({error:"Internal server error"});
    }
}
