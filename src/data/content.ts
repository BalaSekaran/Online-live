/**
 * Section content for the Online Full Stack page, transcribed from the live
 * page (errormakesclever.com, snapshot 2026-10-22). Typos fixed; nothing added.
 * Strings starting with "[NEEDS INPUT" render as visible placeholders.
 */
import type { IconName } from "@/components/ui/Icon";

type Tone = "yellow" | "sky" | "mint" | "blue" | "sun" | "ink" | "cream" | "pink";

/* Hero fact tiles — the six facts from the live hero strip */
export const heroFacts: { icon: IconName; title: string; sub: string; tone: Tone }[] = [
  { icon: "users", title: "Top Industry", sub: "Mentors", tone: "yellow" },
  { icon: "layers", title: "11+ Top", sub: "Technologies", tone: "sky" },
  { icon: "code", title: "10+ Real-Time", sub: "Projects", tone: "mint" },
  { icon: "sparkles", title: "AI-Powered", sub: "Smarter learning", tone: "blue" },
  { icon: "infinity", title: "Lifetime", sub: "Community access", tone: "pink" },
  { icon: "gift", title: "No-Cost EMI", sub: "Available", tone: "cream" },
];

/* About — "About EMC Full Stack Development Bootcamp with AI" */
export const aboutCards: { icon: IconName; title: string; body: string; tone: Tone }[] = [
  { icon: "zap", title: "Tech Simplified", body: "Complex tech concepts simplified using real-world examples.", tone: "yellow" },
  { icon: "layers", title: "Practical Learning", body: "Well-structured curriculum with hands-on, real-time projects.", tone: "mint" },
  { icon: "sparkles", title: "AI-Powered", body: "AI-integrated modules for modern development workflows.", tone: "blue" },
  { icon: "video", title: "Learn Anytime", body: "Weekly recorded sessions to learn at your own pace.", tone: "sky" },
  { icon: "clock", title: "Live Mentorship", body: "Live weekend classes led by top industry mentors.", tone: "sun" },
  { icon: "users", title: "Collaborative Learning", body: "Hackathons and collaborative group activities for practical exposure.", tone: "pink" },
];

/* The AI Learning Advantage */
export const aiAdvantage: { icon: IconName; title: string; body: string; tone: Tone }[] = [
  { icon: "star", title: "Learn Faster with AI", body: "AI-powered hints and code suggestions accelerate your learning curve dramatically.", tone: "blue" },
  { icon: "bug", title: "Smart Debugging", body: "Master AI-assisted debugging to find and fix issues in minutes, not hours.", tone: "yellow" },
  { icon: "code", title: "Code Optimization", body: "Use AI tools to write cleaner, faster, production-grade code every day.", tone: "mint" },
  { icon: "repeat", title: "Real Workflow Training", body: "Practice the exact AI workflows used by developers at top companies.", tone: "sky" },
];

/* Curriculum — "Here's what you'll be Learning" (Core Modules tab) */
export type Module = { n: number; title: string; lessons: number; topics?: string[] };
export const coreModules: Module[] = [
  {
    n: 1,
    title: "Introduction to Full Stack Web Development",
    lessons: 5,
    topics: [
      "Key concepts and tools in web development",
      "Frontend and backend technologies overview",
      "Industry standards and best practices",
      "Development environment setup",
      "Career path and opportunities",
    ],
  },
  { n: 2, title: "Implementing HTML & CSS to Build a Udemy Clone", lessons: 6 },
  { n: 3, title: "Mastering Tailwind CSS by Realtime Project", lessons: 5 },
  { n: 4, title: "Integrating JavaScript with Greenden E-commerce Project", lessons: 6 },
  { n: 5, title: "API Integration Techniques with Weather App Building", lessons: 5 },
  { n: 6, title: "React Mastery with Actodo Project", lessons: 6 },
  { n: 7, title: "Learn Node.js & Express with Realtime Project", lessons: 6 },
  { n: 8, title: "Understand and Build Applications using MongoDB", lessons: 5 },
  { n: 9, title: "Develop Authentication in Your Application using Firebase", lessons: 5 },
  { n: 10, title: "Professional Placement Preparation", lessons: 5 },
  { n: 11, title: "Git and GitHub Mastery", lessons: 5 },
  { n: 12, title: "Capstone Project and Internship", lessons: 5 },
];
export const totalLessons = coreModules.reduce((s, m) => s + m.lessons, 0);

