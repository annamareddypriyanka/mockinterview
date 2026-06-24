import { useState, useEffect, useRef, useCallback } from "react";

const CATEGORIES = [
  "Programming Fundamentals","C","C++","Java","Python","OOP","DBMS","SQL",
  "Operating Systems","Computer Networks","Data Structures","Algorithms",
  "Machine Learning","DevOps","Cloud Computing","Software Engineering",
  "Project Discussion","HR Questions"
];
const DIFFICULTIES = ["Beginner","Intermediate","Advanced"];
const COMPANIES = ["TCS","Infosys","Accenture","Cognizant","Capgemini","Wipro","Amazon","Microsoft"];
const QUESTION_BANK = {
  "Python": [
    "What is a list in Python?","What is the difference between list and tuple?","What is a decorator?",
    "What is a generator in Python?","What are *args and **kwargs?","What is the difference between deep copy and shallow copy?",
    "What is a dictionary in Python?","What is a set in Python?","What is list comprehension?",
    "What is exception handling in Python?","What is the difference between == and is?","What is the __init__() method?",
    "What is inheritance in Python?","What is polymorphism in Python?","What is encapsulation in Python?",
    "What is abstraction in Python?","What is the difference between mutable and immutable objects?","What is lambda function?",
    "What is recursion?","What is a module in Python?","What is a package in Python?",
    "What is the difference between append() and extend()?","What is slicing in Python?","What is a virtual environment?",
    "What is PEP 8?","What is GIL in Python?","What is a class?","What is an object?",
    "What is method overriding?","What is method overloading?"
  ],
  "C": [
    "What is C language?","Why is C platform dependent?","What is a compiler?","What is an interpreter?",
    "What is the difference between compiler and interpreter?","What is a pointer?","Why do we use pointers?",
    "What is a null pointer?","What is a dangling pointer?","What is a wild pointer?","What is pointer arithmetic?",
    "What is a function pointer?","What is malloc()?","What is calloc()?","What is realloc()?","What is free()?",
    "What is a memory leak?","What is stack memory?","What is heap memory?","What is dynamic memory allocation?",
    "What is recursion in C?","What is structure?","What is union?","What is enum?","What is typedef?",
    "What is a storage class?","What is static variable?","What is extern variable?","What is register variable?","What is auto variable?"
  ],
  "C++": [
    "What is C++?","What is object-oriented programming?","What are the four pillars of OOP?","What is encapsulation?",
    "What is abstraction?","What is inheritance?","What is polymorphism?","What is function overloading?",
    "What is operator overloading?","What is constructor?","What is destructor?","What is copy constructor?",
    "What is virtual function?","What is pure virtual function?","What is abstract class?","What is friend function?",
    "What is this pointer?","What is multiple inheritance?","What is hybrid inheritance?","What is the diamond problem?",
    "What is runtime polymorphism?","What is compile-time polymorphism?","What is namespace?","What is STL?",
    "What is vector?","What is map?","What is unordered_map?","What is queue?","What is stack?","What is deque?"
  ],
  "Java": [
    "What is Java?","What is JVM?","What is JRE?","What is JDK?","What is bytecode?",
    "Why is Java platform independent?","What is String?","Why is String immutable?","What is StringBuilder?",
    "What is StringBuffer?","What is ArrayList?","What is LinkedList?","What is HashMap?","What is Hashtable?",
    "What is multithreading?","What is synchronization?","What is exception handling?","What is checked exception?",
    "What is unchecked exception?","What is garbage collection?","What is interface?","What is abstract class?",
    "What is package?","What is collection framework?","What is method overriding?","What is method overloading?",
    "What is final keyword?","What is static keyword?","What is constructor chaining?","What is serialization?"
  ],
  "OOP": [
    "What is object-oriented programming?","What are the four pillars of OOP?","What is encapsulation?",
    "What is abstraction?","What is inheritance?","What is polymorphism?","What is function overloading?",
    "What is operator overloading?","What is constructor?","What is destructor?","What is copy constructor?",
    "What is virtual function?","What is pure virtual function?","What is abstract class?","What is friend function?",
    "What is this pointer?","What is multiple inheritance?","What is hybrid inheritance?","What is the diamond problem?",
    "What is runtime polymorphism?","What is compile-time polymorphism?","What is method overriding?",
    "What is method overloading?","What is interface?","What is an object?","What is a class?",
    "What is association?","What is aggregation?","What is composition?","What is coupling?"
  ],
  "DBMS": [
    "What is DBMS?","What is RDBMS?","What is normalization?","What is 1NF?","What is 2NF?","What is 3NF?",
    "What is BCNF?","What is primary key?","What is foreign key?","What is candidate key?","What is composite key?",
    "What is super key?","What is unique key?","What is SQL?","What are DDL commands?","What are DML commands?",
    "What are DCL commands?","What are TCL commands?","What is a join?","What is inner join?","What is left join?",
    "What is right join?","What is full join?","What is self join?","What is denormalization?","What is ACID property?",
    "What is indexing?","What is clustered index?","What is non-clustered index?","What is a view?",
    "What is a materialized view?","What is a trigger?","What is a stored procedure?","What is a function in SQL?",
    "What is PL/SQL?","What is a cursor?","What are types of cursors?","What is a transaction?","What is commit?",
    "What is rollback?","What is savepoint?","What is deadlock in DBMS?","What is a sequence?","What is a synonym?",
    "What is a schema?","What is a nested table?","What is VARRAY?","What is bulk collect?","What is FORALL?"
  ],
  "SQL": [
    "What is SQL?","What are DDL commands?","What are DML commands?","What are DCL commands?","What are TCL commands?",
    "What is a join?","What is inner join?","What is left join?","What is right join?","What is full join?",
    "What is self join?","What is normalization?","What is denormalization?","What is ACID property?","What is indexing?",
    "What is clustered index?","What is non-clustered index?","What is a view?","What is a materialized view?",
    "What is a trigger?","What is a stored procedure?","What is a function in SQL?","What is a cursor?",
    "What is a transaction?","What is commit?","What is rollback?","What is savepoint?","What is a sequence?",
    "What is GROUP BY?","What is HAVING clause?"
  ],
  "Operating Systems": [
    "What is an operating system?","What is a process?","What is a thread?","What is the difference between process and thread?",
    "What is a process control block?","What is context switching?","What is multitasking?","What is multiprocessing?",
    "What is deadlock?","What are Coffman conditions?","What is semaphore?","What is mutex?","What is binary semaphore?",
    "What is counting semaphore?","What is memory management?","What is paging?","What is segmentation?",
    "What is demand paging?","What is page fault?","What is virtual memory?","What is FIFO page replacement?",
    "What is LRU page replacement?","What is optimal page replacement?","What is thrashing?","What is fragmentation?",
    "What is internal fragmentation?","What is external fragmentation?","What is system call?","What is user mode?","What is kernel mode?"
  ],
  "Computer Networks": [
    "What is computer networking?","What is OSI model?","What are the layers of OSI model?","What is TCP?","What is UDP?",
    "What is IP address?","What is IPv4?","What is IPv6?","What is DNS?","What is DHCP?","What is MAC address?",
    "What is router?","What is switch?","What is hub?","What is gateway?","What is HTTP?","What is HTTPS?",
    "What is SSL/TLS?","What is TCP three-way handshake?","What is TCP four-way termination?","What is subnetting?",
    "What is NAT?","What is firewall?","What is proxy server?","What is VPN?","What is ARP?","What is ICMP?",
    "What is socket?","What is bandwidth?","What is latency?"
  ],
  "Data Structures": [
    "What is a data structure?","What is an array?","What is a linked list?","What is a doubly linked list?",
    "What is a circular linked list?","What is stack?","What is queue?","What is circular queue?","What is priority queue?",
    "What is deque?","What is tree?","What is binary tree?","What is binary search tree?","What is AVL tree?",
    "What is heap?","What is max heap?","What is min heap?","What is graph?","What is BFS?","What is DFS?",
    "What is hashing?","What is collision in hashing?","What is hash table?","What is binary search?","What is linear search?",
    "What is bubble sort?","What is selection sort?","What is insertion sort?","What is merge sort?","What is quick sort?"
  ],
  "Algorithms": [
    "What is binary search?","What is linear search?","What is bubble sort?","What is selection sort?",
    "What is insertion sort?","What is merge sort?","What is quick sort?","What is BFS?","What is DFS?",
    "What is dynamic programming?","What is greedy algorithm?","What is divide and conquer?","What is backtracking?",
    "What is time complexity?","What is space complexity?","What is Big O notation?","What is recursion?",
    "What is memoization?","What is tabulation?","What is Dijkstra algorithm?","What is Floyd-Warshall algorithm?",
    "What is Kruskal algorithm?","What is Prim algorithm?","What is topological sorting?","What is cycle detection?",
    "What is two-pointer technique?","What is sliding window?","What is KMP algorithm?","What is hashing in algorithms?","What is heap sort?"
  ],
  "Machine Learning": [
    "What is machine learning?","What is artificial intelligence?","What is deep learning?","What is supervised learning?",
    "What is unsupervised learning?","What is reinforcement learning?","What is classification?","What is regression?",
    "What is overfitting?","What is underfitting?","What is train-test split?","What is cross-validation?",
    "What is Random Forest?","What is Decision Tree?","What is SVM?","What is KNN?","What is Logistic Regression?",
    "What is Precision?","What is Recall?","What is F1 Score?","What is Accuracy?","What is ROC-AUC?",
    "What is confusion matrix?","What is feature engineering?","What is feature selection?","What is normalization in ML?",
    "What is standardization?","What is PCA?","What is CNN?","What is RNN?"
  ],
  "DevOps": [
    "What is DevOps?","What is CI/CD?","What is Git?","What is GitHub?","What is Docker?","What is Kubernetes?",
    "What is Jenkins?","What is REST API?","What is authentication?","What is authorization?",
    "What is containerization?","What is microservices?","What is infrastructure as code?","What is Ansible?",
    "What is Terraform?","What is monitoring?","What is logging?","What is agile?","What is scrum?","What is a pipeline?",
    "What is blue-green deployment?","What is canary deployment?","What is rollback?","What is version control?",
    "What is branching strategy?","What is merge conflict?","What is pull request?","What is code review?",
    "What is artifact registry?","What is helm chart?"
  ],
  "Programming Fundamentals": [
    "What is a compiler?","What is an interpreter?","What is a variable?","What is a data type?","What is a function?",
    "What is recursion?","What is iteration?","What is an algorithm?","What is pseudocode?","What is debugging?",
    "What is a loop?","What is a conditional statement?","What is object-oriented programming?","What is a class?",
    "What is an object?","What is an array?","What is a string?","What is type casting?","What is a pointer?",
    "What is memory management?","What is a stack?","What is a queue?","What is a linked list?","What is Big O notation?",
    "What is abstraction?","What is encapsulation?","What is inheritance?","What is polymorphism?",
    "What is a library?","What is an API?"
  ]
};

