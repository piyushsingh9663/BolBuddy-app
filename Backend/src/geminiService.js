import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/user.model.js";

export const generateReply=async(message)=>{
        const api_key=process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(api_key);
        const models=["gemini-2.5-flash","gemini-3.1-flash-lite-preview"];
        for(let m of models){
            try{
                const model= genAI.getGenerativeModel({model:m});
                console.log(model);
                const result=await model.generateContent(`
                    You are BolBuddy AI, A helpful AI chatbot.

Write responses like ChatGPT and gemini:
- Clean spacing
- Proper paragraphs
- Bullet points when needed
- Line breaks between ideas
- No long blocks of text

Keep it:
- concise
- readable
- well structured
         
Example:
User question:
What is React and how to learn it?

Expected answer:
React Basics

React is a JavaScript library used to build user interfaces, especially for web apps.

Key Features:
- Component-based architecture
- Fast rendering using Virtual DOM
- Reusable UI components

How to learn React:

1. Learn JavaScript fundamentals
2. Understand HTML & CSS basics
3. Study React concepts:
   - Components
   - Props & State
4. Build small projects
5. Practice regularly

Conclusion:
React is beginner-friendly if your JavaScript is strong.

            
            User:{message}
            `
        );
        const response=await result.response;
        return response.text();
        }
        catch(err){
            if(err.status!==429 || err.status!==503){
               console.log("Server error",err);
            }
        }
    }
    throw new Error("All models exhausted");
};