/* Mentors' companies — "Learn Full Stack Web Development from mentors who have worked with companies like" */
export const mentorCompanies = ["Zoho", "Accenture", "Intel", "Vimeo", "Aspire Systems", "VanEck", "Wells Fargo"];

/* Tools Covered — "Master 12+ Tools Directly from Top Industry Experts".
   The live page's tool grid did not render in the snapshot, so this list is
   derived from the module titles only. Confirm the full 12+ list. */
export const tools: { name: string; group: "Front-end" | "Back-end" | "Workflow"; mono: string; tone: Tone }[] = [
  { name: "HTML", group: "Front-end", mono: "<>", tone: "yellow" },
  { name: "CSS", group: "Front-end", mono: "{}", tone: "sky" },
  { name: "Tailwind CSS", group: "Front-end", mono: "tw", tone: "mint" },
  { name: "JavaScript", group: "Front-end", mono: "JS", tone: "sun" },
  { name: "React", group: "Front-end", mono: "⚛", tone: "blue" },
  { name: "REST APIs", group: "Front-end", mono: "↔", tone: "cream" },
  { name: "Node.js", group: "Back-end", mono: "N", tone: "mint" },
  { name: "Express", group: "Back-end", mono: "ex", tone: "ink" },
  { name: "MongoDB", group: "Back-end", mono: "db", tone: "mint" },
  { name: "Firebase Auth", group: "Back-end", mono: "fb", tone: "yellow" },
  { name: "Git", group: "Workflow", mono: "git", tone: "pink" },
  { name: "GitHub", group: "Workflow", mono: "gh", tone: "ink" },
];

/* Testimonials — "What Our Students Say" (live carousel has 15; 2 visible in snapshot) */
export const testimonials: { name: string; role: string; title: string; quote: string; photo?: string | null }[] = [
  {
    name: "Hariharan R",
    role: "Full Stack Developer",
    title: "A strong grip on programming & career confidence",
    quote:
      "From learning to landing a job — my Error Makes Clever journey. When I started, I had one goal: to learn, grow, and secure a great opportunity. Today, I'm thrilled to say mission accomplished! This wouldn't have been possible without John Bro, whose teaching…",
    photo: null,
  },
  {
    name: "A Indhu",
    role: "Software Developer",
    title: "[NEEDS INPUT: testimonial title]",
    quote: "[NEEDS INPUT: full testimonial text — only a fragment is visible on the live page]",
    photo: null,
  },
];

/* Where do our students work? — names visible in the snapshot (row is a marquee; list may be longer) */
export const hiringCompanies = ["Resulticks", "Cognizant", "Pickmyad", "Finstein", "Eurofins", "Error Makes Clever", "Instore"];

/* Bootcamp Overview */
export const overview: { icon: IconName; title: string; body: string; tone: Tone }[] = [
  { icon: "trophy", title: "Weekly Reward Programs", body: "Stay motivated with weekly tasks and rewards.", tone: "sky" },
  { icon: "graduation", title: "Internship Opportunity", body: "Get a chance to gain real-world exposure.", tone: "cream" },
  { icon: "sparkles", title: "AI-Integrated Full Stack Curriculum", body: "Master full stack development with AI-driven tools and intelligent automation.", tone: "mint" },
  { icon: "users", title: "Expert Mentorship & Support", body: "Get simple, step-by-step mentor guidance.", tone: "yellow" },
  { icon: "terminal", title: "Hands-on Experience", body: "Build real projects with real code.", tone: "blue" },
  { icon: "briefcase", title: "Placement Assistance", body: "Get support for resumes, portfolios, and jobs.", tone: "pink" },
];