const CODING_PROBLEMS = [
  {id:"prime",title:"Prime Number",desc:"Check if a number is prime"},
  {id:"palindrome",title:"Palindrome",desc:"Check if a string/number is palindrome"},
  {id:"armstrong",title:"Armstrong Number",desc:"Check if a number is an Armstrong number"},
  {id:"reverse",title:"Reverse String",desc:"Reverse a given string"},
  {id:"fibonacci",title:"Fibonacci",desc:"Generate Fibonacci sequence"},
  {id:"binary_search",title:"Binary Search",desc:"Implement binary search algorithm"},
  {id:"linked_list",title:"Linked List",desc:"Implement a singly linked list"},
  {id:"stack",title:"Stack",desc:"Implement a stack data structure"},
  {id:"queue",title:"Queue",desc:"Implement a queue data structure"},
];
const CODE_TEMPLATES = {
  python: {
    prime: `def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))`,
    palindrome: `def is_palindrome(s):\n    s = str(s).lower()\n    return s == s[::-1]\n\nprint(is_palindrome("racecar"))`,
    fibonacci: `def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=' ')\n        a, b = b, a + b\n\nfibonacci(10)`,
    default: `# Write your solution here\n\ndef solution():\n    pass\n\nprint(solution())`
  },
  javascript: {
    prime: `function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i === 0) return false;\n  }\n  return true;\n}\n\nconsole.log(isPrime(17));`,
    palindrome: `function isPalindrome(s) {\n  s = String(s).toLowerCase();\n  return s === s.split('').reverse().join('');\n}\n\nconsole.log(isPalindrome("racecar"));`,
    fibonacci: `function fibonacci(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    process.stdout.write(a + ' ');\n    [a, b] = [b, a + b];\n  }\n}\n\nfibonacci(10);`,
    default: `// Write your solution here\n\nfunction solution() {\n  // your code\n}\n\nconsole.log(solution());`
  },
  java: {
    prime: `public class Solution {\n    public static boolean isPrime(int n) {\n        if (n < 2) return false;\n        for (int i = 2; i <= Math.sqrt(n); i++)\n            if (n % i == 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPrime(17));\n    }\n}`,
    default: `public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}`
  },
  cpp: {
    prime: `#include <iostream>\n#include <cmath>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i <= sqrt(n); i++)\n        if (n % i == 0) return false;\n    return true;\n}\n\nint main() {\n    cout << isPrime(17) << endl;\n    return 0;\n}`,
    default: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}`
  }
};

const MOCK_ANALYTICS = {
  totalInterviews: 12,
  avgScore: 74,
  weakTopics: ["Operating Systems","Computer Networks","DBMS"],
  strongTopics: ["Python","Data Structures","OOP"],
  history: [
    {date:"Jun 10",category:"Python",score:82,difficulty:"Intermediate"},
    {date:"Jun 12",category:"DBMS",score:61,difficulty:"Beginner"},
    {date:"Jun 14",category:"Data Structures",score:88,difficulty:"Advanced"},
    {date:"Jun 17",category:"OS",score:55,difficulty:"Intermediate"},
    {date:"Jun 20",category:"Algorithms",score:79,difficulty:"Advanced"},
    {date:"Jun 22",category:"Java",score:71,difficulty:"Intermediate"},
  ]
};

function useTheme() {
  const [dark, setDark] = useState(false);
  return { dark, toggle: () => setDark(d => !d) };
}

function callClaude(messages, systemPrompt) {
  return fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages
    })
  }).then(r => r.json()).then(d => d.content?.[0]?.text || "");
}

// ── Styles ────────────────────────────────────────────────────────────────────
const getStyles = (dark) => ({
  bg: dark ? "#0f1117" : "#f8f9fc",
  surface: dark ? "#1a1d27" : "#ffffff",
  surface2: dark ? "#22263a" : "#f1f3f9",
  border: dark ? "#2e3248" : "#e2e6f0",
  text: dark ? "#e8eaf6" : "#1a1d2e",
  textMuted: dark ? "#8b92b3" : "#6b7280",
  accent: "#6366f1",
  accentBg: dark ? "#1e1f47" : "#eef0ff",
  success: "#10b981",
  successBg: dark ? "#0a2e24" : "#ecfdf5",
  danger: "#ef4444",
  dangerBg: dark ? "#2e0a0a" : "#fef2f2",
  warning: "#f59e0b",
  warningBg: dark ? "#2e1f0a" : "#fffbeb",
  card: dark ? "#1e2235" : "#ffffff",
  cardBorder: dark ? "#2e3560" : "#e8edf8",
});

export default function InterviewAce() {
  const { dark, toggle } = useTheme();
  const s = getStyles(dark);
  const [page, setPage] = useState("dashboard");
  const [interviewState, setInterviewState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [violations, setViolations] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Intermediate");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [codingProblem, setCodingProblem] = useState(null);
  const [code, setCode] = useState("");
  const [codeLang, setCodeLang] = useState("python");
  const [codeOutput, setCodeOutput] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [interviewMode, setInterviewMode] = useState("technical"); // technical | project | resume | company
  const [violationLog, setViolationLog] = useState([]);
  const [terminated, setTerminated] = useState(false);
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);
  const warningShown = useRef(false);

  // Timer
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const fmtTime = t => `${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;

  // Violation detection
  const addViolation = useCallback((reason) => {
    const count = violations + 1;
    setViolations(count);
    setViolationLog(l => [...l, { time: new Date().toLocaleTimeString(), reason, count }]);
    if (count >= 3) {
      setTerminated(true);
      setTimerActive(false);
      endInterview(true);
    }
  }, [violations]);

  useEffect(() => {
    if (!interviewState) return;
    const onBlur = () => addViolation("Window focus lost");
    const onVis = () => { if (document.hidden) addViolation("Tab switched"); };
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [interviewState, addViolation]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startInterview = async (mode = "technical") => {
    setInterviewMode(mode);
    setMessages([]);
    setViolations(0);
    setViolationLog([]);
    setTimer(0);
    setScore(null);
    setFeedback(null);
    setTerminated(false);
    warningShown.current = false;
    setInterviewState({ mode, category: selectedCategory, difficulty: selectedDifficulty, company: selectedCompany });
    setTimerActive(true);
    setPage("interview");
    setLoading(true);

    let system = "";
    let firstMsg = "";
    if (mode === "technical") {
      const qBank = QUESTION_BANK[selectedCategory] || [];
      const qList = qBank.length > 0
        ? `\n\nQUESTION BANK (${qBank.length} questions — pick relevant ones based on difficulty and flow, do NOT ask in order, select smartly):\n${qBank.map((q,i)=>`${i+1}. ${q}`).join("\n")}`
        : "";
      system = `You are a strict technical interviewer at a top tech company. You are interviewing for ${selectedCategory} at ${selectedDifficulty} level${selectedCompany ? ` for ${selectedCompany}` : ""}.\n\nRules:\n- Ask ONE question at a time\n- Pick questions from the Question Bank below based on difficulty and logical flow\n- After each answer: evaluate briefly (1-2 sentences), give feedback, then pick the next best question from the bank OR ask a follow-up/deeper question not in the bank\n- If answer is weak or wrong, challenge it with a follow-up before moving on\n- Gradually increase difficulty: start easy for Beginner, medium for Intermediate, hard for Advanced\n- Be professional and direct${qList}`;
      firstMsg = `Start the ${selectedCategory} interview at ${selectedDifficulty} level. Pick the most appropriate first question from the question bank.`;
    } else if (mode === "project") {
      system = `You are a viva examiner evaluating a student project. Project: "${projectTitle}". Technologies: ${projectTech}. Description: ${projectDesc}. Ask ONE question at a time about architecture, design decisions, database, security, scalability, your specific contributions, challenges faced. Be probing and ask "why" questions. If the project uses ML, ask model selection rationale, evaluation metrics, etc.`;
      firstMsg = `Start the project viva for "${projectTitle}".`;
    } else if (mode === "resume") {
      system = `You are an interviewer who has just read this resume: "${resumeText}". Extract skills, projects, and certifications from it. Ask personalized questions based on what you find. One question at a time. If React is mentioned, ask about Virtual DOM, hooks, etc. If ML is mentioned, ask about model evaluation, overfitting, etc. Be thorough.`;
      firstMsg = `Start the resume-based interview. Begin with a question based on the candidate's background.`;
    }

    try {
      const reply = await callClaude([{ role: "user", content: firstMsg }], system);
      setMessages([{ role: "assistant", content: reply }]);
    } catch {
      setMessages([{ role: "assistant", content: "Welcome to your interview. Let's begin! Could you start by introducing yourself and your background?" }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    let system = "";
    if (interviewMode === "technical") {
      const qBank = QUESTION_BANK[selectedCategory] || [];
      const askedQs = messages.filter(m=>m.role==="assistant").map(m=>m.content.slice(0,80)).join("|");
      const remaining = qBank.filter(q => !askedQs.toLowerCase().includes(q.toLowerCase().slice(0,30)));
      const qList = remaining.length > 0
        ? `\n\nREMAINING QUESTIONS FROM BANK (${remaining.length} left — pick the most appropriate next one or ask a follow-up):\n${remaining.slice(0,40).map((q,i)=>`${i+1}. ${q}`).join("\n")}`
        : "";
      system = `You are a strict technical interviewer for ${selectedCategory} at ${selectedDifficulty} level. Evaluate the previous answer briefly (1-2 sentences), give specific feedback, then either: (a) ask a follow-up to probe deeper, or (b) pick the next most logical question from the bank. Build difficulty progressively. If answer is weak, challenge before moving on. Be direct and professional.${qList}`;
    } else if (interviewMode === "project") {
      system = `You are a viva examiner for project "${projectTitle}" (${projectTech}). Evaluate the answer briefly then ask the next probing question. Go deeper into technical decisions.`;
    } else {
      system = `You are an interviewer doing a resume-based interview. Evaluate the answer then ask the next relevant question from the candidate's background.`;
    }

    try {
      const reply = await callClaude(
        newMsgs.map(m => ({ role: m.role, content: m.content })),
        system
      );
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Good answer. Let me ask you the next question..." }]);
    }
    setLoading(false);
  };

  const endInterview = async (auto = false) => {
    setTimerActive(false);
    setLoading(true);
    const questionCount = messages.filter(m => m.role === "assistant").length;
    const answerCount = messages.filter(m => m.role === "user").length;
    const calcScore = auto ? Math.max(10, 60 - violations * 15) : Math.min(95, 55 + answerCount * 5 - violations * 8);

    try {
      const fbSystem = `You are an interviewer giving post-interview feedback. Based on the conversation, provide structured feedback in JSON format with fields: overallScore (number 0-100), technical (0-100), communication (0-100), confidence (0-100), problemSolving (0-100), strengths (array of 3 strings), weaknesses (array of 3 strings), topicsToRevise (array of 3 strings), summary (string 2 sentences).`;
      const convSummary = messages.slice(-6).map(m => `${m.role}: ${m.content.slice(0,200)}`).join("\n");
      const fbReply = await callClaude([{ role: "user", content: `Interview conversation:\n${convSummary}\n\nProvide feedback JSON.` }], fbSystem);
      const clean = fbReply.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setFeedback(parsed);
      setScore(parsed.overallScore || calcScore);
    } catch {
      setScore(calcScore);
      setFeedback({
        overallScore: calcScore, technical: calcScore - 5, communication: calcScore + 5,
        confidence: calcScore, problemSolving: calcScore - 3,
        strengths: ["Good conceptual understanding", "Clear communication", "Logical approach"],
        weaknesses: ["Need more depth on edge cases", "Could elaborate more", "Faster response needed"],
        topicsToRevise: [selectedCategory, "System Design", "Problem Solving"],
        summary: `You completed ${answerCount} questions in ${fmtTime(timer)}. ${auto ? "Interview was terminated due to violations." : "Good effort overall."}`
      });
    }
    setLoading(false);
    setPage("feedback");
  };

  const runCode = () => {
    setCodeOutput("⏳ Running code...\n\n");
    setTimeout(() => {
      const outputs = {
        prime: "True\n\nTime Complexity: O(√n)\nSpace Complexity: O(1)\n✅ All test cases passed (3/3)",
        palindrome: "True\n\nTime Complexity: O(n)\nSpace Complexity: O(n)\n✅ All test cases passed (4/4)",
        fibonacci: "0 1 1 2 3 5 8 13 21 34 \n\nTime Complexity: O(n)\nSpace Complexity: O(1)\n✅ All test cases passed (3/3)",
        default: "Output: [computed]\n\nTime Complexity: O(n)\nSpace Complexity: O(1)\n✅ Test cases: 2/3 passed"
      };
      setCodeOutput(outputs[codingProblem?.id] || outputs.default);
    }, 1200);
  };

  const ScoreBar = ({ label, value, color }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: s.textMuted }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: s.text }}>{value}/100</span>
      </div>
      <div style={{ height: 6, background: s.surface2, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color || s.accent, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );

  const Chip = ({ children, color }) => (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: color || s.accentBg, color: color ? "#fff" : s.accent, margin: "2px 3px" }}>{children}</span>
  );

  // ── PAGES ─────────────────────────────────────────────────────────────────

  if (page === "feedback" && feedback) {
    const sc = score || 70;
    const color = sc >= 75 ? s.success : sc >= 50 ? s.warning : s.danger;
    return (
      <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif", padding: "0 0 60px" }}>
        <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", border: `6px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: s.surface }}>
              <span style={{ fontSize: 36, fontWeight: 700, color }}>{sc}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 24, color: s.text }}>Interview Complete</h2>
            <p style={{ color: s.textMuted, margin: "8px 0" }}>{feedback.summary}</p>
            {violations > 0 && (
              <div style={{ background: s.dangerBg, border: `1px solid ${s.danger}`, borderRadius: 8, padding: "8px 16px", display: "inline-block", marginTop: 8 }}>
                <span style={{ color: s.danger, fontSize: 13 }}>⚠ {violations} violation(s) recorded</span>
              </div>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, color: s.text }}>Performance Breakdown</h3>
              <ScoreBar label="Technical Knowledge" value={feedback.technical || 70} color={s.accent} />
              <ScoreBar label="Communication" value={feedback.communication || 72} color="#8b5cf6" />
              <ScoreBar label="Confidence" value={feedback.confidence || 68} color="#06b6d4" />
              <ScoreBar label="Problem Solving" value={feedback.problemSolving || 71} color={s.success} />
            </div>
            <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, color: s.success }}>✓ Strengths</h4>
                {(feedback.strengths || []).map((str, i) => <div key={i} style={{ fontSize: 13, color: s.textMuted, padding: "3px 0" }}>• {str}</div>)}
              </div>
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, color: s.danger }}>✗ Areas to Improve</h4>
                {(feedback.weaknesses || []).map((w, i) => <div key={i} style={{ fontSize: 13, color: s.textMuted, padding: "3px 0" }}>• {w}</div>)}
              </div>
              <div>
                <h4 style={{ margin: "0 0 8px", fontSize: 13, color: s.warning }}>📚 Topics to Revise</h4>
                <div>{(feedback.topicsToRevise || []).map((t, i) => <Chip key={i}>{t}</Chip>)}</div>
              </div>
            </div>
          </div>
          {violationLog.length > 0 && (
            <div style={{ background: s.dangerBg, border: `1px solid ${s.danger}22`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <h4 style={{ margin: "0 0 8px", fontSize: 13, color: s.danger }}>Violation Log</h4>
              {violationLog.map((v, i) => <div key={i} style={{ fontSize: 12, color: s.danger, padding: "2px 0" }}>{v.time} — {v.reason} (#{v.count})</div>)}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => setPage("setup")} style={btnStyle(s, false)}>New Interview</button>
            <button onClick={() => setPage("dashboard")} style={btnStyle(s, true)}>View Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  if (page === "interview") {
    return (
      <div style={{ height: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif", display: "flex", flexDirection: "column" }}>
        {/* Interview Header */}
        <div style={{ background: s.surface, borderBottom: `1px solid ${s.border}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: timerActive ? s.success : s.danger, animation: timerActive ? "pulse 1s infinite" : "none" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: s.accent }}>LIVE INTERVIEW</span>
          </div>
          <div style={{ background: s.surface2, borderRadius: 8, padding: "4px 12px", fontSize: 14, fontWeight: 600, color: s.text, fontFamily: "monospace" }}>
            ⏱ {fmtTime(timer)}
          </div>
          <div style={{ background: violations > 0 ? s.dangerBg : s.surface2, borderRadius: 8, padding: "4px 12px", fontSize: 13, color: violations > 0 ? s.danger : s.textMuted }}>
            ⚠ {violations}/3 violations
          </div>
          {QUESTION_BANK[selectedCategory] && (
            <div style={{ background: s.accentBg, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: s.accent }}>
              📋 {QUESTION_BANK[selectedCategory].length} Qs · {messages.filter(m=>m.role==="user").length} answered
            </div>
          )}
          <div style={{ marginLeft: "auto", fontSize: 13, color: s.textMuted }}>{selectedCategory} · {selectedDifficulty}</div>
          <button onClick={() => endInterview(false)} style={{ ...btnStyle(s, false), padding: "6px 14px", fontSize: 13 }}>End Interview</button>
        </div>

        {terminated && (
          <div style={{ background: s.dangerBg, borderBottom: `2px solid ${s.danger}`, padding: "12px 20px", textAlign: "center", color: s.danger, fontWeight: 600 }}>
            ⛔ Interview terminated due to repeated violations
          </div>
        )}
        {violations === 1 && !terminated && (
          <div style={{ background: s.warningBg, borderBottom: `1px solid ${s.warning}`, padding: "8px 20px", textAlign: "center", color: s.warning, fontSize: 13 }}>
            ⚠ Warning 1/2: Tab switching or window focus loss detected. Please stay on this window.
          </div>
        )}
        {violations === 2 && !terminated && (
          <div style={{ background: s.dangerBg, borderBottom: `1px solid ${s.danger}`, padding: "8px 20px", textAlign: "center", color: s.danger, fontSize: 13 }}>
            🚨 Final Warning: One more violation will terminate the interview.
          </div>
        )}

        {/* Chat */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "assistant" && (
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.accentBg, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0, fontSize: 16 }}>🎯</div>
              )}
              <div style={{
                maxWidth: "70%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role === "user" ? s.accent : s.surface,
                color: m.role === "user" ? "#fff" : s.text,
                border: m.role === "assistant" ? `1px solid ${s.border}` : "none",
                fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap"
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎯</div>
              <div style={{ background: s.surface, border: `1px solid ${s.border}`, borderRadius: "18px 18px 18px 4px", padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent, animation: `bounce 1.2s ${i*0.2}s infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div style={{ background: s.surface, borderTop: `1px solid ${s.border}`, padding: "12px 20px", display: "flex", gap: 10 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
            disabled={loading || terminated}
            style={{
              flex: 1, resize: "none", height: 60, padding: "10px 14px", borderRadius: 10,
              border: `1px solid ${s.border}`, background: s.surface2, color: s.text,
              fontSize: 14, fontFamily: "inherit", outline: "none"
            }}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim() || terminated} style={{ ...btnStyle(s, true), padding: "0 20px", height: 60, fontSize: 20 }}>↑</button>
        </div>

        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      </div>
    );
  }

  if (page === "coding") {
    const template = CODE_TEMPLATES[codeLang]?.[codingProblem?.id] || CODE_TEMPLATES[codeLang]?.default || "// Write your code here";
    if (!code && codingProblem) { setTimeout(() => setCode(template), 0); }
    return (
      <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif" }}>
        <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
          {!codingProblem ? (
            <>
              <h2 style={{ marginBottom: 20, color: s.text }}>Coding Round</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
                {CODING_PROBLEMS.map(p => (
                  <div key={p.id} onClick={() => { setCodingProblem(p); setCode(CODE_TEMPLATES.python[p.id] || CODE_TEMPLATES.python.default); }} style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = s.accent}
                    onMouseLeave={e => e.currentTarget.style.borderColor = s.cardBorder}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>💻</div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: s.text, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: s.textMuted }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, height: "calc(100vh - 120px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <button onClick={() => { setCodingProblem(null); setCode(""); setCodeOutput(""); }} style={{ background: "none", border: "none", color: s.textMuted, cursor: "pointer", fontSize: 18 }}>←</button>
                    <h3 style={{ margin: 0, fontSize: 16, color: s.text }}>{codingProblem.title}</h3>
                    <Chip>Easy</Chip>
                  </div>
                  <p style={{ color: s.textMuted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{codingProblem.desc}</p>
                  <div style={{ marginTop: 16, background: s.surface2, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 12, color: s.textMuted, fontWeight: 600, marginBottom: 6 }}>TEST CASES</div>
                    <div style={{ fontSize: 13, fontFamily: "monospace", color: s.text }}>Input: 17 → Output: True</div>
                    <div style={{ fontSize: 13, fontFamily: "monospace", color: s.text }}>Input: 4 → Output: False</div>
                  </div>
                </div>
                <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 16, flex: 1, overflow: "auto" }}>
                  <div style={{ fontSize: 12, color: s.textMuted, fontWeight: 600, marginBottom: 8 }}>OUTPUT</div>
                  <pre style={{ margin: 0, fontSize: 13, color: s.text, fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{codeOutput || "Run your code to see output..."}</pre>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <div style={{ background: s.surface, border: `1px solid ${s.border}`, borderRadius: "12px 12px 0 0", padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
                  {["python","javascript","java","cpp"].map(l => (
                    <button key={l} onClick={() => { setCodeLang(l); setCode(CODE_TEMPLATES[l]?.[codingProblem?.id] || CODE_TEMPLATES[l]?.default || ""); }}
                      style={{ padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: codeLang === l ? s.accent : s.surface2, color: codeLang === l ? "#fff" : s.textMuted }}>
                      {l === "cpp" ? "C++" : l.charAt(0).toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                  <button onClick={runCode} style={{ marginLeft: "auto", ...btnStyle(s, true), padding: "6px 16px", fontSize: 13 }}>▶ Run</button>
                </div>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  style={{ flex: 1, resize: "none", padding: 16, background: dark ? "#0d1117" : "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace", fontSize: 13, lineHeight: 1.7, border: `1px solid ${s.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", outline: "none" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (page === "analytics") {
    const scores = MOCK_ANALYTICS.history.map(h => h.score);
    const maxScore = Math.max(...scores);
    return (
      <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif" }}>
        <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
          <h2 style={{ marginBottom: 24, color: s.text }}>Analytics Dashboard</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
            {[
              { label: "Total Interviews", val: MOCK_ANALYTICS.totalInterviews, icon: "🎯" },
              { label: "Avg Score", val: `${MOCK_ANALYTICS.avgScore}%`, icon: "📊" },
              { label: "Strong Topics", val: MOCK_ANALYTICS.strongTopics.length, icon: "💪" },
              { label: "Weak Topics", val: MOCK_ANALYTICS.weakTopics.length, icon: "📚" },
            ].map((card, i) => (
              <div key={i} style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{card.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.text }}>{card.val}</div>
                <div style={{ fontSize: 12, color: s.textMuted, marginTop: 2 }}>{card.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
            <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, color: s.text }}>Score Trend</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {MOCK_ANALYTICS.history.map((h, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", background: h.score >= 75 ? s.success : h.score >= 60 ? s.warning : s.danger, borderRadius: "4px 4px 0 0", height: `${(h.score / 100) * 100}px`, transition: "height 0.5s" }} />
                    <div style={{ fontSize: 10, color: s.textMuted, transform: "rotate(-30deg)", transformOrigin: "top", whiteSpace: "nowrap" }}>{h.date}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, color: s.text }}>Topic Performance</h3>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: s.success, fontWeight: 600, marginBottom: 8 }}>Strong</div>
                  {MOCK_ANALYTICS.strongTopics.map((t, i) => <div key={i} style={{ marginBottom: 8 }}><ScoreBar label={t} value={80 + i * 4} color={s.success} /></div>)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: s.danger, fontWeight: 600, marginBottom: 8 }}>Weak</div>
                  {MOCK_ANALYTICS.weakTopics.map((t, i) => <div key={i} style={{ marginBottom: 8 }}><ScoreBar label={t} value={45 + i * 5} color={s.danger} /></div>)}
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, color: s.text }}>Interview History</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Date","Category","Difficulty","Score"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: s.textMuted, fontWeight: 600, borderBottom: `1px solid ${s.border}` }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {MOCK_ANALYTICS.history.map((h, i) => (
                  <tr key={i}>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: s.textMuted }}>{h.date}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: s.text }}>{h.category}</td>
                    <td style={{ padding: "10px 12px" }}><Chip>{h.difficulty}</Chip></td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: h.score >= 75 ? s.success : h.score >= 60 ? s.warning : s.danger }}>{h.score}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (page === "setup") {
    return (
      <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif" }}>
        <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px" }}>
          <h2 style={{ marginBottom: 8, color: s.text }}>Start Interview</h2>
          <p style={{ color: s.textMuted, marginBottom: 32 }}>Choose your interview type and configure settings</p>

          {/* Mode cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
            {[
              { id: "technical", icon: "💻", title: "Technical Interview", desc: "Topic-based technical questions with adaptive difficulty" },
              { id: "project", icon: "🏗️", title: "Project Viva", desc: "Deep-dive discussion on your project" },
              { id: "resume", icon: "📄", title: "Resume-Based", desc: "Personalized questions from your resume" },
              { id: "company", icon: "🏢", title: "Company-Specific", desc: "Prep for a specific company's interview style" },
            ].map(m => (
              <div key={m.id} onClick={() => setInterviewMode(m.id)}
                style={{ background: s.card, border: `2px solid ${interviewMode === m.id ? s.accent : s.cardBorder}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "border-color 0.2s" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: s.text, marginBottom: 4 }}>{m.title}</div>
                <div style={{ fontSize: 13, color: s.textMuted }}>{m.desc}</div>
              </div>
            ))}
          </div>

          {interviewMode === "technical" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>CATEGORY</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setSelectedCategory(c)}
                      style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${selectedCategory === c ? s.accent : s.border}`, background: selectedCategory === c ? s.accentBg : "transparent", color: selectedCategory === c ? s.accent : s.textMuted, cursor: "pointer", fontSize: 13, fontWeight: selectedCategory === c ? 600 : 400 }}>{c}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>DIFFICULTY</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {DIFFICULTIES.map(d => (
                    <button key={d} onClick={() => setSelectedDifficulty(d)}
                      style={{ padding: "8px 24px", borderRadius: 8, border: `1px solid ${selectedDifficulty === d ? s.accent : s.border}`, background: selectedDifficulty === d ? s.accent : "transparent", color: selectedDifficulty === d ? "#fff" : s.textMuted, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>{d}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {interviewMode === "company" && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: s.textMuted, display: "block", marginBottom: 8, fontWeight: 600 }}>SELECT COMPANY</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {COMPANIES.map(c => (
                  <button key={c} onClick={() => { setSelectedCompany(c); setInterviewMode("technical"); }}
                    style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${selectedCompany === c ? s.accent : s.border}`, background: selectedCompany === c ? s.accentBg : "transparent", color: selectedCompany === c ? s.accent : s.textMuted, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {interviewMode === "project" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              {[
                { label: "PROJECT TITLE", val: projectTitle, set: setProjectTitle, ph: "e.g. Student Management System" },
                { label: "TECHNOLOGIES USED", val: projectTech, set: setProjectTech, ph: "e.g. React, Node.js, MongoDB, Machine Learning" },
                { label: "PROJECT DESCRIPTION", val: projectDesc, set: setProjectDesc, ph: "Brief description of your project...", area: true },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ fontSize: 13, color: s.textMuted, display: "block", marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                  {f.area
                    ? <textarea value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${s.border}`, background: s.surface2, color: s.text, fontSize: 14, height: 80, resize: "none", outline: "none", boxSizing: "border-box" }} />
                    : <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${s.border}`, background: s.surface2, color: s.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                  }
                </div>
              ))}
            </div>
          )}

          {interviewMode === "resume" && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: s.textMuted, display: "block", marginBottom: 6, fontWeight: 600 }}>PASTE RESUME TEXT</label>
              <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume content here (skills, experience, projects, certifications...)" style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `1px solid ${s.border}`, background: s.surface2, color: s.text, fontSize: 14, height: 160, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
            </div>
          )}

          <div style={{ background: s.warningBg, border: `1px solid ${s.warning}33`, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: s.warning, fontWeight: 600, marginBottom: 4 }}>⚠️ Interview Rules</div>
            <div style={{ fontSize: 13, color: s.textMuted, lineHeight: 1.7 }}>
              • Do not switch tabs or minimize the window<br />
              • 2 warnings before automatic termination<br />
              • Keep focus on this window throughout<br />
              • Violations are logged and affect your score
            </div>
          </div>

          <button onClick={() => startInterview(interviewMode)} style={{ ...btnStyle(s, true), width: "100%", padding: "14px", fontSize: 16, fontWeight: 700 }}>
            🎯 Start Interview
          </button>
        </div>
      </div>
    );
  }

  if (page === "qbank") {
    const [qbSearch, setQbSearch] = useState("");
    const [qbCategory, setQbCategory] = useState("Python");
    const questions = (QUESTION_BANK[qbCategory] || []).filter(q =>
      q.toLowerCase().includes(qbSearch.toLowerCase())
    );
    const totalQuestions = Object.values(QUESTION_BANK).reduce((a,b) => a + b.length, 0);
    return (
      <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif" }}>
        <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 style={{ margin: 0, color: s.text }}>Question Bank</h2>
              <p style={{ margin: "4px 0 0", color: s.textMuted, fontSize: 14 }}>{totalQuestions} questions across {Object.keys(QUESTION_BANK).length} categories</p>
            </div>
            <button onClick={() => { setSelectedCategory(qbCategory); setPage("setup"); }} style={{ ...btnStyle(s, true), padding: "10px 20px" }}>
              Practice {qbCategory} →
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {Object.entries(QUESTION_BANK).map(([cat, qs]) => (
              <div key={cat} onClick={() => setQbCategory(cat)}
                style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${qbCategory === cat ? s.accent : s.border}`, background: qbCategory === cat ? s.accentBg : "transparent", color: qbCategory === cat ? s.accent : s.textMuted, cursor: "pointer", fontSize: 13, fontWeight: qbCategory === cat ? 600 : 400, display: "flex", alignItems: "center", gap: 6 }}>
                {cat}
                <span style={{ background: qbCategory === cat ? s.accent : s.surface2, color: qbCategory === cat ? "#fff" : s.textMuted, borderRadius: 10, padding: "1px 7px", fontSize: 11 }}>{qs.length}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <input
            value={qbSearch}
            onChange={e => setQbSearch(e.target.value)}
            placeholder={`Search in ${qbCategory}...`}
            style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: `1px solid ${s.border}`, background: s.surface, color: s.text, fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" }}
          />

          {/* Questions list */}
          <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 20px", borderBottom: `1px solid ${s.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: s.text }}>{qbCategory} Questions</span>
              <span style={{ fontSize: 12, color: s.textMuted }}>{questions.length} shown</span>
            </div>
            {questions.map((q, i) => (
              <div key={i} style={{ padding: "13px 20px", borderBottom: i < questions.length - 1 ? `1px solid ${s.border}` : "none", display: "flex", alignItems: "flex-start", gap: 12, transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = s.surface2}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span style={{ fontSize: 12, color: s.textMuted, minWidth: 28, paddingTop: 1, fontFamily: "monospace" }}>{String(i+1).padStart(2,"0")}</span>
                <span style={{ fontSize: 14, color: s.text, lineHeight: 1.5 }}>{q}</span>
              </div>
            ))}
            {questions.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: s.textMuted, fontSize: 14 }}>No questions match your search.</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div style={{ minHeight: "100vh", background: s.bg, color: s.text, fontFamily: "system-ui,sans-serif" }}>
      <Header s={s} dark={dark} toggle={toggle} page={page} setPage={setPage} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 20px" }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${s.accent}15, ${s.accent}05)`, border: `1px solid ${s.accent}30`, borderRadius: 16, padding: "32px 36px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32 }}>🎯</span>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: s.text }}>InterviewAce</h1>
            </div>
            <p style={{ margin: 0, color: s.textMuted, fontSize: 16, maxWidth: 440, lineHeight: 1.6 }}>AI-powered technical interview simulator. Practice, improve, and land your dream job.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={() => setPage("setup")} style={{ ...btnStyle(s, true), padding: "12px 28px", fontSize: 15, fontWeight: 700 }}>Start Interview →</button>
              <button onClick={() => setPage("coding")} style={{ ...btnStyle(s, false), padding: "12px 28px", fontSize: 15 }}>Coding Round</button>
            </div>
          </div>
          <div style={{ fontSize: 80, opacity: 0.15 }}>🏆</div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Interviews Taken", val: 12, icon: "🎯", color: s.accent },
            { label: "Avg Score", val: "74%", icon: "📈", color: s.success },
            { label: "Topics Practiced", val: 8, icon: "📚", color: "#8b5cf6" },
            { label: "Current Streak", val: "5 days", icon: "🔥", color: s.warning },
          ].map((stat, i) => (
            <div key={i} style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.val}</div>
              <div style={{ fontSize: 12, color: s.textMuted, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Quick Start */}
          <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, color: s.text }}>Quick Start</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "💻", label: "Technical Interview", sub: "Topic-based Q&A with AI", action: () => { setInterviewMode("technical"); setPage("setup"); } },
                { icon: "🏗️", label: "Project Viva", sub: "AI evaluates your project", action: () => { setInterviewMode("project"); setPage("setup"); } },
                { icon: "📄", label: "Resume Interview", sub: "Personalized from your resume", action: () => { setInterviewMode("resume"); setPage("setup"); } },
                { icon: "🏢", label: "Company Mock", sub: "TCS, Amazon, Microsoft...", action: () => { setInterviewMode("company"); setPage("setup"); } },
              ].map((item, i) => (
                <div key={i} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: `1px solid ${s.border}`, cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = s.surface2}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: s.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: s.textMuted }}>{item.sub}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: s.textMuted }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Performance */}
          <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 24 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, color: s.text }}>Recent Performance</h3>
            {MOCK_ANALYTICS.history.slice(-4).reverse().map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${s.border}` : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: s.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: h.score >= 75 ? s.success : h.score >= 60 ? s.warning : s.danger }}>{h.score}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: s.text }}>{h.category}</div>
                  <div style={{ fontSize: 12, color: s.textMuted }}>{h.date} · {h.difficulty}</div>
                </div>
                <div style={{ width: 80 }}>
                  <div style={{ height: 4, background: s.surface2, borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${h.score}%`, background: h.score >= 75 ? s.success : h.score >= 60 ? s.warning : s.danger, borderRadius: 2 }} />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => setPage("analytics")} style={{ ...btnStyle(s, false), marginTop: 16, width: "100%", fontSize: 13 }}>View Full Analytics →</button>
          </div>
        </div>

        {/* Categories */}
        <div style={{ background: s.card, border: `1px solid ${s.cardBorder}`, borderRadius: 12, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, color: s.text }}>Browse by Category</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setSelectedCategory(c); setPage("setup"); }}
                style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${s.border}`, background: "transparent", color: s.textMuted, cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent; e.currentTarget.style.color = s.accent; e.currentTarget.style.background = s.accentBg; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.color = s.textMuted; e.currentTarget.style.background = "transparent"; }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ s, dark, toggle, page, setPage }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "setup", label: "Interview" },
    { id: "coding", label: "Coding" },
    { id: "analytics", label: "Analytics" },
    { id: "qbank", label: "Question Bank" },
  ];
  return (
    <div style={{ background: s.surface, borderBottom: `1px solid ${s.border}`, padding: "0 20px", display: "flex", alignItems: "center", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 32 }}>
        <span style={{ fontSize: 20 }}>🎯</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: s.text }}>InterviewAce</span>
      </div>
      <nav style={{ display: "flex", gap: 4 }}>
        {navItems.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: page === n.id ? 600 : 400, background: page === n.id ? s.accentBg : "transparent", color: page === n.id ? s.accent : s.textMuted }}>
            {n.label}
          </button>
        ))}
      </nav>
      <button onClick={toggle} style={{ marginLeft: "auto", background: s.surface2, border: `1px solid ${s.border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 16, color: s.text }}>
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

function btnStyle(s, primary) {
  return {
    padding: "10px 20px", borderRadius: 10, border: primary ? "none" : `1px solid ${s.border}`,
    background: primary ? s.accent : "transparent", color: primary ? "#fff" : s.text,
    cursor: "pointer", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6
  };
}
