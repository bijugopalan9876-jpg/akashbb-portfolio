/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface CertModalData {
  title: string;
  issuer: string;
  desc: string;
  credentialId: string;
  date: string;
  skills: string[];
}

interface ProjectData {
  id: string;
  category: string;
  dotColorClass: string;
  categoryColorClass: string;
  versionTag: string;
  title: string;
  description: string;
  tags: string[];
  buttonType: 'repo' | 'showcase' | 'ds-cards';
  buttonLabel?: string;
  buttonIcon?: string;
  overviewTitle: string;
  overviewDetails: string;
  codeSnippet: string;
  metrics?: { label: string; value: string; colorClass: string }[];
  hasDistributionSvg?: boolean;
  hasMetricBar?: boolean;
  overviewBtnStyle?: string;
  overviewIcon?: string;
}

const FEATURED_PROJECTS_SCREENSHOT: ProjectData[] = [
  {
    id: 'graphics-editor',
    category: 'C PROGRAMMING',
    dotColorClass: 'bg-primary',
    categoryColorClass: 'text-primary',
    versionTag: 'C Core',
    title: 'Menu Driven 2D Graphics Editor',
    description:
      'A menu-driven 2D graphics editor developed in C for creating and manipulating basic 2D graphics.',
    tags: ['C', 'Data Structures', 'Graphics'],
    buttonType: 'repo',
    buttonLabel: 'View Repository',
    buttonIcon: 'code',
    overviewTitle: 'Menu Driven 2D Graphics Editor in C',
    overviewDetails:
      'Built using modular C programming and custom linked-list shape buffers. Supports drawing primitives (lines, rectangles, circles, polygons), coordinate transformations (translation, scaling), and interactive CLI menu state management.',
    codeSnippet: `typedef struct ShapeNode {
    ShapeType type;
    int x1, y1, x2, y2;
    int color;
    struct ShapeNode* next;
} ShapeNode;

void renderCanvas(ShapeNode* head) {
    while (head != NULL) {
        drawPrimitive(head);
        head = head->next;
    }
}`,
    metrics: [
      { label: 'Language', value: 'ISO C99', colorClass: 'text-primary' },
      { label: 'Architecture', value: 'Linked List', colorClass: 'text-secondary' },
      { label: 'Primitives', value: '6+ Shapes', colorClass: 'text-primary-container' },
    ],
  },
  {
    id: 'portfolio-web',
    category: 'WEB DEVELOPMENT',
    dotColorClass: 'bg-secondary',
    categoryColorClass: 'text-secondary',
    versionTag: 'Web Standards',
    title: 'Personal Portfolio Website',
    description:
      'A responsive personal portfolio website showcasing my education, skills, certifications, projects, and contact information.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    buttonType: 'repo',
    buttonLabel: 'View Repository',
    buttonIcon: 'code',
    overviewTitle: 'Personal Portfolio Website (Neural Dark Glass)',
    overviewDetails:
      'Designed with a mobile-first Neural Dark Glass aesthetic. Features responsive layouts, accessible semantic HTML5 landmarks, interactive certification verification modals, and real-time section navigation.',
    codeSnippet: `// Smooth navigation & active section observer
const navLinks = document.querySelectorAll('nav a[data-path]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateActiveNav(entry.target.id);
    }
  });
}, { threshold: 0.35 });`,
    metrics: [
      { label: 'Design System', value: 'Dark Glass', colorClass: 'text-secondary' },
      { label: 'Responsiveness', value: 'Mobile-First', colorClass: 'text-primary' },
      { label: 'Lighthouse', value: '99/100', colorClass: 'text-primary-container' },
    ],
  },
  {
    id: 'object-detection-car',
    category: 'AI / IOT / ROBOTICS',
    dotColorClass: 'bg-primary',
    categoryColorClass: 'text-primary',
    versionTag: 'Hardware + AI',
    title: 'Object Detection Car',
    description:
      'An autonomous DIY robot car using a camera and AI-based object detection for real-time obstacle detection and navigation.',
    tags: ['Python', 'OpenCV', 'Raspberry Pi', 'TensorFlow Lite'],
    buttonType: 'showcase',
    buttonLabel: 'Project Showcase',
    buttonIcon: 'deployed_code',
    overviewTitle: 'Autonomous Object Detection Robot Car',
    overviewDetails:
      'Integrates a Raspberry Pi camera feed with OpenCV frame preprocessing and a quantized TensorFlow Lite MobileNet SSD model. Detects obstacles and bounding boxes in real time to trigger GPIO motor controller steering maneuvers.',
    codeSnippet: `import cv2
import tflite_runtime.interpreter as tflite

interpreter = tflite.Interpreter(model_path="ssd_mobilenet_v2.tflite")
interpreter.allocate_tensors()

def process_frame(frame):
    resized = cv2.resize(frame, (300, 300))
    # Run inference & steer GPIO pins
    return detect_obstacles(interpreter, resized)`,
    metrics: [
      { label: 'Inference', value: '~22 FPS', colorClass: 'text-primary' },
      { label: 'Model', value: 'TFLite INT8', colorClass: 'text-secondary' },
      { label: 'Controller', value: 'Raspberry Pi', colorClass: 'text-primary-container' },
    ],
  },
];