/* Internship */
export const internship = {
  work: "You'll be part of a real full stack project that tests your frontend, backend and problem-solving skills.",
  support:
    "You'll work closely with our developers, get regular feedback, and learn how real teams ship features — with a path to full-time roles (based on performance and availability).",
};

/* How the Journey Looks Like — 11 steps */
export const journey: { icon: IconName; title: string; body: string; tone: Tone; tag?: string }[] = [
  { icon: "phone", title: "Consultation Call", body: "Our team will connect with you to answer all your questions related to the Full Stack course.", tone: "sky", tag: "Free" },
  { icon: "armchair", title: "Pre-Book Your Slot", body: "Pre-book your slot. We take only 25–50 candidates per batch with limited seating.", tone: "mint" },
  { icon: "fileText", title: "Entry-Level Test", body: "After pre-booking, an entry-level test will be conducted. Based on your result, you will move on to the next step.", tone: "yellow" },
  { icon: "book", title: "Start Learning", body: "When the batch starts, you will get access to tutorials, the community, and your mentors. You can start learning immediately.", tone: "sky" },
  { icon: "monitorPlay", title: "Mentor Live Sessions", body: "Live sessions will be conducted by respective mentors every weekend.", tone: "blue" },
  { icon: "trophy", title: "Weekly Rewards", body: "Every week, a reward worth 200 to 500 will be given to the top student of that week.", tone: "mint" },
  { icon: "calendar", title: "Offline Power-Packed Event", body: "As a complimentary, you will get access to a power-packed offline event where you can meet our founder and other top industry professionals.", tone: "pink" },
  { icon: "users", title: "Professional HR Sessions", body: "Online HR sessions will be conducted to prepare your resume, LinkedIn profile, Naukri profile, interview tips, and more.", tone: "cream" },
  { icon: "graduation", title: "Internship Eligibility", body: "Based on your overall performance over the past 90 days and a further interview process, you will get an internship opportunity.", tone: "yellow" },
  { icon: "award", title: "Receive Your Well-Earned Certificate", body: "Upon completing the program, a hard copy of your certificate will be sent to your home.", tone: "pink" },
  { icon: "headset", title: "Lifetime Support", body: "Even after you get placed in a company, we will stay in touch to support and nurture your growth.", tone: "sky" },
];

/* Certificate benefits (live copy said "cloud and DevOps skills" — corrected to full stack) */
export const certBenefits: { title: string; body: string }[] = [
  { title: "Industry-recognised certificate", body: "Validate your full stack development skills with a certificate trusted by top tech companies." },
  { title: "Global recognition", body: "Showcase your proficiency with a certificate that opens doors globally." },
  { title: "Career growth", body: "Boost your career prospects with an accredited certificate recognised by top companies." },
];

/* Recognition */
export const recognition = {
  sub: "Recognised by TED, MIT and Anna University. We have also received a YouTube Award for educating over [NEEDS INPUT: student count — live page shows “6,777,25”] students, and our founder received the Promising Tech Educator Award from Social Eagle.",
  cards: ["YouTube Awards", "TED MIT Awards", "Promising Educator"],
};

