import React ,{useEffect,useRef,useState} from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import axios from 'axios'
import {FaUserCircle} from 'react-icons/fa'
import {API_URL} from '../config/api'
function Bot() {

    const [messages,setMessages]=useState([])
    const [input,setInput]=useState("")
    const [loading,setLoading]=useState(false)


    useEffect(()=>{
      fetch(`${API_URL}/ping`)
      .then(()=>console.log("Server warmed"))
      .catch(()=>{});
    },[]);

    const messageEndRef=useRef(null);
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({behaviour:'smooth'});
    },[messages])
    const handleSendMessage=async ()=>{
        
        if(!input.trim() || loading)return ;
        setLoading(true);
        setInput("");
        try{
            const res=await axios.post(`${API_URL}/bot/v1/message`,{
                text:input
            })
            
            if(res.status===200){
                setMessages([...messages,{text:res.data.userMessage,sender:'user'},{text:res.data.botMessage, sender:'bot'}]);
            }

          
        }
        catch(error){
            console.log("Error sending message",error);
    
        }

        setInput("")
        setLoading(false);
    }


    const handleKeyPress=(e)=>{
        if(e.key==='Enter')handleSendMessage();
    }
  
  return (
    <div className='flex flex-col min-h-screen bg-[#0d0d0d] text-white'>
      {/* Header */}
<header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-10">
  <div className="container mx-auto flex justify-between items-center px-6 py-4">
    <div className='flex flex-row items-center gap-2'>
      <img src="/iconsBB.png" alt="Logo" className='w-10 h-10' />
      <h1 className="text-lg font-bold">BolBuddy</h1>
    </div>
    <FaUserCircle size={30} className="cursor-pointer" />
  </div>
</header>

{/* Chat area */}
<main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
  <div className="w-full max-w-4xl mx-auto px-4 flex flex-col space-y-3">

    {messages.length === 0 ? (
      // Centered welcome message
      <div className="text-center text-gray-400 text-lg">
        👋 Hi, I'm{" "}
        <span className="text-green-500 font-semibold">BolBuddy</span>.
      </div>
    ) : (
      <>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`markdown px-4 py-2 rounded-xl max-w-[75%] whitespace-pre-wrap ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-800 text-gray-100 self-start"
            }`}
          >
            {msg.text}
            
          </div>
        ))}

        {loading && (
          <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start">
            Buddy is typing...
          </div>
        )}
        <div ref={messageEndRef}/>
      </>
    )}

  </div>
</main>

{/* Footer */}
<footer className="fixed bottom-0 left-0 w-full px-6 py-3 bg-[#0d0d0d] z-10">
    <div className="w-full max-w-2xl mx-auto flex items-center border-t border-gray-600 bg-gray-900
     rounded-full px-3 py-1.5 shadow-lg overflow-hidden">
      
      <input
        type="text"
        className="flex grow min-w-0 max-w-full bg-transparent outline-none text-white placeholder-gray-400 px-2"
        placeholder="Ask BolBuddy..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={loading}
      />

      <button
      onClick={handleSendMessage}
      disabled={loading}
        className={`flex shrink-0 w-auto max-w-24 sm:w-auto justify-center  items-center
           gap-2 px-4 py-2 rounded-full text-white font-medium transition ${
          loading?
          "bg-gray-400 cursor-not-allowed"
          :"bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading && (<div className='w-4 h-4 border-2 border-white 
        border-t-transparent rounded-full animate-spin'></div>)}
        <span className='truncate'>
                  {loading?"Wait...":"Send"}
        </span>
      </button>

    </div>
</footer>
    </div>
  )
}

export default Bot
