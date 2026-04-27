import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateReply=async(message)=>{
    
    try{
        const api_key=process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(api_key);
        const model= genAI.getGenerativeModel({model:"gemini-2.5-flash"});
        console.log(model);
        const result=await model.generateContent(
            `You are a chatbot.Answer clearly with proper formatting:
            -for long replies you can use long paragraphs or essay type
            -always use section wise replies with section title.
            -when changing sections try to give extra line breaks for readability
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
            who is narendra modi?
            
            Introduction
Narendra Modi is a prominent Indian political leader and the current Prime Minister of India. Known for his strong leadership and development-focused governance, he has played a major role in shaping modern India’s political and economic landscape.

Early Life and Background
Narendra Modi was born on September 17, 1950, in Vadnagar, Gujarat. He came from a modest family and helped his father sell tea during his childhood. His early life reflects discipline, hard work, and a strong sense of self-reliance. These experiences significantly influenced his later leadership style.

Political Career
Modi began his political journey with the Rashtriya Swayamsevak Sangh (RSS), where he gained organizational experience. Later, he joined the Bharatiya Janata Party (BJP) and steadily rose through its ranks. In 2001, he became the Chief Minister of Gujarat and served for over a decade, focusing on industrial growth and infrastructure development.

Prime Minister of India
In 2014, Narendra Modi became the Prime Minister after leading the BJP to a decisive victory. He was re-elected in 2019 with an even stronger mandate. His leadership is often associated with decisive governance, large-scale reforms, and strong public communication.

Major Policies and Initiatives
Modi has launched several key initiatives:


Make in India: Promoting manufacturing and investment


Digital India: Expanding digital infrastructure


Swachh Bharat Abhiyan: Improving cleanliness and sanitation


Jan Dhan Yojana: Financial inclusion for millions


GST (Goods and Services Tax): Simplifying the tax system


Demonetization: Aimed at reducing black money and boosting digital payments



Foreign Policy
Modi has actively strengthened India’s global relations. He has focused on building partnerships with major economies, increasing India’s global influence, and promoting trade and diplomacy across different regions.

Criticism and Challenges
Despite his achievements, his leadership has faced criticism. Policies like demonetization and certain economic decisions have been debated for their short-term impacts. There have also been discussions around governance style and social issues.

Conclusion
Narendra Modi remains a highly influential leader in India. His tenure is marked by ambitious reforms, strong leadership, and a focus on development. His impact continues to shape India’s future in multiple dimensions.

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