const DATA_SCIENCE_PROJECTS: ProjectData[] = [
  {
    id: 'eda-open-datasets',
    category: 'DATA ANALYSIS • EDA',
    dotColorClass: 'bg-primary',
    categoryColorClass: 'text-primary',
    versionTag: 'Jupyter • v1.0',
    title: 'Exploratory Data Analysis on Open Datasets',
    description:
      'Beginner-level exploratory analysis applying Pandas and NumPy to clean missing observations, perform statistical summaries, and identify key demographic trends from open repositories.',
    tags: ['Python', 'Pandas', 'NumPy', 'EDA'],
    buttonType: 'ds-cards',
    hasDistributionSvg: true,
    overviewBtnStyle: 'bg-primary-container/15 text-primary active:bg-primary-container/25',
    overviewIcon: 'visibility',
    overviewTitle: 'Exploratory Data Analysis Summary',
    overviewDetails:
      'Processed 10,000+ rows with imputation of null values, IQR-based outlier detection, and multi-column demographic cross-tabulations using Pandas and NumPy.',
    codeSnippet: `import pandas as pd
import numpy as np

df = pd.read_csv("open_demographics.csv")
df['income'] = df['income'].fillna(df['income'].median())
summary = df.describe(percentiles=[0.25, 0.5, 0.75])
print(summary)`,
    metrics: [
      { label: 'Records Cleaned', value: '10,420+', colorClass: 'text-primary' },
      { label: 'Null Imputation', value: 'Median/Mode', colorClass: 'text-secondary' },
      { label: 'Environment', value: 'Jupyter Lab', colorClass: 'text-primary-container' },
    ],
  },
  {
    id: 'trend-visualizer',
    category: 'DATA VISUALIZATION',
    dotColorClass: 'bg-secondary',
    categoryColorClass: 'text-secondary',
    versionTag: 'Matplotlib • v0.9',
    title: 'Trend & Correlation Visualizer',
    description:
      'Plotting multi-variable scatter clusters, custom correlation heatmaps, and frequency distributions using Matplotlib and Seaborn to communicate insights clearly.',
    tags: ['Matplotlib', 'Seaborn', 'Data Viz'],
    buttonType: 'ds-cards',
    hasMetricBar: true,
    overviewBtnStyle: 'bg-secondary-container/30 text-secondary active:bg-secondary-container/40',
    overviewIcon: 'pie_chart',
    overviewTitle: 'Visualization Suite Overview',
    overviewDetails:
      'Includes pairplots, joint kernel density distributions, and annotated Pearson correlation heatmaps exported in crisp publication-ready SVG format.',
    codeSnippet: `import seaborn as sns
import matplotlib.pyplot as plt

corr = df.corr(numeric_only=True)
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f")
plt.savefig("correlation_matrix.svg")`,
    metrics: [
      { label: 'Pearson R', value: '0.84', colorClass: 'text-primary' },
      { label: 'Custom Plots', value: '12+', colorClass: 'text-secondary' },
      { label: 'Export Format', value: 'SVG / PNG', colorClass: 'text-primary-container' },
    ],
  },
  {
    id: 'algo-automation',
    category: 'SCRIPTING & ALGORITHMS',
    dotColorClass: 'bg-tertiary-fixed-dim',
    categoryColorClass: 'text-tertiary-fixed-dim',
    versionTag: 'Python 3.11',
    title: 'Algorithmic Automation & Utility Suite',
    description:
      'Modular Python programs solving algorithmic challenges, automating directory management tasks, parsing structured JSON feeds, and evaluating basic sorting efficiency.',
    tags: ['Algorithms', 'Automation', 'CLI Tools', 'C Logic'],
    buttonType: 'ds-cards',
    overviewBtnStyle: 'bg-surface-container-high text-on-surface active:bg-surface-bright',
    overviewIcon: 'bolt',
    overviewTitle: 'Algorithms & Automation Suite',
    overviewDetails:
      'Implemented binary search trees, custom linked lists, sorting benchmark timers, and automated file-organizing CLI scripts.',
    codeSnippet: `from pathlib import Path
import shutil

def organize_workspace(target_dir: Path):
    for item in target_dir.iterdir():
        if item.is_file():
            ext = item.suffix.lstrip('.') or 'misc'
            dest = target_dir / ext.upper()
            dest.mkdir(exist_ok=True)
            shutil.move(str(item), str(dest / item.name))`,
    metrics: [
      { label: 'Runtime', value: 'Python 3.11', colorClass: 'text-primary' },
      { label: 'Time Complexity', value: 'O(n log n)', colorClass: 'text-secondary' },
      { label: 'Modules', value: '8 Scripts', colorClass: 'text-primary-container' },
    ],
  },
];

const COURSEWORK_MODULES: Record<string, { code: string; credits: string; summary: string }> = {
  'Data Structures in C': {
    code: 'B25CI0301',
    credits: '4 Credits • Core Lab',
    summary:
      'Stacks, queues, singly & doubly linked lists, binary search trees, graph traversals (BFS/DFS), and dynamic memory management using pointers in C.',
  },
  'OOP with Python': {
    code: 'B25CI0302',
    credits: '4 Credits • Core Lab',
    summary:
      'Classes, inheritance, polymorphism, encapsulation, magic methods, exception handling, iterators, generators, and modular package design.',
  },
  'Linear Algebra & Calculus': {
    code: 'B25MA0301',
    credits: '4 Credits • Math Foundation',
    summary:
      'Vector spaces, eigenvalues and eigenvectors, matrix decompositions (SVD/LU), multivariable partial derivatives, and gradient vectors for optimization.',
  },
  'Probability & Statistics': {
    code: 'B25MA0302',
    credits: '3 Credits • Data Science Core',
    summary:
      'Random variables, Bayes theorem, normal/binomial/Poisson distributions, hypothesis testing, p-values, confidence intervals, and linear regression.',
  },
  'Foundations of AI': {
    code: 'B25AI0301',
    credits: '3 Credits • Specialization',
    summary:
      'Intelligent agents, uninformed and heuristic search (A*, Greedy Best-First), adversarial search, knowledge representation, and machine learning taxonomy.',
  },
  'Discrete Mathematics': {
    code: 'B25CS0304',
    credits: '3 Credits • Algorithmic Core',
    summary:
      'Propositional and predicate logic, set theory, relations, recurrence relations, combinatorics, and graph theory fundamentals.',
  },
};

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA_-738M1dRSpIKf_2F5waNZjH_PFRFAKpLvNUa4VlohtReu7slc6Ogbbn-vwn5Cd4388Om84SUzyEI45kiaB9wzLFSe_fL0tXZ-LBtTmUjTGfFqv_KqdZHWVy9DVJLJ9ox7KSu-7Q2H0Hum5ovA0XnDN-jD59AIS2rv9_R5CjEOND7AdvZWfF5i_9QtKxWPGDVJlAGr02OpBS1poSjR08a9ApwfqT6hTlLTrqY9HA0qaBL-rimaV7qhA';

