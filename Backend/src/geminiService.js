import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateReply=async(message)=>{
    
    try{
        const api_key=process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(api_key);
        const model= genAI.getGenerativeModel({model:"gemini-2.5-flash"});
        console.log(model);
        const result=await model.generateContent(
            `You are a chatbot.Answer clearly with proper formatting:
            -use short paragraphs
            -every sentence starting with "-" must be in new line
            -put each point on new line
            -use bullet points
            -no markdown symbols like ** or *
            -simple clean and readable text
            -do not write everything in one line
            
            also follow below given points strictly:
            1.First paragraph:short intro(2-3 lines max)
            2.then writes its properties or key facts or qualities in new line.
            3.Then bullet points,each on NEW LINE
            4.Use "-" for bulletts
            5. DO NOT write bullets in one line


            Example;
            Narendra Modi is an Indian politician. He currently serves as the 14th and current Prime Minister of India.
            Here are some key facts about him:
             - He is a member of the Bharatiya Janata Party (BJP).
             - He previously served as the Chief Minister of Gujarat for over 12 years. 
             - He was first elected Prime Minister in 2014. 
             - He was re-elected for a second term in 2019. 
             - His political ideology is often associated with Hindu nationalism

            User:${message}
            `
        );
        const response=await result.response;
        return response.text();
    }
    catch(error){
       console.log("Gemini error",error);
       return "Something went wrong. Try again";
    }
};