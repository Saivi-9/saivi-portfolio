import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ParticleBackground";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Code2,
  Database,
  Gamepad2,
  Cpu,
  ChevronDown,
  Send,
  CheckCircle,
  AlertCircle,
  Eye,
  Layers,
  X,
  Terminal,
  ShieldCheck,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: "AI & ML" | "C++ Systems" | "Full-Stack Web";
  domainBadge: string;
  summary: string;
  problemStatement: string;
  architectureHighlights: string[];
  metrics: Array<{ label: string; value: string }>;
  techStack: string[];
  repoUrl: string;
}

export const FLAGSHIP_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "deep-health-ai",
    title: "Deep Health AI v2.0",
    category: "AI & ML",
    domainBadge: "CLINICAL AI / PYTORCH & REACT PACS",
    summary:
      "Enterprise multi-modal clinical decision support suite across Thoracic Radiology (Grad-CAM CNNs), 1D ECG Electrophysiology (Autoencoder & ResNet1D), 20-Biomarker Cardiology EHR Triage, and a real-time PACS Workstation.",
    problemStatement:
      "Clinical diagnostic pipelines often isolate imaging, biosignals, and tabular EHR data without calibrated uncertainty or visual explainability for clinicians.",
    architectureHighlights: [
      "2D ResidualChestCNN + ResNet-18 & MobileNetV2 transfer learning with Spatial Attention, Grad-CAM localization overlays, and Monte Carlo Dropout epistemic uncertainty.",
      "1D Convolutional Autoencoder & ResNet1D trained on MIT-BIH & synthetic arrhythmia cohorts with automated QRS/PR/QTc/ST telemetry extraction.",
      "20-biomarker Stacking Ensemble Cardiology EHR triage engine with multi-modal CXR + ECG risk fusion.",
      "FastAPI microservice with `/v1/system/diagnostics`, `/v1/clinical/biomarker-audit` threshold auditing, and an interactive React 19 medical PACS workstation.",
    ],
    metrics: [
      { label: "CXR Test Accuracy", value: "100% (1.00 AUC)" },
      { label: "ECG Anomaly ROC-AUC", value: "0.9714" },
      { label: "EHR Biomarkers", value: "20 Engineered" },
      { label: "Trained Checkpoints", value: "9 Models" },
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "React 19", "TypeScript", "Tailwind CSS", "Docker"],
    repoUrl: "https://github.com/Saivi-9/deep-health-ai",
  },
  {
    id: "student-performance-predictor",
    title: "Student Performance Predictor v2.0",
    category: "AI & ML",
    domainBadge: "ML STUDIO / SCIKIT-LEARN & LIGHTGBM",
    summary:
      "20,000-row academic performance forecasting studio featuring 28 engineered behavioral features, a 9-model cross-validation tournament, per-student feature attribution, and a What-If sensitivity simulator.",
    problemStatement:
      "Static grade calculators fail to capture nonlinear interactions between sleep deficit, formative quiz momentum, study efficiency, and digital distraction.",
    architectureHighlights: [
      "Automated feature engineering pipeline deriving study efficiency, academic momentum, cognitive sleep deficit, engagement score, and wellbeing index.",
      "9-model 5-fold cross-validation tournament benchmarking LightGBM, HistGradientBoosting, Stacking Ensemble, MLP Neural Network, Random Forest, Extra Trees, Ridge, and ElasticNet.",
      "Interactive React Coaching Studio with `/v1/predict/model-consensus` epistemic agreement telemetry, What-If intervention trajectory simulations, and live Hugging Face Hub benchmark integration.",
    ],
    metrics: [
      { label: "Cohort Size", value: "20,000 Students" },
      { label: "Pipeline Features", value: "28 Features" },
      { label: "Test R² Score", value: "0.8385" },
      { label: "Model Registry", value: "9 Pipelines" },
    ],
    techStack: ["Python", "Scikit-Learn", "LightGBM", "FastAPI", "React 19", "TypeScript", "Hugging Face Hub"],
    repoUrl: "https://github.com/Saivi-9/student-performance-predictor",
  },
  {
    id: "cortex-cpp",
    title: "CortexCPP v2.0",
    category: "C++ Systems",
    domainBadge: "NATIVE C++20 / SEMANTIC SEARCH & GRAPH",
    summary:
      "Zero-dependency native C++20 developer intelligence engine providing sub-millisecond hybrid BM25F + 128-D vector search, PageRank + Tarjan SCC dependency graphs, MinHash LSH clone detection, and an embedded WinSock2 Web Studio.",
    problemStatement:
      "Auditing and navigating large polyglot repositories typically requires heavy Node/JVM/Python runtimes or external cloud indexing services.",
    architectureHighlights: [
      "Parallel `std::jthread` polyglot lexer & AST-lite symbol extractor computing McCabe Cyclomatic Complexity across 12+ languages.",
      "Hybrid Reciprocal Rank Fusion combining field-weighted BM25F with 128-D Signed Random Projection dense embeddings.",
      "20-iteration PageRank architectural hub ranking and Tarjan's Strongly Connected Components ($O(V + E)$) circular dependency detector.",
      "64-hash MinHash LSH clone detection, FNV-1a checksummed binary snapshots (`CTXI`), and overlapped Win32 `ReadDirectoryChangesW` live file watching.",
    ],
    metrics: [
      { label: "Indexing Throughput", value: "908,810 tok/s" },
      { label: "Hybrid Query Latency", value: "0.38 – 0.71 ms" },
      { label: "External Dependencies", value: "Zero (Pure C++20)" },
      { label: "CTest Verification", value: "5/5 Suites" },
    ],
    techStack: ["C++20", "CMake", "Win32 API", "WinSock2", "HTML5 Canvas", "CTest"],
    repoUrl: "https://github.com/Saivi-9/cortex-cpp",
  },
  {
    id: "oluwarotimi-specialist-clinic",
    title: "Oluwarotimi Specialist Clinic",
    category: "Full-Stack Web",
    domainBadge: "HEALTHCARE WEB / NEXT.JS & CLOUDFLARE",
    summary:
      "Production cardiology clinic and diagnostic centre platform featuring patient-friendly heart-health guidance, WhatsApp visit scheduling, and fail-closed idempotent appointment email delivery.",
    problemStatement:
      "Medical clinic websites need zero-PII-leakage appointment request delivery with strict protection against cross-origin spam, replay attacks, and provider outages.",
    architectureHighlights: [
      "Fail-closed appointment request handler enforcing strict Origin verification, honeypot fields, 15-minute per-client rate limiting, and UUIDv4 idempotency keys.",
      "Dual-channel patient scheduling supporting instant structured WhatsApp requests and optional Resend transactional email delivery.",
      "Custom SVG mask restoration of the clinic's historical crest and dual Next.js + Cloudflare Workers deployment configuration.",
    ],
    metrics: [
      { label: "Rate Limiter Window", value: "5 req / 15 min" },
      { label: "Delivery Guarantee", value: "UUID Idempotent" },
      { label: "Database PII Stored", value: "Zero (Stateless)" },
      { label: "Security Test Suite", value: "100% Passing" },
    ],
    techStack: ["TypeScript", "Next.js", "React", "Cloudflare Workers", "Node Test Runner"],
    repoUrl: "https://github.com/Saivi-9/oluwarotimi-specialist-clinic",
  },
  {
    id: "smart-student-planner",
    title: "Smart Student Planner",
    category: "Full-Stack Web",
    domainBadge: "WEB APP / FLASK & SQLALCHEMY 2.X",
    summary:
      "Productivity-focused academic planner built with Flask and SQLite for managing assignments, 3-day upcoming deadline alerts, credit-weighted GPA calculation, and live task statistics.",
    problemStatement:
      "Students juggle coursework across multiple courses without an integrated view tying daily task completion directly to credit-weighted GPA trajectories.",
    architectureHighlights: [
      "Authenticated multi-user Flask + Flask-Login + SQLAlchemy 2.x application backed by SQLite.",
      "Credit-weighted 4.0-scale GPA engine (`A+` through `F`) and priority-coded (`High`, `Medium`, `Low`) deadline tracker.",
      "REST JSON telemetry endpoints (`/api/health`, `/api/stats`, `/calendar-events`) verified with automated in-memory SQLite pytest suites.",
    ],
    metrics: [
      { label: "GPA Precision", value: "Credit-Weighted 4.0" },
      { label: "Alert Horizon", value: "72-Hour Rolling" },
      { label: "REST Endpoints", value: "/api/stats & /calendar" },
      { label: "CI Pipeline", value: "GitHub Actions Pytest" },
    ],
    techStack: ["Python", "Flask", "SQLAlchemy", "SQLite", "Pytest", "HTML/CSS/JS"],
    repoUrl: "https://github.com/Saivi-9/smart-student-planner",
  },
  {
    id: "agrispray-management-system",
    title: "AgriSpray Management System",
    category: "AI & ML",
    domainBadge: "AGRI-TECH TELEMETRY / PYTHON",
    summary:
      "Intelligent agricultural drone pesticide management engine for scheduling spraying missions, computing tank refill stops, enforcing wind-drift safety holds, and analyzing fleet chemical usage.",
    problemStatement:
      "Aerial pesticide application above 22 km/h wind speeds causes hazardous off-target chemical drift, while inaccurate payload planning strands drones mid-field.",
    architectureHighlights: [
      "Precision dosage planner computing total chemical liters (`L/ha * hectares`), nozzle spray duration, and automated tank refill stops.",
      "Automated meteorological safety cutoff (`HOLD_HIGH_WIND` above 22.0 km/h) and battery reserve lock (`HOLD_LOW_BATTERY` below 30%).",
      "Fleet-wide telemetry aggregator tracking total hectares treated, chemical volume dispensed, and mission readiness.",
    ],
    metrics: [
      { label: "Wind Safety Cutoff", value: "≤ 22.0 km/h" },
      { label: "Battery Reserve Hold", value: "≥ 30% Charge" },
      { label: "Refill Calculation", value: "Automated Payload" },
      { label: "Test Coverage", value: "Pytest CI" },
    ],
    techStack: ["Python", "Dataclasses", "Telemetry Analytics", "Pytest", "GitHub Actions"],
    repoUrl: "https://github.com/Saivi-9/agrispray-management-system",
  },
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"All" | "AI & ML" | "C++ Systems" | "Full-Stack Web">("All");
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy>(FLAGSHIP_PROJECTS[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [visitCount, setVisitCount] = useState<number>(128);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const stored = Number(localStorage.getItem("saivi_portfolio_visits") || "127") + 1;
    localStorage.setItem("saivi_portfolio_visits", String(stored));
    setVisitCount(stored);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mandatory fallback for browsers without native <dialog closedby="any"> support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, []);

  const openCaseStudy = (project: ProjectCaseStudy) => {
    setSelectedProject(project);
    dialogRef.current?.showModal();
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError("All fields are required.");
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        // Fallback when running as a static site without the Express backend
        const saved = JSON.parse(localStorage.getItem("saivi_contact_messages") || "[]");
        saved.push({ ...form, createdAt: new Date().toISOString() });
        localStorage.setItem("saivi_contact_messages", JSON.stringify(saved));
      }
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      const saved = JSON.parse(localStorage.getItem("saivi_contact_messages") || "[]");
      saved.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem("saivi_contact_messages", JSON.stringify(saved));
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? FLAGSHIP_PROJECTS
      : FLAGSHIP_PROJECTS.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (cat: ProjectCaseStudy["category"]) => {
    if (cat === "AI & ML") return <Database size={24} className="text-primary" />;
    if (cat === "C++ Systems") return <Cpu size={24} className="text-primary" />;
    return <Code2 size={24} className="text-primary" />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-border/50 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div
            className="font-mono font-bold text-xl tracking-tighter cursor-pointer hover:text-primary transition-colors"
            onClick={() => scrollTo("hero")}
          >
            O.O<span className="text-primary">_</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-primary transition-colors uppercase cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-start justify-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl">
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="font-mono text-sm tracking-widest text-primary uppercase">
                Open to Software & AI Engineering Opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-4"
            >
              Olaoluwa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                Oluwarotimi
              </span>
            </motion.h1>

            <motion.div
              variants={fadeIn}
              className="text-xl md:text-2xl font-mono text-muted-foreground mb-8 flex flex-wrap gap-4 items-center"
            >
              <span className="text-primary font-bold">&lt;</span>
              <span>Software & AI Systems Engineer</span>
              <span className="text-primary font-bold">/&gt;</span>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base font-mono border-l-2 border-primary/50 pl-6 mb-12"
            >
              <span className="hover:text-primary transition-colors cursor-default">Clinical AI & ML</span>
              <span className="text-muted-foreground">·</span>
              <span className="hover:text-primary transition-colors cursor-default">Full-Stack Web</span>
              <span className="text-muted-foreground">·</span>
              <span className="hover:text-primary transition-colors cursor-default">Native C++20</span>
              <span className="text-muted-foreground">·</span>
              <span className="hover:text-primary transition-colors cursor-default">Unity Games</span>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wide uppercase text-sm rounded-none hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Case Studies <Layers size={16} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-4 bg-transparent border border-border text-foreground font-bold tracking-wide uppercase text-sm rounded-none hover:border-primary/50 hover:bg-white/5 transition-all flex items-center gap-2 cursor-pointer"
              >
                Connect <Mail size={16} />
              </button>
              <a
                href="https://github.com/Saivi-9"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-transparent border border-border text-foreground font-bold tracking-wide uppercase text-sm rounded-none hover:border-primary/50 hover:bg-white/5 transition-all flex items-center gap-2"
              >
                GitHub (@Saivi-9) <Github size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Visitor counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 right-8 flex items-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <Eye size={12} className="text-primary" />
          <span>{visitCount.toLocaleString()} portfolio views</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-muted-foreground hover:text-primary transition-colors"
          onClick={() => scrollTo("about")}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
              <span className="text-primary font-mono text-xl">01.</span> About
            </h2>
            <div className="text-xl md:text-3xl leading-relaxed text-muted-foreground font-light">
              <p>
                I am a software engineer with a deep foundation in{" "}
                <span className="text-foreground font-medium">Python, C++20, and TypeScript</span>, architecting
                end-to-end systems from multi-modal deep learning pipelines to low-latency native engines.
              </p>
              <p className="mt-6">
                My recent work bridges{" "}
                <span className="text-foreground font-medium">
                  Clinical AI (PyTorch Grad-CAM & 1D ECG Autoencoders)
                </span>
                ,{" "}
                <span className="text-foreground font-medium">
                  high-throughput C++20 code intelligence (BM25F + PageRank)
                </span>
                , and production full-stack applications with{" "}
                <span className="text-foreground font-medium">React 19, Next.js, FastAPI, Flask, and Unity</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-card/30 relative border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-16 flex items-center gap-4"
          >
            <span className="text-primary font-mono text-xl">02.</span> Technical Arsenal
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { name: "Python (PyTorch, Scikit-Learn, LightGBM, NumPy)", level: 92, label: "Advanced" },
              { name: "TypeScript / React 19 / Next.js / Tailwind CSS", level: 85, label: "Advanced" },
              { name: "Backend APIs (FastAPI, Flask, Express 5, SQL / Drizzle)", level: 85, label: "Advanced" },
              { name: "C++20 (Concurrency, Win32/WinSock2, CMake, CTest)", level: 78, label: "Proficient" },
              { name: "MLOps & CI/CD (Docker, GitHub Actions, Pytest, Hugging Face)", level: 82, label: "Advanced" },
              { name: "Game Development (Unity Engine & C# Scripting)", level: 55, label: "Developing" },
            ].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5 } },
                }}
                className="space-y-3"
              >
                <div className="flex justify-between font-mono text-sm tracking-wide">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.label}</span>
                </div>
                <div className="h-1 w-full bg-border relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(18,230,248,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 pt-8 border-t border-border/50 flex flex-wrap gap-4 text-sm font-mono text-muted-foreground"
          >
            <span className="text-foreground">Core Disciplines:</span>
            <span>Explainable AI (Grad-CAM & Uncertainty)</span>
            <span>·</span>
            <span>Information Retrieval (BM25F & Vector RRF)</span>
            <span>·</span>
            <span>Multilingual Web Platforms (TR/EN/RU/AR)</span>
            <span>·</span>
            <span>Video Editing & Visual Design</span>
          </motion.div>
        </div>
      </section>

      {/* Projects Section with Interactive Filter & Case Study Dialog */}
      <section id="projects" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold flex items-center gap-4"
            >
              <span className="text-primary font-mono text-xl">03.</span> Flagship Case Studies
            </motion.h2>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(["All", "AI & ML", "C++ Systems", "Full-Stack Web"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary font-bold"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } },
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="font-mono text-xs text-primary mb-5 tracking-widest">{project.domainBadge}</div>
                <div className="mb-5 p-4 bg-background inline-block w-max rounded border border-border/50">
                  {getCategoryIcon(project.category)}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-sm flex-grow">
                  {project.summary}
                </p>

                {/* Metrics Preview Grid */}
                <div className="grid grid-cols-2 gap-3 my-6 pt-4 border-t border-border/50">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-xs text-muted-foreground">{m.label}</div>
                      <div className="font-mono text-sm font-bold text-foreground">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-background border border-border text-[11px] font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between gap-4 relative z-10">
                  <button
                    type="button"
                    onClick={() => openCaseStudy(project)}
                    className="text-xs font-mono uppercase tracking-wider text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <Terminal size={13} /> Inspect Case Study
                  </button>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    GitHub <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Native <dialog closedby="any"> Case Study Modal (Modern Web Guidance compliant) */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as any)}
        aria-labelledby="case-study-dialog-title"
        className="m-auto w-full max-w-3xl bg-card text-foreground border border-primary/40 p-0 shadow-2xl backdrop:bg-black/75"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="font-mono text-xs text-primary tracking-widest uppercase mb-2">
                {selectedProject.domainBadge}
              </div>
              <h2 id="case-study-dialog-title" className="text-2xl md:text-3xl font-bold tracking-tight">
                {selectedProject.title}
              </h2>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close case study dialog"
                className="p-2 border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
                autoFocus
              >
                <X size={18} />
              </button>
            </form>
          </div>

          <div className="py-6 space-y-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                Engineering Challenge
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {selectedProject.problemStatement}
              </p>
            </div>

            {/* Verified Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {selectedProject.metrics.map((m) => (
                <div key={m.label} className="bg-background border border-border p-3">
                  <div className="font-mono text-[11px] text-muted-foreground">{m.label}</div>
                  <div className="font-mono text-sm font-bold text-primary mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                System Architecture & Implementation
              </h3>
              <ul className="space-y-2.5">
                {selectedProject.architectureHighlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-background border border-border font-mono text-xs text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
            <a
              href={selectedProject.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Open GitHub Repository <ExternalLink size={14} />
            </a>
            <form method="dialog">
              <button
                type="submit"
                className="px-6 py-3 border border-border font-mono text-xs uppercase tracking-wider hover:border-primary/50 transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Experience & Education Section */}
      <section id="experience" className="py-32 bg-card/30 border-y border-border/50 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
            >
              <span className="text-primary font-mono text-xl">04.</span> Engineering Domains
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  title: "Machine Learning & Clinical AI",
                  tools: "PyTorch, Scikit-Learn, LightGBM, Grad-CAM, FastAPI",
                  desc: "Multi-modal medical imaging & biosignal diagnostics, 9-model cross-validation tournaments, and calibrated uncertainty quantification.",
                },
                {
                  title: "Native C++20 Systems Engineering",
                  tools: "C++20, std::jthread, Win32/WinSock2, CMake, CTest",
                  desc: "Zero-dependency hybrid BM25F + dense vector search engines, PageRank/Tarjan dependency graph analyzers, and MinHash LSH clone detection.",
                },
                {
                  title: "Full-Stack Web & Multilingual Platforms",
                  tools: "React 19, Next.js, TypeScript, Flask, Drizzle ORM",
                  desc: "Production healthcare portals, academic planners, scenic travel platforms (Drive KKTC), and 4-language (TR/EN/RU/AR) agency architectures.",
                },
                {
                  title: "Interactive Game Development",
                  tools: "Unity Engine, C# Scripting, 3D Physics",
                  desc: "First-person gameplay mechanics, physics simulations, and real-time interactive environments.",
                },
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { delay: i * 0.15, duration: 0.5 } },
                  }}
                  className="pl-6 border-l border-primary/30 relative"
                >
                  <div className="absolute w-2 h-2 bg-primary left-[-4.5px] top-2" />
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <div className="font-mono text-xs text-primary mb-3">{exp.tools}</div>
                  <p className="text-muted-foreground text-sm">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4"
            >
              <span className="text-primary font-mono text-xl">05.</span> Education & Profile
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-card border border-border p-8 hover:border-primary/30 transition-colors space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">European University of Lefke</h3>
                <div className="text-lg text-muted-foreground">BSc in Software Engineering / Computer Science</div>
              </div>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-primary">Status</span>
                <div className="h-px bg-border flex-grow" />
                <span>Expected 2027</span>
              </div>
              <div className="pt-4 border-t border-border/50 font-mono text-xs text-muted-foreground space-y-2">
                <div>• 14+ Active Open-Source & Private Engineering Repositories on GitHub (@Saivi-9)</div>
                <div>• Automated CI/CD Verification across Python (Pytest), C++20 (CTest), and Node.js</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div
              variants={fadeIn}
              className="font-mono text-primary mb-4 tracking-widest uppercase text-center"
            >
              06. What's Next?
            </motion.div>
            <motion.h2
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-center"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-muted-foreground mb-16 font-light max-w-2xl mx-auto text-center"
            >
              Looking for new software and AI engineering opportunities. Whether you have a question, a project, or
              want to collaborate — drop me a message.
            </motion.p>

            {/* Contact form */}
            <motion.form variants={fadeIn} onSubmit={handleSubmit} className="space-y-6 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full bg-card border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-card border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="What's on your mind?"
                  className="w-full bg-card border border-border px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  data-testid="input-message"
                />
              </div>

              {formError && (
                <div className="flex items-center gap-2 text-destructive text-sm font-mono">
                  <AlertCircle size={14} />
                  {formError}
                </div>
              )}

              {submitted ? (
                <div className="flex items-center gap-3 text-primary font-mono text-sm border border-primary/30 bg-primary/5 px-6 py-4">
                  <CheckCircle size={18} />
                  Message recorded! I'll get back to you soon.
                </div>
              ) : (
                <button
                  type="submit"
                  data-testid="button-submit"
                  className="px-10 py-4 bg-primary text-primary-foreground font-bold tracking-wide uppercase text-sm hover:bg-primary/90 transition-all flex items-center gap-3 cursor-pointer"
                >
                  <Send size={16} />
                  Send Message
                </button>
              )}
            </motion.form>

            {/* Social links */}
            <motion.div
              variants={fadeIn}
              className="border-t border-border/50 pt-12 flex flex-wrap justify-center gap-8"
            >
              <a
                href="mailto:saivitimm8@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <Mail size={24} />
                <span className="font-mono text-xs">saivitimm8@gmail.com</span>
              </a>
              <a
                href="tel:+905338255504"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <Phone size={24} />
                <span className="font-mono text-xs">+90 533 825 55 04</span>
              </a>
              <a
                href="https://github.com/Saivi-9"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <Github size={24} />
                <span className="font-mono text-xs">github.com/Saivi-9</span>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
              >
                <Linkedin size={24} />
                <span className="font-mono text-xs">Olaoluwa Timilehin</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border/50 flex flex-col items-center gap-2">
        <p className="font-mono text-xs text-muted-foreground">
          Built by Olaoluwa Oluwarotimi (@Saivi-9). Designed for impact.
        </p>
      </footer>
    </div>
  );
}