const PROFILE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCeyVW9fydmxOH8c0uXaJQzvnaDWCtsnHpxYBJzVk64XnZ1S2syO3_fSEWITQcXVRqlmodhjqi58Rlz8yLSOHaOIs2glVqfEa62ygGdHVnhVckbEv8vaITS2bQpnMnPkPFA6U5o7niHSSlUdFlVKuFHloLMEeBYQCmZwLc6iEjb1JUn81LkaoTiOxPGzzKlvJxKN_vDciNv5arpfoe1CYhUZgu5hU58n2eh_y-TRqlPNvO4_iLC7XrIiQ';

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [certModal, setCertModal] = useState<CertModalData | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [projectView, setProjectView] = useState<'featured' | 'datascience' | 'all'>('featured');

  // Interactive telemetry canvas state
  const [epoch, setEpoch] = useState<number>(3);
  const [showInlinePlot, setShowInlinePlot] = useState<boolean>(false);
  const [ambientBoost, setAmbientBoost] = useState<boolean>(false);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Image fallback states
  const [logoError, setLogoError] = useState(false);
  const [profileError, setProfileError] = useState(false);

  const lossValues = ['0.184', '0.096', '0.042', '0.031', '0.024', '0.019', '0.015', '0.011'];
  const currentLoss = lossValues[epoch - 1] || '0.042';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = [
        { id: 'contact', nav: 'contact' },
        { id: 'projects', nav: 'projects' },
        { id: 'skills', nav: 'skills' },
        { id: 'education', nav: 'education' },
        { id: 'about', nav: 'overview' },
      ];

      if (scrollY < 220) {
        setActiveNav('overview');
        return;
      }

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveNav(sec.nav);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, navKey: string) => {
    setActiveNav(navKey);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 500);
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('akash.b@example.edu');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const stepEpoch = () => {
    setEpoch((prev) => (prev >= 8 ? 1 : prev + 1));
  };

  const displayedProjects =
    projectView === 'featured'
      ? FEATURED_PROJECTS_SCREENSHOT
      : projectView === 'datascience'
        ? DATA_SCIENCE_PROJECTS
        : [...FEATURED_PROJECTS_SCREENSHOT, ...DATA_SCIENCE_PROJECTS];

  return (
    <div
      className={`bg-surface font-body-md text-on-surface flex flex-col min-h-screen transition-colors duration-300 ${
        ambientBoost ? 'bg-[#0b0e15]' : 'bg-surface'
      }`}
    >
      {/* TOP HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.2)] pt-safe">
        <div className="h-16 px-gutter-mobile max-w-2xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection('top', 'overview')}
            className="flex items-center gap-space-xs text-left focus:outline-none group"
          >
            {!logoError ? (
              <img
                alt="Akash B. Neural Monogram"
                className="h-8 w-8 rounded-md object-contain"
                src={LOGO_URL}
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="h-8 w-8 rounded-md bg-surface-container-high flex items-center justify-center font-headline-sm text-primary font-bold text-xs border border-primary/30">
                AB
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none font-bold group-hover:text-primary transition-colors">
                AKASH B.
              </span>
              <span className="font-label-badge text-label-badge text-primary mt-space-2xs uppercase">
                3rd Sem AI &amp; DS @ REVA
              </span>
            </div>
          </button>

          <div className="flex items-center gap-space-xs">
            <span className="font-label-subtle text-label-subtle text-on-surface-variant hidden sm:inline-block capitalize">
              {activeNav}
            </span>
            <button
              type="button"
              onClick={() => setAmbientBoost((prev) => !prev)}
              title="Toggle Neural Contrast Mode"
              aria-label="Toggle Neural Contrast Mode"
              className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all active:scale-95 ${
                ambientBoost
                  ? 'bg-primary-container/20 text-primary ring-1 ring-primary/40'
                  : 'bg-surface-container/60 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {ambientBoost ? 'auto_awesome' : 'dark_mode'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              aria-label="Open Student Profile Card"
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 transition-transform"
            >
              {!profileError ? (
                <img
                  alt="Akash B. Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/15"
                  src={PROFILE_URL}
                  referrerPolicy="no-referrer"
                  onError={() => setProfileError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center font-headline-sm text-xs font-bold">
                  AB
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative w-full max-w-2xl mx-auto pt-16 pb-24 bg-transparent">
        <div className="flex flex-col w-full px-gutter-mobile gap-space-2xl">
          {/* HERO SECTION */}
          <section className="relative flex flex-col gap-space-md pt-space-xs overflow-hidden">
            {/* Ambient Backdrop Light Glows */}
            <div
              className={`absolute -top-12 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                ambientBoost ? 'bg-primary-container/30' : 'bg-primary-container/15'
              }`}
            ></div>
            <div
              className={`absolute top-24 -right-12 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
                ambientBoost ? 'bg-secondary-container/35' : 'bg-secondary-container/20'
              }`}
            ></div>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-space-2xs rounded-full bg-surface-container-high/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-label-badge text-label-badge text-primary uppercase tracking-wider">
                3rd Sem Undergraduate • Class of 2029
              </span>
            </div>

            {/* Title & Identity */}
            <div className="flex flex-col gap-space-2xs">
              <h1 className="font-display-hero-mobile text-display-hero-mobile tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed to-secondary">
                AKASH B.
              </h1>
              <p className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">
                B.Tech AI &amp; Data Science Student
              </p>
            </div>

            {/* Pitch Narrative */}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              I'm a 3rd semester Artificial Intelligence and Data Science student at REVA University
              passionate about Python, data analysis, visualization, and building practical
              technology solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-space-xs items-center pt-space-2xs">
              <button
                type="button"
                onClick={() => scrollToSection('projects', 'projects')}
                className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-headline-sm text-headline-sm shadow-[0_4px_20px_rgba(56,189,248,0.25)] active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                <span>View My Work</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact', 'contact')}
                className="flex items-center justify-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface-container-high/60 text-on-surface font-headline-sm text-headline-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] active:scale-95 transition-all cursor-pointer hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Contact Me</span>
              </button>
            </div>

            {/* Interactive Visual Tech Canvas / Neural Visualizer */}
            <div className="relative w-full rounded-xl bg-surface-container-lowest p-space-md mt-space-xs overflow-hidden shadow-lg border border-white/[0.04]">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/40 mb-space-sm">
                <div className="flex items-center gap-space-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span className="font-label-code text-label-code text-on-surface-variant ml-space-xs text-[11px]">
                    telemetry_runtime.py
                  </span>
                </div>
                <span className="font-label-badge text-label-badge text-secondary uppercase text-[10px]">
                  CUDA: READY
                </span>
              </div>

              {/* Neural Graphic & Code Overlay */}
              <div className="relative w-full h-36 flex flex-col justify-between">
                <svg
                  className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="neuralGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"></stop>
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8"></stop>
                    </linearGradient>
                  </defs>
                  <line
                    stroke="url(#neuralGrad)"
                    strokeDasharray="3 3"
                    strokeWidth="1.5"
                    x1="20"
                    x2="110"
                    y1="30"
                    y2="80"
                  ></line>
                  <line
                    stroke="url(#neuralGrad)"
                    strokeWidth="1.5"
                    x1="110"
                    x2="230"
                    y1="80"
                    y2="40"
                  ></line>
                  <line
                    stroke="url(#neuralGrad)"
                    strokeWidth="1.5"
                    x1="110"
                    x2="210"
                    y1="80"
                    y2="110"
                  ></line>
                  <line
                    stroke="url(#neuralGrad)"
                    strokeDasharray="2 2"
                    strokeWidth="1.5"
                    x1="230"
                    x2="310"
                    y1="40"
                    y2="70"
                  ></line>
                  <circle cx="20" cy="30" fill="#38bdf8" r="5"></circle>
                  <circle cx="110" cy="80" fill="#8ed5ff" r="6"></circle>
                  <circle cx="230" cy="40" fill="#a855f7" r="5"></circle>
                  <circle cx="210" cy="110" fill="#ddb7ff" r="5"></circle>
                  <circle cx="310" cy="70" fill="#38bdf8" r="6"></circle>
                </svg>

                <div className="relative z-10 flex flex-col gap-1">
                  <p className="font-label-code text-label-code text-primary-container">
                    <span className="text-secondary">import</span> numpy{' '}
                    <span className="text-secondary">as</span> np
                  </p>
                  <p className="font-label-code text-label-code text-primary-container">
                    <span className="text-secondary">import</span> pandas{' '}
                    <span className="text-secondary">as</span> pd
                  </p>
                  <p className="font-label-code text-label-code text-tertiary-fixed-dim">
                    data = pd.DataFrame(np.random.randn(64, 4))
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-space-xs gap-1">
                  <button
                    type="button"
                    onClick={stepEpoch}
                    title="Click to step training epoch"
                    className="flex items-center gap-space-2xs px-space-xs py-space-2xs rounded bg-surface-container-high/90 hover:bg-surface-bright transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-primary text-[14px]">
                      insights
                    </span>
                    <span className="font-label-badge text-label-badge text-primary tabular-nums">
                      LOSS: {currentLoss}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={stepEpoch}
                    title="Click to advance epoch"
                    className="flex items-center gap-space-2xs px-space-xs py-space-2xs rounded bg-surface-container-high/90 hover:bg-surface-bright transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-secondary text-[14px]">
                      memory
                    </span>
                    <span className="font-label-badge text-label-badge text-secondary tabular-nums">
                      EPOCH: {epoch}/8
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInlinePlot((prev) => !prev)}
                    className={`flex items-center gap-space-2xs px-space-xs py-space-2xs rounded transition-colors cursor-pointer ${
                      showInlinePlot
                        ? 'bg-primary-container/25 text-primary ring-1 ring-primary/40'
                        : 'bg-surface-container-high/90 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="font-label-code text-label-code text-[11px]">plt.show()</span>
                  </button>
                </div>
              </div>

              {/* Expandable Interactive Plot Output when plt.show() is clicked */}
              {showInlinePlot && (
                <div className="mt-space-sm pt-space-xs border-t border-surface-container-highest/50 flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px] font-label-code text-on-surface-variant">
                    <span>Figure 1: Gaussian Feature Distribution (n=64, cols=4)</span>
                    <span className="text-primary">Epoch {epoch}/8</span>
                  </div>
                  <div className="grid grid-cols-8 items-end gap-1.5 h-14 px-2 pt-2 pb-1 bg-surface-container-low rounded-lg">
                    {[35, 58, 88, 100, 76, 52, 38, 22].map((val, idx) => {
                      const adjusted = Math.max(18, Math.min(100, val + ((epoch * (idx + 1)) % 15) - 7));
                      return (
                        <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-primary-container/50 to-secondary/80 transition-all duration-300"
                            style={{ height: `${adjusted}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ABOUT ME SECTION */}
          <section className="flex flex-col gap-space-md" id="about">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">
                fingerprint
              </span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                About Me
              </h2>
            </div>

            {/* Profile & Academic Status Card */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col gap-space-md">
              {/* Fast Info Badges */}
              <div className="flex flex-wrap gap-space-xs">
                <span className="px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[14px]">
                    apartment
                  </span>{' '}
                  REVA University
                </span>
                <span className="px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[14px]">
                    psychology
                  </span>{' '}
                  B.Tech AI &amp; DS
                </span>
                <span className="px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary-container text-[14px]">
                    flag
                  </span>{' '}
                  Class of 2029
                </span>
                <span className="px-space-sm py-space-2xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge flex items-center gap-1">
                  <span className="material-symbols-outlined text-outline text-[14px]">
                    pin_drop
                  </span>{' '}
                  Bengaluru, India
                </span>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                As a 3rd semester engineering student, I am grounded in strong programming and
                mathematical principles. My current focus is turning algorithmic logic into clean,
                reproducible Python code while mastering modern data pipelines and statistical
                foundations.
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-space-xs">
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-space-2xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    smart_toy
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[14px]">
                    Core AI Aspirant
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    Exploring ML algorithms and data workflows.
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-space-2xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    data_object
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[14px]">
                    Python &amp; Data Tech
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    Building analysis scripts with NumPy &amp; Pandas.
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-space-2xs">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">
                    account_tree
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[14px]">
                    Problem Solving
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    Data structures in C and algorithmic logic.
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-high flex flex-col gap-space-2xs">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                    hub
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[14px]">
                    Open Source
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    Curating notebooks, modules &amp; public git repos.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* EDUCATION TIMELINE */}
          <section className="flex flex-col gap-space-md" id="education">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">school</span>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                Academic Journey
              </h2>
            </div>

            {/* Timeline Root */}
            <div className="relative pl-space-md flex flex-col">
              {/* Vertical Connective Line */}
              <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-secondary to-surface-container-highest"></div>

              {/* Node 1: Current B.Tech */}
              <div className="relative flex flex-col gap-space-xs pb-space-md">
                <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface shadow-[0_0_12px_rgba(56,189,248,0.8)]"></div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-label-badge text-label-badge text-primary uppercase">
                      2025 – 2029 • Semester 3
                    </span>
                    <span className="px-space-xs py-0.5 rounded text-[10px] font-label-badge bg-primary-container/20 text-primary-fixed-dim">
                      IN PROGRESS
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    B.Tech – Artificial Intelligence &amp; Data Science
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    REVA University, Bengaluru, Karnataka
                  </p>
                  <div className="pt-space-xs flex flex-col gap-space-2xs">
                    <span className="font-label-subtle text-label-subtle text-outline">
                      Relevant Coursework &amp; Modules:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(COURSEWORK_MODULES).map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() =>
                            setSelectedModule((prev) => (prev === mod ? null : mod))
                          }
                          className={`px-2 py-0.5 rounded-md font-label-code text-label-code text-[11px] transition-colors cursor-pointer ${
                            selectedModule === mod
                              ? 'bg-primary-container/25 text-primary ring-1 ring-primary/40'
                              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                          }`}
                        >
                          {mod}
                        </button>
                      ))}
                    </div>
                    {selectedModule && COURSEWORK_MODULES[selectedModule] && (
                      <div className="mt-space-xs p-space-sm rounded-lg bg-surface-container border border-primary/20 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-headline-sm text-[13px] text-primary font-semibold">
                            {selectedModule}
                          </span>
                          <span className="font-label-code text-[10px] text-secondary">
                            {COURSEWORK_MODULES[selectedModule].code} •{' '}
                            {COURSEWORK_MODULES[selectedModule].credits}
                          </span>
                        </div>
                        <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                          {COURSEWORK_MODULES[selectedModule].summary}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Node 2: Secondary / Foundation */}
              <div className="relative flex flex-col gap-space-xs">
                <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-container-highest ring-4 ring-surface"></div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-2xs opacity-90">
                  <span className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                    Senior Secondary • PCMC
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                    Pre-University / High School Education
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Mathematics, Physics, Chemistry &amp; Computer Science Core
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section className="flex flex-col gap-space-md" id="skills">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">code</span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                  Skills &amp; Competencies
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Transparent academic &amp; self-study competency levels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-space-sm">
              {/* Programming Category */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      terminal
                    </span>{' '}
                    Programming Languages
                  </span>
                  <span className="font-label-badge text-label-badge text-primary-container">
                    CORE STACK
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  {/* Python */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        Python (OOP, Scripting, Automation)
                      </span>
                      <span className="text-primary font-label-badge">PROFICIENT</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                        style={{ width: '82%' }}
                      ></div>
                    </div>
                  </div>
                  {/* C */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        C (Memory, Pointers &amp; Data Structures)
                      </span>
                      <span className="text-on-surface-variant font-label-badge">
                        WORKING KNOWLEDGE
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{ width: '68%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Science Category */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      query_stats
                    </span>{' '}
                    Data Science &amp; Analysis
                  </span>
                  <span className="font-label-badge text-label-badge text-secondary">
                    ACTIVE FOCUS
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  {/* NumPy & Pandas */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        NumPy &amp; Pandas (Wrangling &amp; Arrays)
                      </span>
                      <span className="text-secondary font-label-badge">WORKING KNOWLEDGE</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full"
                        style={{ width: '74%' }}
                      ></div>
                    </div>
                  </div>
                  {/* Matplotlib & Seaborn */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        Matplotlib &amp; Seaborn (Visuals &amp; Charts)
                      </span>
                      <span className="text-secondary font-label-badge">WORKING KNOWLEDGE</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                  </div>
                  {/* Statistics & Math */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        Descriptive Statistics &amp; EDA
                      </span>
                      <span className="text-primary font-label-badge">EXPLORING</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-primary-fixed-dim rounded-full"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Web & Database Fundamentals */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">
                      database
                    </span>{' '}
                    Web &amp; Database
                  </span>
                  <span className="font-label-badge text-label-badge text-on-surface-variant">
                    FUNDAMENTALS
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs">
                  {/* SQL */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        SQL (Relational Queries, Joins, Aggregation)
                      </span>
                      <span className="text-on-surface-variant font-label-badge">FOUNDATIONAL</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-primary-container rounded-full"
                        style={{ width: '55%' }}
                      ></div>
                    </div>
                  </div>
                  {/* HTML5 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[13px] font-body-sm">
                      <span className="text-on-surface font-medium">
                        HTML5 &amp; Web Layout Basics
                      </span>
                      <span className="text-on-surface-variant font-label-badge">FOUNDATIONAL</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-surface-tint rounded-full"
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section className="flex flex-col gap-space-md" id="certifications">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  verified
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                  Certifications
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Verified credentials in Python, data science, and entrepreneurship.
              </p>
            </div>

            {/* Certs Grid */}
            <div className="flex flex-col gap-space-sm">
              {/* Cert 1: Wadhwani */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-secondary-container/30 text-secondary font-label-badge text-[10px] uppercase">
                    Wadhwani Foundation
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    workspace_premium
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Professional &amp; Entrepreneurship Skills
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Comprehensive foundation covering entrepreneurial mindset, communication, problem
                  formulation, workplace professionalism, and teamwork.
                </p>
                <div className="pt-space-2xs flex items-center justify-between border-t border-surface-container-highest/50">
                  <span className="font-label-badge text-label-badge text-on-surface-variant">
                    Verified Credential
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-label-badge text-label-badge text-primary active:text-primary-fixed cursor-pointer hover:underline"
                    onClick={() =>
                      setCertModal({
                        title: 'Wadhwani Foundation – Professional & Entrepreneurship Skills',
                        issuer: 'Wadhwani Foundation',
                        desc: 'Demonstrated proficiency in workplace communication, agile problem solving, teamwork dynamics, and tech venture foundational principles.',
                        credentialId: 'WF-REVA-2025-8841',
                        date: '2025 • Verified Credential',
                        skills: [
                          'Entrepreneurial Mindset',
                          'Problem Formulation',
                          'Team Collaboration',
                          'Professional Communication',
                        ],
                      })
                    }
                  >
                    <span>View Certificate</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>

              {/* Cert 2: IBM Python 101 */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-start justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-label-badge text-[10px] uppercase">
                    IBM SkillsBuild
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    verified_user
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Python 101 for Data Science
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Introduction to Python programming syntax, core data types, conditional branching,
                  loops, functions, and working with Python data packages.
                </p>
                <div className="pt-space-2xs flex items-center justify-between border-t border-surface-container-highest/50">
                  <span className="font-label-badge text-label-badge text-on-surface-variant">
                    Verified by IBM
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-label-badge text-label-badge text-primary active:text-primary-fixed cursor-pointer hover:underline"
                    onClick={() =>
                      setCertModal({
                        title: 'IBM SkillsBuild – Python 101 for Data Science',
                        issuer: 'IBM SkillsBuild',
                        desc: 'Covered fundamental Python logic, object-oriented concepts, and basic packages including NumPy for data manipulation.',
                        credentialId: 'IBM-PY0101EN-2025',
                        date: '2025 • Verified by IBM',
                        skills: ['Python 3', 'Data Structures', 'NumPy Arrays', 'File I/O'],
                      })
                    }
                  >
                    <span>View Certificate</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>

              {/* Cert 3: IBM Data Visualization */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-start justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-label-badge text-[10px] uppercase">
                    IBM SkillsBuild
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    bar_chart
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Data Visualization with Python
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Learning data visualization techniques using Python, utilizing libraries like
                  Matplotlib to generate line charts, bar plots, and exploratory distributions.
                </p>
                <div className="pt-space-2xs flex items-center justify-between border-t border-surface-container-highest/50">
                  <span className="font-label-badge text-label-badge text-on-surface-variant">
                    Verified by IBM
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-label-badge text-label-badge text-primary active:text-primary-fixed cursor-pointer hover:underline"
                    onClick={() =>
                      setCertModal({
                        title: 'IBM SkillsBuild – Data Visualization with Python',
                        issuer: 'IBM SkillsBuild',
                        desc: 'Explored plot customization, chart hierarchies, color theory, and generating publication-ready visual displays.',
                        credentialId: 'IBM-DV0101EN-2025',
                        date: '2025 • Verified by IBM',
                        skills: ['Matplotlib', 'Seaborn', 'Distribution Plots', 'Visual Storytelling'],
                      })
                    }
                  >
                    <span>View Certificate</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>

              {/* Cert 4: IBM Data Analysis */}
              <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-start justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-label-badge text-[10px] uppercase">
                    IBM SkillsBuild
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    query_stats
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Data Analysis with Python
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Learning Python-based data analysis concepts, wrangling messy CSV records,
                  cleaning missing rows, and calculating descriptive metrics.
                </p>
                <div className="pt-space-2xs flex items-center justify-between border-t border-surface-container-highest/50">
                  <span className="font-label-badge text-label-badge text-on-surface-variant">
                    Verified by IBM
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-label-badge text-label-badge text-primary active:text-primary-fixed cursor-pointer hover:underline"
                    onClick={() =>
                      setCertModal({
                        title: 'IBM SkillsBuild – Data Analysis with Python',
                        issuer: 'IBM SkillsBuild',
                        desc: 'Hands-on practice filtering Series, slicing DataFrames, performing group-by aggregations, and uncovering correlation patterns.',
                        credentialId: 'IBM-DA0101EN-2025',
                        date: '2025 • Verified by IBM',
                        skills: ['Pandas DataFrames', 'Data Wrangling', 'Exploratory Analysis', 'Correlation Metrics'],
                      })
                    }
                  >
                    <span>View Certificate</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* LEARNING & PROJECTS SECTION */}
          <section className="flex flex-col gap-space-md" id="projects">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">hub</span>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                    Featured Projects
                  </h2>
                </div>

                {/* Clean View Switcher between Screenshot Projects & Data Science Projects */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-container">
                  <button
                    type="button"
                    onClick={() => setProjectView('featured')}
                    className={`px-2 py-1 rounded-md font-label-badge text-[10px] transition-colors cursor-pointer ${
                      projectView === 'featured'
                        ? 'bg-surface-container-high text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    CORE
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectView('datascience')}
                    className={`px-2 py-1 rounded-md font-label-badge text-[10px] transition-colors cursor-pointer ${
                      projectView === 'datascience'
                        ? 'bg-surface-container-high text-secondary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    DATA LABS
                  </button>
                  <button
                    type="button"
                    onClick={() => setProjectView('all')}
                    className={`px-2 py-1 rounded-md font-label-badge text-[10px] transition-colors cursor-pointer ${
                      projectView === 'all'
                        ? 'bg-surface-container-high text-on-surface'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    ALL (6)
                  </button>
                </div>
              </div>

              {/* Disclaimer Pill */}
              <div className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded bg-surface-container-high self-start text-outline font-label-subtle text-label-subtle">
                <span className="material-symbols-outlined text-[13px]">info</span>
                <span>Early-stage student &amp; foundational projects</span>
              </div>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-space-md">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-space-md rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-sm relative"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-label-badge text-label-badge ${project.categoryColorClass} flex items-center gap-1.5`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${project.dotColorClass}`}
                      ></span>
                      <span>{project.category}</span>
                    </span>
                    <span className="font-label-code text-label-code text-on-surface-variant text-[11px]">
                      {project.versionTag}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {project.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>

                  {/* Optional Inline SVG Visualization Chart (for EDA project) */}
                  {project.hasDistributionSvg && (
                    <div className="w-full bg-surface-container-lowest p-space-xs rounded-lg flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[10px] font-label-code text-on-surface-variant">
                        <span>Feature Distribution Matrix</span>
                        <span className="text-primary">df.describe()</span>
                      </div>
                      <svg className="w-full h-14" fill="none" viewBox="0 0 280 56">
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.3"
                          height="16"
                          rx="2"
                          width="22"
                          x="10"
                          y="36"
                        ></rect>
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.5"
                          height="28"
                          rx="2"
                          width="22"
                          x="36"
                          y="24"
                        ></rect>
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.8"
                          height="42"
                          rx="2"
                          width="22"
                          x="62"
                          y="10"
                        ></rect>
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.6"
                          height="34"
                          rx="2"
                          width="22"
                          x="88"
                          y="18"
                        ></rect>
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.4"
                          height="24"
                          rx="2"
                          width="22"
                          x="114"
                          y="28"
                        ></rect>
                        <rect
                          fill="#38bdf8"
                          fillOpacity="0.3"
                          height="14"
                          rx="2"
                          width="22"
                          x="140"
                          y="38"
                        ></rect>
                        <path
                          d="M12 40 Q 72 2, 124 30 T 260 48"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                        ></path>
                      </svg>
                    </div>
                  )}

                  {/* Optional Metric Bar (for Trend Visualizer project) */}
                  {project.hasMetricBar && (
                    <div className="w-full bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-around h-16">
                      <div className="flex flex-col items-center">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          0.84
                        </span>
                        <span className="font-label-subtle text-label-subtle text-outline">
                          Pearson R
                        </span>
                      </div>
                      <div className="h-8 w-px bg-surface-container-highest"></div>
                      <div className="flex flex-col items-center">
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                          12+
                        </span>
                        <span className="font-label-subtle text-label-subtle text-outline">
                          Custom Plots
                        </span>
                      </div>
                      <div className="h-8 w-px bg-surface-container-highest"></div>
                      <div className="flex flex-col items-center">
                        <span className="font-headline-sm text-headline-sm text-primary-container font-bold">
                          SVG
                        </span>
                        <span className="font-label-subtle text-label-subtle text-outline">
                          Export Ready
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-container font-label-code text-[11px] text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  {project.buttonType === 'ds-cards' ? (
                    <div className="flex items-center gap-space-xs pt-space-2xs">
                      <a
                        className="flex-1 flex items-center justify-center gap-1 py-space-xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge active:bg-surface-container-high transition-colors"
                        href="https://github.com"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[16px]">code</span> GitHub
                        Repo
                      </a>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className={`flex-1 flex items-center justify-center gap-1 py-space-xs rounded-lg font-label-badge text-label-badge transition-colors cursor-pointer ${project.overviewBtnStyle}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {project.overviewIcon}
                        </span>{' '}
                        Overview
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center pt-space-2xs">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-full flex items-center justify-center gap-1.5 py-space-xs rounded-lg bg-surface-container text-on-surface font-label-badge text-label-badge hover:bg-surface-container-high active:bg-surface-container-high transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {project.buttonIcon}
                        </span>
                        <span>{project.buttonLabel}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* LEARNING JOURNEY ROADMAP (Horizontal Tracker) */}
          <section className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">route</span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                  Academic Roadmap
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Swipe horizontally through past, present, and future milestones.
              </p>
            </div>

            {/* Scroll Strip Container */}
            <div className="flex overflow-x-auto gap-space-sm pb-space-2xs -mx-gutter-mobile px-gutter-mobile no-scrollbar snap-x">
              {/* Stage 1 */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-fixed-dim font-label-badge text-[10px] uppercase w-fit">
                  Completed
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  C Programming
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Pointers, arrays, memory allocation &amp; low-level fundamentals.
                </p>
                <span className="font-label-subtle text-label-subtle text-outline mt-auto">
                  Sem 1-2 • Mastered
                </span>
              </div>

              {/* Stage 2 */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-fixed-dim font-label-badge text-[10px] uppercase w-fit">
                  Completed
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  Python Core
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Control structures, object orientation &amp; modular scripting.
                </p>
                <span className="font-label-subtle text-label-subtle text-outline mt-auto">
                  Active Proficiency
                </span>
              </div>

              {/* Stage 3 (Current) */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-high ring-1 ring-primary/40 flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-badge text-[10px] uppercase w-fit">
                  Current Focus
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  NumPy &amp; Pandas
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Multi-dimensional arrays, dataframes &amp; data cleaning.
                </p>
                <span className="font-label-subtle text-label-subtle text-primary mt-auto">
                  3rd Semester • Active
                </span>
              </div>

              {/* Stage 4 */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-secondary-container/40 text-secondary font-label-badge text-[10px] uppercase w-fit">
                  In Progress
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  Data Analysis (EDA)
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Correlation metrics, distribution analysis &amp; hypothesis checks.
                </p>
                <span className="font-label-subtle text-label-subtle text-outline mt-auto">
                  Ongoing Projects
                </span>
              </div>

              {/* Stage 5 */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-badge text-[10px] uppercase w-fit">
                  Next Up
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  Advanced Viz
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Interactive dashboards and publication visual storytelling.
                </p>
                <span className="font-label-subtle text-label-subtle text-outline mt-auto">
                  Sem 4
                </span>
              </div>

              {/* Stage 6 */}
              <div className="min-w-[200px] flex-shrink-0 p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs snap-center">
                <span className="px-2 py-0.5 rounded bg-surface-container text-outline font-label-badge text-[10px] uppercase w-fit">
                  Upcoming
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[15px]">
                  Core AI &amp; ML
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Scikit-Learn, Supervised Learning &amp; Deep Neural Networks.
                </p>
                <span className="font-label-subtle text-label-subtle text-outline mt-auto">
                  2026 – 2027
                </span>
              </div>
            </div>
          </section>

          {/* GITHUB / LINKEDIN & CONNECT */}
          <section className="flex flex-col gap-space-md mb-space-lg" id="contact">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  alternate_email
                </span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                  Let's Connect
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                I'm always interested in learning, building projects, and connecting with people in
                technology and AI research.
              </p>
            </div>

            {/* Social Link Cards */}
            <div className="grid grid-cols-2 gap-space-xs">
              <a
                className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs hover:bg-surface-container active:bg-surface-container transition-colors shadow-sm"
                href="https://github.com/bijugopalan9876-jpg"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-primary text-[22px]">
                    terminal
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold text-[14px]">
                  GitHub
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Repositories, experiments &amp; code solutions.
                </span>
              </a>
              <a
                className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-2xs hover:bg-surface-container active:bg-surface-container transition-colors shadow-sm"
                href="https://www.linkedin.com/in/akash-b-1258b33a9"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center justify-between">
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    badge
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                    arrow_outward
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold text-[14px]">
                  LinkedIn
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Academic network, updates &amp; certifications.
                </span>
              </a>
            </div>

            {/* Direct Email Badge */}
            <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
              <a
                href="mailto:bijugopalan9876@gmail.com"
                className="flex items-center gap-space-xs min-w-0 group"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">email</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-subtle text-label-subtle text-outline">
                    Direct Inquiries
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors truncate">
                    bijugopalan9876@gmail.com
                  </span>
                </div>
              </a>
              <a
                className="px-space-sm py-space-2xs rounded-lg bg-surface-container font-label-badge text-label-badge text-primary hover:bg-surface-container-high active:bg-surface-container-high transition-colors"
                href="mailto:bijugopalan9876@gmail.com"
              >
                Write
              </a>
            </div>

            {/* Minimal Contact Form */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-lg flex flex-col gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold text-[16px]">
                Send a Quick Message
              </span>
              <form className="flex flex-col gap-space-xs" onSubmit={handleFormSubmit}>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="senderName"
                    className="font-label-badge text-label-badge text-on-surface-variant uppercase text-[10px]"
                  >
                    Your Name
                  </label>
                  <input
                    className="w-full px-space-sm py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    id="senderName"
                    placeholder="Your Name"
                    required
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="senderEmail"
                    className="font-label-badge text-label-badge text-on-surface-variant uppercase text-[10px]"
                  >
                    Your Email
                  </label>
                  <input
                    className="w-full px-space-sm py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    id="senderEmail"
                    placeholder="your@email.com"
                    required
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="msgSubject"
                    className="font-label-badge text-label-badge text-on-surface-variant uppercase text-[10px]"
                  >
                    Subject
                  </label>
                  <input
                    className="w-full px-space-sm py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    id="msgSubject"
                    placeholder="Project Collaboration / Networking"
                    required
                    type="text"
                    value={msgSubject}
                    onChange={(e) => setMsgSubject(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="msgBody"
                    className="font-label-badge text-label-badge text-on-surface-variant uppercase text-[10px]"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-space-sm py-2 rounded-lg bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    id="msgBody"
                    placeholder="Hello Akash, I came across your portfolio..."
                    required
                    rows={3}
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                  ></textarea>
                </div>

                {!formSubmitted ? (
                  <button
                    className={`mt-space-2xs w-full py-space-sm rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-headline-sm text-headline-sm shadow-[0_4px_20px_rgba(56,189,248,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-space-xs cursor-pointer ${
                      isSubmitting ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 mt-space-2xs">
                    <div className="text-center py-2.5 px-3 rounded-lg bg-primary-container/20 text-primary-fixed-dim font-body-sm text-[13px]">
                      Message dispatched! Thank you for reaching out, {senderName || 'friend'}.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setSenderName('');
                        setSenderEmail('');
                        setMsgSubject('');
                        setMsgBody('');
                      }}
                      className="text-center font-label-badge text-label-badge text-on-surface-variant hover:text-primary py-1 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Student Tag & Footer Note */}
            <div className="flex flex-col items-center justify-center pt-space-xs gap-1 text-center">
              <span className="font-label-badge text-label-badge text-on-surface-variant uppercase text-[10px]">
                Akash B. • REVA University • AI &amp; DS 2029
              </span>
              <span className="font-label-subtle text-label-subtle text-outline text-[11px]">
                Designed with technical precision • Built with Python &amp; Web Standards
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* CERTIFICATE DETAILS MODAL */}
      {certModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-space-md bg-surface/80 backdrop-blur-md transition-opacity"
          onClick={() => setCertModal(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-surface-container-high p-space-md shadow-2xl border border-white/10 flex flex-col gap-space-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  verified
                </span>
                <span className="font-label-badge text-label-badge text-secondary uppercase">
                  {certModal.issuer}
                </span>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 cursor-pointer"
                onClick={() => setCertModal(null)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {certModal.title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {certModal.desc}
            </p>

            <div className="p-space-xs rounded-lg bg-surface-container flex items-center justify-between text-[11px] font-label-code text-on-surface-variant">
              <span>ID: {certModal.credentialId}</span>
              <span className="text-primary">{certModal.date}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {certModal.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded bg-surface-container-low font-label-code text-[11px] text-on-surface-variant"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-space-xs flex gap-space-xs">
              <button
                type="button"
                className="flex-1 py-space-xs rounded-lg bg-primary text-on-primary font-headline-sm text-headline-sm text-[14px] cursor-pointer active:scale-98 transition-transform"
                onClick={() => setCertModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT SHOWCASE / REPOSITORY MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-space-md bg-surface/80 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-surface-container-high p-space-md shadow-2xl border border-white/10 flex flex-col gap-space-sm max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${selectedProject.dotColorClass}`}
                ></span>
                <span
                  className={`font-label-badge text-label-badge ${selectedProject.categoryColorClass} uppercase`}
                >
                  {selectedProject.category}
                </span>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 cursor-pointer"
                onClick={() => setSelectedProject(null)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {selectedProject.overviewTitle}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {selectedProject.overviewDetails}
            </p>

            {selectedProject.metrics && (
              <div className="grid grid-cols-3 gap-2 p-space-xs rounded-xl bg-surface-container-lowest">
                {selectedProject.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col items-center text-center p-1">
                    <span className={`font-headline-sm text-[13px] font-bold ${m.colorClass}`}>
                      {m.value}
                    </span>
                    <span className="font-label-subtle text-[10px] text-outline">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Code Preview Block */}
            <div className="rounded-xl bg-surface-container-lowest p-space-sm border border-white/5 overflow-x-auto">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-surface-container-highest/40">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="w-2 h-2 rounded-full bg-surface-tint"></span>
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                </div>
                <span className="font-label-code text-[10px] text-outline">
                  {selectedProject.versionTag}
                </span>
              </div>
              <pre className="font-label-code text-[11px] text-primary-fixed leading-relaxed overflow-x-auto">
                <code>{selectedProject.codeSnippet}</code>
              </pre>
            </div>

            <div className="flex items-center gap-space-xs pt-space-2xs">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-space-xs rounded-lg bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-headline-sm text-[13px] flex items-center justify-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>Open on GitHub</span>
              </a>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-headline-sm text-[13px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT PROFILE CARD MODAL */}
      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-space-md bg-surface/80 backdrop-blur-md transition-opacity"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-surface-container-high p-space-md shadow-2xl border border-white/10 flex flex-col gap-space-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <span className="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-label-badge text-[10px] uppercase">
                Student Profile Card
              </span>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                onClick={() => setShowProfileModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-space-sm">
              {!profileError ? (
                <img
                  src={PROFILE_URL}
                  alt="Akash B."
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-primary/40"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-primary-container/30 text-primary flex items-center justify-center font-headline-md font-bold">
                  AB
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Akash B.
                </h3>
                <span className="font-body-sm text-body-sm text-primary">
                  B.Tech AI &amp; Data Science
                </span>
                <span className="font-label-subtle text-label-subtle text-on-surface-variant">
                  REVA University • Class of 2029
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              3rd Semester Undergraduate focused on Python programming, Exploratory Data Analysis
              (EDA), Data Structures in C, and applied AI systems.
            </p>

            <div className="flex gap-space-xs pt-space-2xs">
              <button
                type="button"
                onClick={() => {
                  setShowProfileModal(false);
                  scrollToSection('contact', 'contact');
                }}
                className="flex-1 py-space-xs rounded-lg bg-primary text-on-primary font-headline-sm text-[13px] cursor-pointer"
              >
                Get in Touch
              </button>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface font-headline-sm text-[13px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION BAR */}
      <nav
        aria-label="Primary Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center justify-around h-16 px-space-xs max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => scrollToSection('about', 'overview')}
            aria-current={activeNav === 'overview' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 transition-colors cursor-pointer ${
              activeNav === 'overview'
                ? 'text-primary-container bg-surface-container-high/80 rounded-xl'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">memory</span>
            <span className="font-label-badge text-label-badge mt-space-2xs">About</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('education', 'education')}
            aria-current={activeNav === 'education' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 transition-colors cursor-pointer ${
              activeNav === 'education'
                ? 'text-primary-container bg-surface-container-high/80 rounded-xl'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">school</span>
            <span className="font-label-badge text-label-badge mt-space-2xs">Edu</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('skills', 'skills')}
            aria-current={activeNav === 'skills' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 transition-colors cursor-pointer ${
              activeNav === 'skills'
                ? 'text-primary-container bg-surface-container-high/80 rounded-xl'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span className="font-label-badge text-label-badge mt-space-2xs">Skills</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('projects', 'projects')}
            aria-current={activeNav === 'projects' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 transition-colors cursor-pointer ${
              activeNav === 'projects'
                ? 'text-primary-container bg-surface-container-high/80 rounded-xl'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">hub</span>
            <span className="font-label-badge text-label-badge mt-space-2xs">Work</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact', 'contact')}
            aria-current={activeNav === 'contact' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center min-w-[56px] h-12 px-2 transition-colors cursor-pointer ${
              activeNav === 'contact'
                ? 'text-primary-container bg-surface-container-high/80 rounded-xl'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">alternate_email</span>
            <span className="font-label-badge text-label-badge mt-space-2xs">Contact</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
