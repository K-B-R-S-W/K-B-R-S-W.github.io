import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Twitter } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400"></div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          AI & Data Science
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Engineer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Data Scientist",
  "AI Engineer",
  "ML Developer",
  "Computer Vision Expert",
  "Deep Learning Developer",
  "IoT Solutions Architect",
  "Business Intelligence Analyst",
];
const TECH_STACK = ["Python", "TensorFlow", "PyTorch"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/K-B-R-S-W" },
  { icon: Linkedin, link: "http://www.linkedin.com/in/ravindusankalpa" },
  { icon: Twitter, link: "https://x.com/K_B_R_S_W" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => { AOS.init({ once: true, offset: 10 }); };
    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);



  return (
    <section id="Home" className="bg-[#030014] overflow-hidden px-[5%] lg:px-[10%] pt-10 sm:pt-12 pb-10 sm:pb-16">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left order-1" data-aos="fade-right" data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">{text}</span>
                  <span className="w-[3px] h-6 ml-1 animate-blink bg-gradient-to-t from-[#6366f1] to-[#a855f7]"></span>
                </div>
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                  Data Science graduate passionate about AI, Machine Learning, Deep Learning, Computer Vision and IoT. Building intelligent systems that solve real world problems using cutting edge technology.
                </p>
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (<TechStack key={index} tech={tech} />))}
                </div>
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (<SocialLink key={index} {...social} />))}
                </div>
              </div>
            </div>

            {/* Right Column - AI GIF */}
            <div
              className="w-full lg:w-1/2 flex items-center justify-center order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative group">
                {/* Glow ring behind the GIF */}
                <div className={`absolute -inset-4 bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 rounded-3xl blur-2xl transition-all duration-700 ${isHovering ? "opacity-80 scale-105" : "opacity-40 scale-100"}`}></div>

                {/* Animated border frame */}
                <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-700 ${isHovering ? "opacity-60" : "opacity-20"}`}></div>

                {/* GIF image */}
                <div className="relative rounded-3xl overflow-hidden bg-[#030014]">
                  <img
                    src="/AI.gif"
                    alt="AI Animation"
                    className={`w-[320px] sm:w-[400px] lg:w-[460px] xl:w-[500px] h-auto object-cover transition-all duration-700 ${isHovering ? "scale-105" : "scale-100"}`}
                  />
                  {/* Subtle overlay shimmer on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#6366f1]/10 via-transparent to-[#a855f7]/10 transition-opacity duration-700 ${isHovering ? "opacity-100" : "opacity-0"}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink { 0%, 49%, 100% { opacity: 1 } 50% { opacity: 0 } }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default memo(Home);
