import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
    try{
       const {text}=req.body;

       if(!text?.trim()){
        return res.status(400).json({error:"Text cannot be empty"});
       }

       const user=await User.create({
        sender:"user",
        text
       })

       const botResponses = {
  // ===== GREETINGS (variants) =====
  "hi": "Hello! How can I assist you today?",
  "hello": "Hi there! Ask me anything.",
  "hey": "Hey! What’s up?",
  "hii": "Hey! What can I do for you?",
  "heyy": "Hey there! Need help?",
  "good morning": "Good morning! Ready to learn something new?",
  "good afternoon": "Good afternoon! How can I help?",
  "good evening": "Good evening! What do you need?",
  "yo": "Yo! What’s on your mind?",
  "sup": "Not much—what about you?",
  "what's up": "All good here. How can I help?",

  // ===== IDENTITY / META =====
  "who are you": "I'm a chatbot built using Node.js and Express.",
  "what is your name": "You can call me BotSpoof.",
  "who made you": "A developer engineered me using JavaScript.",
  "are you real": "I'm software, but I respond in real time.",
  "can you think": "I process inputs and generate responses.",
  "what can you do": "I help with coding, interviews, and general queries.",
  "what languages do you support": "I primarily understand English queries.",

  // ===== SMALL TALK =====
  "how are you": "I'm functioning optimally. How can I help?",
  "how is it going": "Smooth operations. What do you need?",
  "are you fine": "All systems operational.",
  "i am bored": "Try solving a coding problem or ask me something!",
  "i am tired": "Take a break—then get back stronger.",
  "motivate me": "Consistency beats intensity. Keep going.",
  "inspire me": "Every expert was once a beginner.",
  "tell me a joke": "Why do programmers prefer dark mode? Light attracts bugs 😄",
  "another joke": "Why do Java devs wear glasses? Because they don’t C# 😂",

  // ===== PROGRAMMING BASICS =====
  "what is coding": "Coding is writing instructions for computers.",
  "what is programming": "Programming is designing and building software.",
  "what is algorithm": "An algorithm is a step-by-step solution to a problem.",
  "what is syntax": "Syntax is the set of rules for writing code.",
  "what is compiler": "Compiler converts code into machine language.",
  "what is interpreter": "Interpreter executes code line by line.",
  "what is variable": "Variable stores data values.",
  "what is constant": "Constant is a fixed value.",
  "what is function": "Function is a reusable block of code.",
  "what is loop": "Loop repeats execution of code.",
  "what is condition": "Condition controls flow using logic.",

  // ===== DSA (expanded) =====
  "what is dsa": "Data Structures and Algorithms.",
  "what is array": "Collection of elements in contiguous memory.",
  "what is linked list": "Nodes connected via pointers.",
  "what is stack": "LIFO data structure.",
  "what is queue": "FIFO data structure.",
  "what is deque": "Double-ended queue.",
  "what is tree": "Hierarchical structure.",
  "what is binary tree": "Tree with max 2 children.",
  "what is bst": "Binary Search Tree with ordered nodes.",
  "what is heap": "Complete binary tree used in priority queues.",
  "what is graph": "Nodes connected by edges.",
  "what is bfs": "Breadth-first traversal.",
  "what is dfs": "Depth-first traversal.",
  "what is recursion": "Function calling itself.",
  "what is dynamic programming": "Optimizing using subproblems.",
  "what is greedy": "Local optimal choices.",
  "what is backtracking": "Try all possibilities.",
  "what is sliding window": "Optimized subarray technique.",
  "what is two pointer": "Dual index traversal technique.",
  "what is hashing": "Mapping data to indices.",
  "what is time complexity": "Measures execution time growth.",
  "what is space complexity": "Measures memory usage.",

  // ===== OOPS (expanded) =====
  "what is oops": "Object-Oriented Programming System.",
  "what is class": "Blueprint for objects.",
  "what is object": "Instance of class.",
  "what is encapsulation": "Data hiding.",
  "what is inheritance": "Code reuse mechanism.",
  "what is polymorphism": "Multiple behaviors.",
  "what is abstraction": "Hiding implementation details.",
  "what is constructor": "Initializes object.",
  "what is destructor": "Destroys object.",
  "what is interface": "Contract for classes.",

  // ===== DBMS =====
  "what is dbms": "Database Management System.",
  "what is sql": "Query language for databases.",
  "what is primary key": "Unique identifier.",
  "what is foreign key": "Links tables.",
  "what is normalization": "Reduce redundancy.",
  "what is denormalization": "Improve performance.",
  "what is indexing": "Speeds up queries.",
  "what is join": "Combines tables.",
  "what is transaction": "Unit of work.",
  "what is acid": "Atomicity, Consistency, Isolation, Durability.",

  // ===== OS =====
  "what is os": "Operating System.",
  "what is process": "Program in execution.",
  "what is thread": "Lightweight process.",
  "what is deadlock": "Processes stuck waiting.",
  "what is scheduling": "CPU allocation.",
  "what is paging": "Memory management technique.",
  "what is virtual memory": "Extends RAM using disk.",

  // ===== NETWORK =====
  "what is network": "Connected devices.",
  "what is ip": "Device identifier.",
  "what is dns": "Domain to IP converter.",
  "what is http": "Data transfer protocol.",
  "what is https": "Secure HTTP.",
  "what is tcp": "Reliable protocol.",
  "what is udp": "Fast but unreliable protocol.",

  // ===== WEB DEV =====
  "what is node js": "JavaScript runtime.",
  "what is express": "Backend framework.",
  "what is react": "Frontend library.",
  "what is api": "Communication interface.",
  "what is rest api": "RESTful communication.",
  "what is json": "Data format.",
  "what is middleware": "Request processor.",
  "what is cors": "Cross-origin control.",
  "what is jwt": "Authentication token.",
  "what is cookie": "Client storage.",
  "what is session": "User state storage.",

  // ===== DEBUGGING =====
  "what is bug": "Error in code.",
  "what is debugging": "Fixing bugs.",
  "why code not working": "Check syntax, logic, and runtime.",
  "how to fix error": "Read error logs and debug.",
  "what is stack trace": "Error call history.",

  // ===== INTERVIEW =====
  "tell me about yourself": "Explain background, skills, goals.",
  "why should we hire you": "Show value and fit.",
  "strengths": "Skills with proof.",
  "weakness": "Real weakness + improvement.",
  "hr round": "Behavioral assessment.",
  "technical round": "Skill evaluation.",
  "aptitude test": "Logical ability.",
  "group discussion": "Communication + teamwork.",

  // ===== PREPARATION =====
  "how to crack interview": "Practice DSA + projects.",
  "how to prepare placements": "Focus coding + core.",
  "best coding platform": "LeetCode, Codeforces.",
  "how to improve coding": "Daily practice.",
  "how to stay consistent": "Set small goals.",
  "study plan": "Mix theory + practice.",
  "best resources": "Docs + practice platforms.",

  // ===== SPORTS =====
"who is ms dhoni": "MS Dhoni is a former Indian cricket captain and World Cup winner.",
"who is virat kohli": "Virat Kohli is a top Indian cricketer and former captain.",
"what is cricket": "Cricket is a bat-and-ball game played between two teams.",
"what is football": "Football is a sport played with a ball using feet.",
"who won fifa 2022": "Argentina won the FIFA World Cup 2022.",
"who is messi": "Lionel Messi is one of the greatest football players.",
"who is ronaldo": "Cristiano Ronaldo is a world-famous footballer.",
"what is ipl": "IPL is Indian Premier League, a T20 cricket tournament.",
"how many players in cricket team": "There are 11 players in a cricket team.",
"what is olympics": "Olympics is an international sports event held every 4 years.",

// ===== GK (GENERAL KNOWLEDGE) =====
"capital of india": "New Delhi is the capital of India.",
"largest country": "Russia is the largest country in the world.",
"smallest country": "Vatican City is the smallest country.",
"national animal of india": "Tiger is the national animal of India.",
"national bird of india": "Peacock is the national bird of India.",
"who is prime minister of india": "Narendra Modi is the Prime Minister of India.",
"who is president of india": "Droupadi Murmu is the President of India.",
"largest ocean": "Pacific Ocean is the largest ocean.",
"longest river": "Nile is the longest river in the world.",
"currency of usa": "US Dollar is the currency of USA.",

// ===== MATH =====
"2+2": "2 + 2 = 4",
"5*5": "5 × 5 = 25",
"10/2": "10 ÷ 2 = 5",
"what is pi": "Pi is approximately 3.1416.",
"formula of area of circle": "Area = πr²",
"formula of perimeter of rectangle": "2(l + b)",
"what is algebra": "Algebra deals with variables and equations.",
"what is geometry": "Geometry studies shapes and sizes.",
"what is probability": "Probability measures chance of events.",
"what is derivative": "Derivative measures rate of change.",

// ===== SCIENCE =====
"what is gravity": "Gravity is the force that attracts objects.",
"who discovered gravity": "Isaac Newton discovered gravity.",
"what is photosynthesis": "Plants make food using sunlight.",
"what is atom": "Atom is the smallest unit of matter.",
"what is molecule": "Molecule is a group of atoms.",
"what is energy": "Energy is the ability to do work.",
"speed of light": "Speed of light is about 3×10^8 m/s.",
"what is dna": "DNA carries genetic information.",
"what is cell": "Cell is the basic unit of life.",
"what is electricity": "Electricity is flow of charge.",

// ===== CURRENT AFFAIRS (GENERIC SAFE) =====
"latest news": "I suggest checking trusted news apps for latest updates.",
"current affairs": "Stay updated with news platforms like The Hindu or BBC.",
"india news": "India has ongoing developments in tech, economy, and politics.",
"world news": "Global events include economy, climate, and geopolitics.",
"technology news": "AI and startups are trending in tech news.",
"sports news": "Cricket and football events are trending currently.",
"economy news": "Economic growth and inflation are key topics.",
"startup news": "Startups in AI and fintech are growing rapidly.",

// ===== EDUCATION =====
"what is physics": "Physics studies matter, energy, and motion.",
"what is chemistry": "Chemistry studies substances and reactions.",
"what is biology": "Biology studies living organisms.",
"what is engineering": "Engineering applies science to solve problems.",
"what is computer science": "CS studies computation and programming.",

// ===== RANDOM USEFUL =====
"time now": "I cannot access real-time clock yet.",
"date today": "I cannot fetch real-time date yet.",
"weather": "Please check a weather app for accurate data.",
"open google": "Please open your browser and go to google.com",
"open youtube": "Go to youtube.com to watch videos.",

//==fun==
"tell me a joke": "Why do programmers hate nature? Too many bugs 😄",
  "another joke": "Why Java devs wear glasses? Because they don’t C# 😂",
  "motivate me": "Discipline beats motivation. Keep going 💪",
  "inspire me": "Every expert was once a beginner.",
  "i am tired": "Take a break, then come back stronger.",

  // ===== GIT & GITHUB (PRACTICAL + QUESTIONS) =====
"what is git": "Git is a version control system used to track code changes.",
"what is github": "GitHub is a platform to host and manage Git repositories.",
"difference between git and github": "Git is a tool, GitHub is a cloud platform for Git repositories.",

// ===== CREATE & PUSH REPO =====
"how to create repository": "Go to GitHub → Click 'New Repository' → Add name → Create.",
"how to push code to github": "Use git init → git add . → git commit -m 'msg' → git remote add origin URL → git push -u origin main",
"how to upload project to github": "Initialize git, add files, commit, and push to GitHub repo.",
"how to post repository": "Create repo on GitHub → connect with local repo → push using git push.",

// ===== BASIC COMMANDS =====
"git init": "Initializes a new Git repository.",
"git add": "Stages changes for commit.",
"git commit": "Saves changes with a message.",
"git status": "Shows current changes and state.",
"git log": "Shows commit history.",
"git clone": "Copies a repo from GitHub.",
"git pull": "Fetch + merge latest changes.",
"git push": "Uploads local commits to GitHub.",

// ===== REMOTE =====
"git remote add origin": "Links local repo with GitHub repo.",
"git remote -v": "Shows remote repo URL.",
"how to connect local repo to github": "Use git remote add origin <repo-url>",

// ===== BRANCHING =====
"what is branch": "Branch is a separate line of development.",
"git branch": "Shows all branches.",
"git checkout": "Switch branch.",
"git checkout -b": "Create and switch branch.",
"git merge": "Merges branches.",
"main vs master": "Both are default branch names; 'main' is modern standard.",

// ===== ERRORS =====
"error failed to push": "Run git pull origin main --rebase then push again.",
"merge conflict": "Occurs when two changes conflict; resolve manually.",
"permission denied github": "Check SSH key or login credentials.",

// ===== INTERVIEW =====
"why use git": "To track changes, collaborate, and manage versions.",
"benefits of github": "Collaboration, backup, version control, open-source sharing.",
"what is commit": "Snapshot of changes in repo.",
"what is repository": "Storage for project files and history.",
"what is fork": "Copy of someone else's repo.",
"what is pull request": "Request to merge changes into main repo.",

// ===== STEP-BY-STEP (IMPORTANT) =====
"steps to push project to github": `
1. git init
2. git add .
3. git commit -m "first commit"
4. git branch -M main
5. git remote add origin <repo-url>
6. git push -u origin main
`,

"how to update repo": "Make changes → git add . → git commit → git push",
"how to clone repo": "git clone <repo-url>",

// ===== ADVANCED =====
"what is rebase": "Reapplies commits on top of another base.",
"git stash": "Temporarily saves changes.",
"git reset": "Undo commits.",
"git revert": "Undo changes safely with new commit.",

// ===== FALLBACK IMPROVED =====
"default": "I didn’t understand that. Try asking about cs core, coding, GK, sports, or science."
};
const normalizeText=text.toLowerCase().trim();
const botResponse=botResponses[normalizeText] || "Sorry, I don't understand that.";
const bot=await Bot.create({
    text:botResponse
})

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