/* LinkedIn activity */
export const linkedinPosts: { name: string; initials: string; role: string; text: string; href: string | null }[] = [
  {
    name: "Jovin Rosan",
    initials: "JR",
    role: "Full Stack Developer",
    text: "Just launched a React Weather Web Application! It fetches real-time weather data using an API and displays temperature, location and conditions with dynamic icons and a responsive UI — built with React JS, live weather API integration and React Hooks for state management…",
    href: null,
  },
  {
    name: "Merin Frango",
    initials: "MF",
    role: "Full Stack Developer",
    text: "Excited to share my newly developed Portfolio Website! Built using HTML, CSS and JavaScript with a strong focus on responsive design — modern, minimal UI, smooth scrolling and interactions, fully responsive on mobile, tablet and desktop…",
    href: null,
  },
  {
    name: "Madhina",
    initials: "MD",
    role: "Full Stack Developer",
    text: "Exciting announcement! Happy to share my final project — a Task Management App built using React JS, Express JS, MongoDB and Tailwind CSS. CRUD operations, search & sort, Framer Motion animations and a fully responsive UI. Grateful to Error Makes Clever for this Full Stack Developer journey…",
    href: null,
  },
];

/* Pricing inclusions */
export const inclusions = [
  "AI-Integrated Curriculum",
  "Access to All Live & Recorded Sessions",
  "Learn at Your Own Pace",
  "Lifetime Learning Materials & Updates",
  "Real-World Projects to Build Your Portfolio",
  "Dedicated Mentor Guidance",
  "Exclusive Community & Networking Access",
  "Placement Assistance & Career Support",
  "Certificate of Completion",
  "24×7 Support",
  "No-Cost EMI",
];

/* Soft Skill Training */
export const softSkills: { icon: IconName; title: string; tone: Tone }[] = [
  { icon: "languages", title: "Grammar & Vocabulary Mastery", tone: "yellow" },
  { icon: "target", title: "Goals & Time Efficiency", tone: "mint" },
  { icon: "message", title: "Effective Communication Skills", tone: "pink" },
  { icon: "mic", title: "Mock Interviews & Insights", tone: "sky" },
  { icon: "users", title: "Dynamic Group Discussions", tone: "blue" },
  { icon: "clock", title: "Time Management", tone: "cream" },
];

/* FAQs — questions from the live page; answers were collapsed in the snapshot */
export const faqs: { q: string; a: string }[] = [
  { q: "Will one-to-one mentor support be provided?", a: "[NEEDS INPUT: answer]" },
  { q: "Where will I be able to access video classes?", a: "[NEEDS INPUT: answer]" },
  { q: "How many hours do I have to spend every day for this course?", a: "[NEEDS INPUT: answer]" },
  { q: "I am a working professional — can I take this course?", a: "[NEEDS INPUT: answer]" },
  { q: "Who will be my mentor if I take this course?", a: "[NEEDS INPUT: answer]" },
  { q: "Do you provide a 100% placement guarantee?", a: "[NEEDS INPUT: answer]" },
  { q: "Is No-Cost EMI available for this course?", a: "[NEEDS INPUT: answer]" },
];

/* What Our Students Like Most */
export const likedMost = ["Simplified Teaching", "Weekly Rewards", "Doubt clarification from mentors", "Lifetime community access", "Live classes", "No-Cost EMI"];

/* Footer */
export type FooterLink = { label: string; href: string | null };
export const footer: { title: string; links: FooterLink[] }[] = [
  {
    title: "Our Free Courses",
    links: ["FullStack", "FrontEnd", "Backend", "Python", "Java", "GitHub", "HTML", "CSS", "JavaScript"].map((label) => ({ label, href: null })),
  },
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "https://www.errormakesclever.com/" },
      { label: "Full Stack", href: "#hero-title" },
      { label: "DevOps", href: null },
      { label: "Crash Courses", href: null },
      { label: "Master DSA", href: null },
      { label: "Master AWS", href: null },
      { label: "Blogs", href: null },
    ],
  },
  {
    title: "Error Makes Clever",
    links: ["Contact", "Privacy Policy", "Refund Policy", "Terms of Use", "Student Reviews", "Careers"].map((label) => ({ label, href: null })),
  },
];

export const isPlaceholder = (s: string) => s.startsWith("[NEEDS INPUT");
