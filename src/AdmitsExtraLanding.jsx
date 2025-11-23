import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Percent, 
  Vote, 
  FileText, 
  ChevronRight, 
  Check, 
  Menu, 
  X, 
  Star,
  Smartphone,
  Users,
  ArrowRight
} from 'lucide-react';


import { database } from "./firebase"; // ✅ import your database

import { ref, push, get, query, orderByChild, equalTo } from "firebase/database"; // ✅ import DB helpers from firebase/database


import AppShot1 from "./assets/ScreenshotGo.jpg";
import AppShot2 from "./assets/screenshot2.png";
import AppShot3 from "./assets/screenshot1.jpg";

import appIcon from './assets/logo.png'



const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Form Submission
const handleJoin = async (e) => {
  e.preventDefault();
  if (!email) return;

  try {
    const waitlistRef = ref(database, "waitlist");

    // Check for duplicates
    const emailQuery = query(waitlistRef, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);

    if (snapshot.exists()) {
      alert("This email is already in the waitlist!");
      return;
    }

    // Add new email
    await push(waitlistRef, { email, joinedAt: Date.now() });

    setJoined(true);
    setEmail("");

  } catch (error) {
    console.error("Error adding to Firebase:", error);
  }
};


   const images = [AppShot1, AppShot2, AppShot3]; // Add as many images as you want
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {/* --- STANDARD CSS STYLES --- */}
      <style>{`
        :root {
          --primary: #6366f1; /* Indigo */
          --primary-dark: #4338ca;
          --secondary: #ec4899; /* Pink/Fuchsia */
          --accent: #8b5cf6; /* Violet */
          --dark: #0f172a;
          --light: #f8fafc;
          --text-dark: #1e293b;
          --text-light: #64748b;
          --white: #ffffff;
          --gradient: linear-gradient(135deg, #6366f1 0%, #57f542 100%);
          --glass: rgba(255, 255, 255, 0.7);
          --glass-border: rgba(255, 255, 255, 0.5);
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
          --shadow-lg: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
          --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--light);
          color: var(--text-dark);
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* --- Animations --- */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Utility Classes */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: var(--gradient);
          color: white;
          box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -10px rgba(99, 102, 241, 0.6);
        }

        .btn-outline {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          backdrop-filter: blur(4px);
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.15);
          border-color: white;
        }

        .section-title {
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
          color: var(--text-dark);
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 16px;
          display: inline-block;
          padding: 6px 12px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 20px;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 24px 0;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 16px 0;
          box-shadow: var(--shadow-sm);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: -0.03em;
        }
        
        .navbar.scrolled .logo {
          color: var(--dark);
        }

        .logo-icon {
          background: rgba(255,255,255,0.2);
          padding: 6px;
          border-radius: 8px;
        }
        .navbar.scrolled .logo-icon {
        //   background: var(--primary-dark);
          color: white;
        }

        .logo span {
          background: linear-gradient(to right, #a5b4fc, #f0abfc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 300;
        }
        .navbar.scrolled .logo span {
          background: var(--gradient);
          -webkit-background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .nav-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        
        .navbar.scrolled .nav-link {
          color: var(--text-light);
        }

        .nav-link:hover {
          color: white;
        }
        .navbar.scrolled .nav-link:hover {
          color: var(--primary);
        }

        /* Mobile Menu */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: white;
          z-index: 999;
          padding: 100px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu-overlay.open {
          transform: translateY(0);
        }

        .mobile-nav-link {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark);
          text-decoration: none;
          border-bottom: 1px solid #eee;
          padding-bottom: 16px;
        }

        /* Hero Section */
        .hero {
          position: relative;
          background-color: var(--dark);
          color: white;
          padding-top: 160px;
          padding-bottom: 100px;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Dynamic Background */
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .circle-1 {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
        }
        .circle-2 {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(0,0,0,0) 70%);
          border-radius: 50%;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-text {
          animation: fadeIn 0.8s ease-out;
        }

        .hero-text h1 {
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 900;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
        }

        .text-gradient {
          background: linear-gradient(to right, #818cf8, #57f542);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          font-size: 1.25rem;
          color: #cbd5e1;
          margin-bottom: 40px;
          max-width: 540px;
          font-weight: 400;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* Phone Mockup Container */
        .phone-mockup-wrapper {
          display: flex;
          justify-content: center;
          perspective: 1000px;
          position: relative;
        }

        .phone-mockup {
          width: 300px;
          height: 600px;
          background: var(--dark);
          border: 10px solid #1e293b;
          border-radius: 45px;
          overflow: hidden;
          position: relative;
          box-shadow: 
            0 0 0 2px #334155,
            0 25px 50px -12px rgba(0,0,0,0.5);
          transform: rotateY(-15deg) rotateX(5deg);
          transition: transform 0.5s ease;
          z-index: 10;
        }
        
        .phone-mockup:hover {
          transform: rotateY(0deg) rotateX(0deg) scale(1.02);
        }

        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 25px;
          background: #1e293b;
          border-bottom-left-radius: 18px;
          border-bottom-right-radius: 18px;
          z-index: 20;
        }

        /* Placeholder for App Screenshot */
        .app-placeholder-container {
          width: 100%;
          height: 100%;
          background-color: #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .placeholder-text {
          color: #64748b;
          font-weight: 600;
          text-align: center;
          padding: 20px;
          z-index: 5;
          background: rgba(255,255,255,0.8);
          border-radius: 12px;
        }

        /* Abstract shapes for placeholder */
        .ph-shape {
          position: absolute;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          opacity: 0.1;
        }
        .ph-1 { top: 0; left: 0; width: 100%; height: 30%; border-bottom-left-radius: 50%; }
        .ph-2 { bottom: 0; right: 0; width: 80%; height: 40%; border-top-left-radius: 100%; background: var(--accent); }

        /* Features Section */
        .features {
          padding: 120px 0;
          background: white;
          position: relative;
        }

        .features-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 80px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .feature-card {
          background: white;
          border: 1px solid #f1f5f9;
          padding: 40px 32px;
          border-radius: 24px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          z-index: 1;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fdfbfb 0%, #f8faff 100%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .icon-box {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          font-size: 28px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover .icon-box {
          transform: scale(1.1) rotate(5deg);
        }

        /* Stats/Organization Section */
        .org-section {
          padding: 120px 0;
          background: var(--dark);
          color: white;
          overflow: hidden;
        }

        .org-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .check-list {
          margin-top: 40px;
          display: grid;
          gap: 20px;
        }

        .check-item {
          background: rgba(255,255,255,0.03);
          padding: 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .check-icon {
          background: linear-gradient(135deg, #22c55e, #166534);
          color: white;
          border-radius: 50%;
          padding: 4px;
          flex-shrink: 0;
        }

        /* Waitlist Section */
        .waitlist {
          padding: 100px 0;
          background: linear-gradient(180deg, #fff 0%, #f0f9ff 100%);
        }

        .waitlist-container {
          background: white;
          border-radius: 40px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          display: flex;
          border: 1px solid rgba(0,0,0,0.03);
        }

        .waitlist-visual {
          width: 45%;
          background: var(--gradient);
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          color: white;
          overflow: hidden;
        }

        .waitlist-visual::after {
          content: '';
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
        }

        .waitlist-form-wrapper {
          width: 55%;
          padding: 60px;
        }

        .input-field {
          width: 100%;
          padding: 18px 24px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          background: #f8fafc;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        /* Responsive Media Queries */
        
        /* Tablet (Landscape & Portrait) */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 60px;
          }
          
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .hero-text p {
            margin-left: auto;
            margin-right: auto;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .org-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          
          .waitlist-container {
            flex-direction: column;
          }
          
          .waitlist-visual, .waitlist-form-wrapper {
            width: 100%;
            padding: 40px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .hero {
            padding-top: 120px;
            padding-bottom: 60px;
          }
          
          .hero-text h1 {
            font-size: 2.5rem;
          }

          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block !important;
            color: white;
          }
          .navbar.scrolled .mobile-menu-btn {
            color: var(--dark);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .phone-mockup {
            width: 260px;
            height: 520px;
          }
          
          .hero-buttons {
            justify-content: center;
            width: 100%;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>

      {/* --- COMPONENT JSX --- */}
      
      <div className="app-container">
        
        {/* Navbar */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="container nav-content">
            <div className="logo">
              <div className="logo-icon">

                <img src={appIcon} style={{width:180}} />
              </div>
              {/* ADMITS<span>EXTRA</span> */}
            </div>
            
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#organizations" className="nav-link">For Organizations</a>
              <a href="#waitlist" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                Get Early Access
              </a>
            </div>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
           <button onClick={() => setIsMenuOpen(false)} style={{alignSelf: 'flex-end', background: 'none', border: 'none'}}><X size={32}/></button>
           <a href="#features" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
           <a href="#organizations" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Organizations</a>
           <a href="#waitlist" className="mobile-nav-link" style={{color: 'var(--primary)'}} onClick={() => setIsMenuOpen(false)}>Join Waitlist</a>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg">
            <div className="circle-1 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="circle-2 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container hero-content">
            <div className="hero-text">
              <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px', justifyContent: 'center'}}>
                 <span className="section-subtitle" style={{marginBottom: 0}}>v1.0 Launching Soon</span>
                 <span style={{background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#cbd5e1'}}>iOS & Android</span>
              </div>
              
              <h1>
                Unlock Deals. <br />
                <span className="text-gradient">Create Experiences.</span>
              </h1>
              <p>
                The all-in-one mobile platform for exclusive coupon sharing, seamless event ticketing, and powerful organization management tools.
              </p>
              
              <div className="hero-buttons">
                <a href="#waitlist" className="btn btn-primary">
                  Join the Waitlist <ChevronRight size={20} />
                </a>
                <button className="btn btn-outline">
                  Watch Demo
                </button>
              </div>

              <div style={{marginTop: '30px', display: 'flex', alignItems: 'center', gap: '15px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem'}}>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{width: '32px', height: '32px', background: `#${3+i}0${3+i}0${4+i}0`, borderRadius: '50%', border: '2px solid var(--dark)', marginLeft: '-10px'}}></div>
                  ))}
                </div>
                <p>Joined by 2,000+ users</p>
              </div>
            </div>

            <div className="phone-mockup-wrapper">
              <div className="phone-mockup animate-float">
                <div className="phone-notch"></div>
                
                {/* --- REPLACED UI WITH IMAGE PLACEHOLDER --- */}
               <div className="app-placeholder-container relative w-full max-w-xs aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
      {/* Current image */}
      <img
        src={images[currentIndex]}
        alt="App Screenshot"
        className="w-full h-full object-cover"
      />

      {/* Placeholder shapes */}
      <div className="ph-shape ph-1 absolute top-2 left-2"></div>
      <div className="ph-shape ph-2 absolute bottom-2 right-2"></div>

      {/* Icon overlay */}
      {/* <Smartphone size={100} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-primary" /> */}
    </div>
                {/* ---------------------------------------- */}

              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features">
          <div className="container">
            <div className="features-header">
              <span className="section-subtitle">Core Features</span>
              <h2 className="section-title">Everything you need in one pocket</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
                We've combined the best of coupon apps and event management platforms into a single, cohesive experience.
              </p>
            </div>

            <div className="features-grid">
              <FeatureCard 
                icon={<Percent size={28} />} 
                color="#6366f1" 
                bg="#e0e7ff"
                title="Coupon Marketplace" 
                desc="Discover exclusive discounts. Buy, trade, and redeem coupons instantly from your phone." 
              />
              <FeatureCard 
                icon={<Ticket size={28} />} 
                color="#ec4899" 
                bg="#fce7f3"
                title="Event Ticketing" 
                desc="Create events in minutes. Sell tickets securely and manage guest lists with QR scanning." 
              />
              <FeatureCard 
                icon={<Vote size={28} />} 
                color="#f59e0b" 
                bg="#fef3c7"
                title="Live Voting" 
                desc="Democratic tools for organizations. Run elections and polls with real-time transparency." 
              />
              <FeatureCard 
                icon={<FileText size={28} />} 
                color="#10b981" 
                bg="#d1fae5"
                title="Smart Applications" 
                desc="Streamline recruitment. Build custom forms and review applicants in a dedicated dashboard." 
              />
              <FeatureCard 
                icon={<Users size={28} />} 
                color="#8b5cf6" 
                bg="#ede9fe"
                title="Community Hub" 
                desc="Keep your members engaged. Post announcements and manage your organization's feed." 
              />
              <FeatureCard 
                icon={<Smartphone size={28} />} 
                color="#3b82f6" 
                bg="#dbeafe"
                title="Digital Wallet" 
                desc="Your tickets, coupons, and membership cards available offline, anytime." 
              />
            </div>
          </div>
        </section>

        {/* Organization Section */}
        <section id="organizations" className="org-section">
          <div className="container org-content">
            <div className="org-text">
              <span className="section-subtitle">For Organizations</span>
              <h2>Manage your community like a Pro</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                Stop juggling spreadsheets, form builders, and payment gateways. ADMITS EXTRA gives you a command center for your organization.
              </p>
              <div className="check-list">
                <div className="check-item">
                  <Check className="check-icon" size={20} /> 
                  <div>
                    <h4 style={{marginBottom: '4px'}}>Real-time Analytics</h4>
                    <span style={{fontSize: '0.9rem', color: '#94a3b8'}}>Track ticket sales and coupon usage instantly.</span>
                  </div>
                </div>
                <div className="check-item">
                  <Check className="check-icon" size={20} /> 
                  <div>
                    <h4 style={{marginBottom: '4px'}}>Automated Payouts</h4>
                    <span style={{fontSize: '0.9rem', color: '#94a3b8'}}>Secure revenue collection directly to your bank.</span>
                  </div>
                </div>
                <div className="check-item">
                  <Check className="check-icon" size={20} /> 
                  <div>
                    <h4 style={{marginBottom: '4px'}}>Role-based Access</h4>
                    <span style={{fontSize: '0.9rem', color: '#94a3b8'}}>Assign permissions to admins and moderators.</span>
                  </div>
                </div>
              </div>
              <div style={{marginTop: '40px'}}>
                <button className="btn btn-primary">Explore Admin Tools <ArrowRight size={18}/></button>
              </div>
            </div>
            
            {/* Abstract Graphic for Org Side */}
            <div style={{ position: 'relative' }}>
               <div style={{ 
                 background: 'rgba(255,255,255,0.05)', 
                 backdropFilter: 'blur(10px)',
                 border: '1px solid rgba(255,255,255,0.1)', 
                 borderRadius: '24px',
                 padding: '30px',
                 boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
               }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
                    <div>
                      <div style={{fontSize: '0.9rem', color: '#94a3b8'}}>Total Revenue</div>
                      <div style={{fontSize: '2.5rem', fontWeight: '700'}}>$12,450</div>
                    </div>
                    <div style={{background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '5px 10px', borderRadius: '8px', height: 'fit-content', fontSize: '0.9rem'}}>+12.5%</div>
                  </div>
                  
                  {/* Fake Chart */}
                  <div style={{display: 'flex', alignItems: 'flex-end', height: '150px', gap: '12px', marginBottom: '30px'}}>
                    {[30, 45, 35, 60, 50, 75, 55, 85].map((h, i) => (
                       <div key={i} style={{
                         flex: 1, 
                         background: i === 7 ? 'var(--primary)' : 'rgba(255,255,255,0.1)', 
                         height: `${h}%`, 
                         borderRadius: '8px 8px 0 0'
                       }}></div>
                     ))}
                  </div>
                  
                  <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{flex: 1, background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px'}}>
                      <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>Active Members</div>
                      <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>1,240</div>
                    </div>
                    <div style={{flex: 1, background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px'}}>
                      <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>Pending Apps</div>
                      <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>45</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="waitlist" className="waitlist">
          <div className="container">
            <div className="waitlist-container">
              <div className="waitlist-visual">
                 <div style={{position: 'relative', zIndex: 2}}>
                   <h3 style={{ fontSize: '2.5rem', marginBottom: '15px', fontWeight: '800' }}>Join the<br/>Movement.</h3>
                   <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Secure your unique username and get 3 months of premium features for free when we launch.</p>
                 </div>
              </div>
              
              <div className="waitlist-form-wrapper">
                {!joined ? (
                  <form onSubmit={handleJoin}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '800', color: 'var(--text-dark)' }}>Get Early Access</h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
                      We are opening up spots in batches. Enter your email to reserve your spot in line.
                    </p>
                    
                    <div style={{marginBottom: '20px'}}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: '#475569' }}>Email Address</label>
                      <input 
                        type="email" 
                        className="input-field" 
                        placeholder="alex@example.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Join Waitlist Now
                    </button>
                    <p style={{textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '15px'}}>
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="success-message">
                    <div className="success-icon">
                      <Check size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', fontWeight: '700' }}>You're in!</h3>
                    <p style={{ color: 'var(--text-light)' }}>We've sent a confirmation email to <strong>{email || 'your inbox'}</strong>. Keep an eye out for updates!</p>
                    <button onClick={() => setJoined(false)} style={{marginTop: '20px', color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer'}}>Register another email</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
               <div className="logo" style={{color: 'var(--white)'}}>
                 ADMITS<span style={{background: 'none', color: 'var(--primary)'}}>EXTRA</span>
               </div>
               <div className="footer-links">
                 <a href="#">Privacy Policy</a>
                 <a href="#">Terms of Service</a>
                 <a href="#">Support</a>
               </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#475569', paddingTop: '30px', borderTop: '1px solid #1e293b' }}>
               &copy; {new Date().getFullYear()} ADMITS EXTRA. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

// Helper Component for Feature Cards
const FeatureCard = ({ icon, title, desc, color, bg }) => (
  <div className="feature-card">
    <div className="icon-box" style={{ color: color, background: bg }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '700', color: '#1e293b' }}>{title}</h3>
    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{desc}</p>
  </div>
);

export default App;