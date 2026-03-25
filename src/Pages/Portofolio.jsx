import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Briefcase, Check } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button onClick={onClick} className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden">
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}`}>
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

ToggleButton.propTypes = { onClick: PropTypes.func.isRequired, isShowingMore: PropTypes.bool.isRequired };

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (<Box sx={{ p: { xs: 1, sm: 3 } }}><Typography component={"div"}>{children}</Typography></Box>)}
    </div>
  );
}

TabPanel.propTypes = { children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired };

function a11yProps(index) {
  return { id: `full-width-tab-${index}`, "aria-controls": `full-width-tabpanel-${index}` };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  if (typeof dateStr === "string" && dateStr.toLowerCase() === "present") return "Present";
  // try to parse ISO date strings like 2025-03-03
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleString("default", { month: "short", year: "numeric" });
}

// ===== FULL TECH STACK =====
const techStacks = [
  // Languages
  { icon: "python.svg",       language: "Python" },
  { icon: "java.svg",         language: "Java" },
  { icon: "rlang.svg",        language: "R" },
  { icon: "javascript.svg",   language: "JavaScript" },
  { icon: "html.svg",         language: "HTML" },
  { icon: "css.svg",          language: "CSS" },
  // AI / ML / DL
  { icon: "tensorflow.svg",   language: "TensorFlow" },
  { icon: "pytorch.svg",      language: "PyTorch" },
  { icon: "keras.svg",        language: "Keras" },
  { icon: "opencv.svg",       language: "OpenCV" },
  { icon: "yolo.svg",         language: "YOLO" },
  { icon: "mediapipe.svg",    language: "MediaPipe" },
  { icon: "hrnet.svg",        language: "HRNet" },
  { icon: "sklearn.svg",      language: "Scikit-Learn" },
  { icon: "huggingface.svg",  language: "Hugging Face" },
  // Data
  { icon: "numpy.svg",        language: "NumPy" },
  { icon: "pandas.svg",       language: "Pandas" },
  { icon: "powerbi.svg",      language: "Power BI" },
  { icon: "mlflow.svg",       language: "MLflow" },
  // Frameworks & Backend
  { icon: "flask.svg",        language: "Flask" },
  { icon: "fastapi.svg",      language: "FastAPI" },
  { icon: "nodejs.svg",       language: "Node.js" },
  { icon: "reactjs.svg",      language: "ReactJS" },
  { icon: "langchain.svg",    language: "LangChain" },
  // Databases
  { icon: "mongodb.svg",      language: "MongoDB" },
  { icon: "mysql.svg",        language: "MySQL" },
  { icon: "firebase.svg",     language: "Firebase" },
  // Tools & DevOps
  { icon: "git.svg",          language: "Git" },
  { icon: "githubicon.svg",   language: "GitHub" },
  { icon: "docker.svg",       language: "Docker" },
  { icon: "jupyter.svg",      language: "Jupyter" },
  { icon: "anaconda.svg",     language: "Anaconda" },
  { icon: "twilio.svg",       language: "Twilio" },
  // IoT & Hardware
  { icon: "esp32.svg",        language: "ESP32" },
  { icon: "arduino.svg",      language: "Arduino" },
  // Other
  { icon: "tailwind.svg",     language: "Tailwind CSS" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [initialItems, setInitialItems] = useState(6);

  useEffect(() => {
    const onResize = () => setInitialItems(window.innerWidth < 768 ? 4 : 6);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { AOS.init({ once: false }); }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");
      const experienceCollection = collection(db, "experience");
      const [projectSnapshot, certificateSnapshot, experienceSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
        getDocs(experienceCollection),
      ]);
      const projectData = projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), TechStack: doc.data().TechStack || [] }));
      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());
      const experienceData = experienceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(projectData);
      setCertificates(certificateData);
      setExperiences(experienceData);
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      localStorage.setItem("experience", JSON.stringify(experienceData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const map = { projects: 0, certificates: 1, experience: 2, techstack: 3 };

    const applyTab = (key) => {
      try {
        if (!key) return;
        const idx = map[key];
        if (typeof idx === "number") setValue(idx);
        localStorage.removeItem("portfolio_tab");
      } catch (e) {
        console.warn("Error applying portfolio_tab", e);
      }
    };

    const applyTabFromStorage = () => applyTab(localStorage.getItem("portfolio_tab"));

    const onStorage = (e) => { if (e.key === "portfolio_tab") applyTab(e.newValue || localStorage.getItem("portfolio_tab")); };
    const onCustom = (e) => { applyTab(e?.detail || (typeof e === "string" ? e : null)); };

    applyTabFromStorage();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", applyTabFromStorage);
    window.addEventListener("portfolio_tab", onCustom);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener("focus", applyTabFromStorage); window.removeEventListener("portfolio_tab", onCustom); };
  }, []);

  const handleChange = (_event, newValue) => setValue(newValue);
  const toggleShowMore = useCallback((type) => {
    if (type === "projects") setShowAllProjects((prev) => !prev);
    else setShowAllCertificates((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <section className="w-full bg-[#030014] overflow-hidden px-[5%] lg:px-[10%] pt-10 sm:pt-12 pb-10 sm:pb-16" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{ color: "#6366f1", backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through AI & ML projects, certifications, and technical expertise.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", position: "relative", overflow: "hidden", "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)", backdropFilter: "blur(10px)", zIndex: 0 } }} className="md:px-4">
            <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant="fullWidth" sx={{ minHeight: "70px", "& .MuiTab-root": { fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: "600", color: "#94a3b8", textTransform: "none", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", padding: "20px 0", zIndex: 1, margin: "8px", borderRadius: "12px", "&:hover": { color: "#ffffff", backgroundColor: "rgba(139, 92, 246, 0.1)", transform: "translateY(-2px)" }, "&.Mui-selected": { color: "#fff", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))", boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)" } }, "& .MuiTabs-indicator": { height: 0 }, "& .MuiTabs-flexContainer": { gap: "8px" } }}>
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Briefcase className="mb-2 w-5 h-5 transition-all duration-300" />} label="Experience" {...a11yProps(2)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div key={project.id || index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <CardProject Img={project.Img} Title={project.Title} Description={project.Description} Link={project.Link} id={project.id} />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (<div className="mt-6 w-full flex justify-start"><ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} /></div>)}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {displayedCertificates.map((certificate, index) => (
                  <div key={index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (<div className="mt-6 w-full flex justify-start"><ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} /></div>)}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {experiences.length === 0 ? (
                  <div className="col-span-full text-center text-gray-400">No experiences added yet.</div>
                ) : (
                  experiences.map((exp, index) => (
                    <div
                      key={exp.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      className="bg-gradient-to-br from-white/4 to-white/2 p-6 rounded-2xl border border-white/10 shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex gap-4">
                        <img
                          src={exp.Img || "https://via.placeholder.com/96?text=Logo"}
                          alt={`${exp.company || 'Company'} logo`}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 ring-1 ring-white/10"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role || exp.title || 'Role'}</h3>
                              <p className="text-sm text-gray-300 mt-1">{exp.company || exp.organization || ''}</p>
                            </div>

                            <div className="text-sm text-gray-400 text-right">
                              <div className="inline-flex items-center gap-2 bg-white/3 px-3 py-1 rounded-full text-xs">
                                <span>{formatDate(exp.start)}</span>
                                <span className="opacity-60">—</span>
                                <span>{exp.end ? formatDate(exp.end) : 'Present'}</span>
                              </div>
                            </div>
                          </div>

                          {exp.description && <p className="mt-3 text-gray-300 text-sm leading-relaxed">{exp.description}</p>}

                          {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {exp.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                  <Check className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                  <span className="leading-relaxed">{r}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-6">
                {techStacks.map((stack, index) => (
                  <div key={index} data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"} data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}>
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </section>
  );
}
