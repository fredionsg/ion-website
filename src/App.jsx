import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft, Menu, X, Share2, MapPin, Mail, Sparkles, Globe, ChevronLeft, ChevronRight, ChevronDown, User, Users, Heart, MessageSquare, ShieldAlert, GraduationCap, Users2, FileText, Gavel, Layout, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. NAVBAR
// ==========================================
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Education', href: '#pillars' },
        { name: 'Mentorship', href: '#pillars' },
        { name: 'Community', href: '#pillars' },
        { name: 'Policy', href: '#pillars' },
        { name: 'Contact', href: '#contact' },
        { name: 'Events', href: '#tuna-dialogue' },
    ];

    return (
        <>
            <nav
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-7xl rounded-full transition-all duration-500 flex items-center justify-between px-6 py-4
          ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-blue-900/10 shadow-lg text-blue-950' : 'bg-transparent text-white'}`}
            >
                <div className="flex items-center gap-3 relative z-10">
                    <img
                        src="/Assets/Logo-01.png"
                        alt="ION SG"
                        className={`h-8 w-auto transition-all duration-300 ${!scrolled ? 'brightness-0 invert opacity-90' : ''}`}
                    />
                    <span className="font-heading font-semibold text-lg tracking-tight hidden xl:block">Institute of Neurodiversity Singapore</span>
                    <span className="font-heading font-semibold text-lg tracking-tight xl:hidden">ION SG</span>
                </div>

                <div className="hidden lg:flex items-center gap-6 font-sans text-[10px] font-bold relative z-10">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-accent transition-colors whitespace-nowrap uppercase tracking-[0.2em]">{link.name}</a>
                    ))}
                </div>

                <div className="hidden lg:flex relative z-10">
                    <a href="https://ioneurodiversity.org/" target="_blank" rel="noopener noreferrer" className="bg-blue-950 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all border border-white/20">
                        Visit HQ
                    </a>
                </div>

                <button
                    className="lg:hidden relative z-10"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            <div
                className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-6 transition-transform duration-500 lg:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            >
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading text-blue-950 hover:text-accent transition-colors uppercase tracking-widest">{link.name}</a>
                ))}
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading text-accent mt-4 bg-blue-950 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold">Contact Us</a>
            </div>
        </>
    );
}

// ==========================================
// 2. HERO SECTION
// ==========================================
function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-dark flex items-end pb-24 lg:pb-32 px-6 lg:px-16" id="home">
            <div className="absolute inset-0 z-0">
                <img
                    src="/Assets/Neurodesign Roundtable 2025-6.jpg"
                    alt="Neurodesign Roundtable"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl pt-safe text-background">
                <div className="overflow-hidden mb-4">
                    <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight tracking-tight text-accent/90">
                        Every Mind
                    </h1>
                </div>
                <div className="overflow-hidden mb-10">
                    <h2 className="hero-text text-6xl md:text-8xl lg:text-9xl font-drama italic leading-none pl-4 md:pl-12 text-background/95 block underline-offset-8">
                        deserves to Thrive.
                    </h2>
                </div>
                <div className="overflow-hidden max-w-2xl hero-text mb-12 pl-4 md:pl-12">
                    <p className="text-xl md:text-2xl font-sans font-medium mb-4 text-accent">Empowering Neurominorities</p>
                    <p className="text-lg md:text-xl font-sans font-light opacity-90 leading-relaxed border-l border-primary/40 pl-4 py-1">
                        The Institute of Neurodiversity, Singapore is committed to transforming the lives of neurominorities in Singapore.
                    </p>
                </div>
                <div className="hero-text pl-4 md:pl-12 flex flex-wrap gap-4">
                    <a href="#about" className="btn-magnetic bg-primary text-background px-10 py-4 rounded-full flex items-center gap-2 group w-fit">
                        <span className="btn-content font-heading tracking-wide uppercase text-sm">Our Mission</span>
                        <ArrowRight size={18} className="btn-content group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://ioneurodiversity.org/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-background/20 hover:bg-background/10 transition-colors font-heading tracking-wide uppercase text-sm">
                        Visit HQ
                    </a>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 3. ABOUT SECTION
// ==========================================
function About() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-reveal', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 lg:px-16 bg-background relative overflow-hidden" id="about">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-8 about-reveal">
                            <span className="font-data text-xs uppercase tracking-[0.2em] text-primary/60">Legacy & Story</span>
                            <div className="h-px bg-primary/30 flex-1"></div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-drama italic text-dark mb-10 about-reveal">About us.</h2>
                        <div className="space-y-6 text-lg md:text-xl font-sans font-light text-dark/80 leading-relaxed about-reveal">
                            <p>
                                The Institute of Neurodiversity, Singapore is committed to transforming the lives of neurominorities in Singapore by fostering <span className="text-primary font-medium">Awareness</span>, <span className="text-primary font-medium">Representation</span>, <span className="text-primary font-medium">Research</span>, <span className="text-primary font-medium">Connections</span>, <span className="text-primary font-medium">Collaborations</span> and <span className="text-primary font-medium">Celebrations</span>.
                            </p>
                            <p>
                                We aim to create <span className="text-dark font-medium">systemic change</span>, <span className="text-dark font-medium">social cohesion</span> and <span className="text-dark font-medium">social mobility</span> that fosters acceptance, support, and empowerment for individuals with neurodiverse traits.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-0 about-reveal">
                        {[
                            { title: 'Mission', icon: <Sparkles className="text-accent" />, text: 'To empower neurominorities through Education, Mentorship, Advocacy, Social Cohesion and Community Support.' },
                            { title: 'Vision', icon: <Globe className="text-primary" />, text: 'A world where neurominorities are understood, supported, celebrated and thriving in all aspects of life.' },
                            { title: 'Core Values', icon: <Heart className="text-accent" />, text: 'Inclusion, Empowerment, Representation, Awareness, Collaboration, and Research.' },
                        ].map((card, i) => (
                            <div key={i} className="glass-card p-8 bg-background border border-dark/5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-dark/5 flex items-center justify-center">
                                        {card.icon}
                                    </div>
                                    <h3 className="font-heading font-semibold text-xl text-dark tracking-tight">{card.title}</h3>
                                </div>
                                <p className="font-sans text-dark/70 font-light leading-relaxed text-base">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 4. WHO WE SUPPORT & SYSTEMIC BARRIERS
// ==========================================
function WhoWeSupport() {
    const [showBarriers, setShowBarriers] = useState(false);
    
    const neurotypes = [
        { 
            name: "Autism", 
            icon: "🧩", 
            tagline: "Pattern recognition & deep focus.",
            color: "bg-blue-50 border-blue-200 text-blue-800"
        },
        { 
            name: "ADHD", 
            icon: "⚡", 
            tagline: "Creative problem-solving & hyperfocus.",
            color: "bg-amber-50 border-amber-200 text-amber-800"
        },
        { 
            name: "Dyslexia", 
            icon: "📖", 
            tagline: "Visual thinking & narrative reasoning.",
            color: "bg-emerald-50 border-emerald-200 text-emerald-800"
        },
        { 
            name: "Dyscalculia", 
            icon: "🔢", 
            tagline: "Strategic logic & conceptual math.",
            color: "bg-rose-50 border-rose-200 text-rose-800"
        },
        { 
            name: "Dyspraxia", 
            icon: "🎯", 
            tagline: "Unique motor coordination & persistence.",
            color: "bg-purple-50 border-purple-200 text-purple-800"
        },
        { 
            name: "Tourette’s", 
            icon: "🔔", 
            tagline: "Involuntary tics & high creativity.",
            color: "bg-indigo-50 border-indigo-200 text-indigo-800"
        }
    ];

    const barriers = [
        { 
            title: "Physical Environment", 
            desc: "The physical layout of spaces (noise, lighting, crowding) can create significant distress.",
            icon: <Layout className="text-blue-500" size={20} />
        },
        { 
            title: "Communication Styles", 
            desc: "Inflexible communication norms often alienate those who process information differently.",
            icon: <MessageSquare className="text-emerald-500" size={20} />
        },
        { 
            title: "Social Expectations", 
            desc: "Unspoken rules and rigid social hierarchies create unnecessary pressure and exclusion.",
            icon: <Users className="text-rose-500" size={20} />
        },
        { 
            title: "Institutional Bias", 
            desc: "Hiring practices and school testing often fail to measure the true potential of neurominorities.",
            icon: <ShieldAlert className="text-amber-500" size={20} />
        }
    ];

    return (
        <section className="py-32 px-6 lg:px-16 bg-white" id="services">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="font-data text-xs uppercase tracking-[0.2em] text-blue-900/40 font-bold mb-4 block">Our Focus</span>
                    <h2 className="text-5xl md:text-7xl font-drama italic text-blue-950 mb-8 leading-[0.9]">Who We Support.</h2>
                    <p className="font-sans text-lg text-blue-950/60 leading-relaxed font-light mx-auto max-w-2xl">
                        ION represents and advocates for the neurominority community - those whose brains process, learn, and behave differently from the statistical average.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {neurotypes.map((type, i) => (
                        <div key={i} className={`p-8 rounded-[2rem] border ${type.color} transition-all hover:scale-[1.02] duration-500 shadow-sm hover:shadow-md`}>
                            <div className="text-4xl mb-4">{type.icon}</div>
                            <h4 className="font-heading font-bold text-xl mb-2">{type.name}</h4>
                            <p className="font-sans text-sm opacity-70 leading-relaxed">{type.tagline}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    {/* Barriers Toggle Button */}
                    <button 
                        onClick={() => setShowBarriers(!showBarriers)}
                        className="flex items-center gap-3 bg-blue-950 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all group shadow-lg hover:shadow-accent/20"
                    >
                        <span>Understanding Systemic Barriers</span>
                        <ChevronDown className={`transition-transform duration-500 ${showBarriers ? 'rotate-180' : ''}`} size={18} />
                    </button>
                </div>

                {/* Systemic Barriers Accordion Content */}
                <div className={`mt-16 overflow-hidden transition-all duration-700 ease-in-out ${showBarriers ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#f8fbff] rounded-[3rem] p-12 border border-blue-900/5">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="w-full md:w-1/3 text-center md:text-left">
                                <h3 className="text-3xl font-heading font-bold text-blue-950 mb-4 tracking-tight">Systemic Barriers</h3>
                                <p className="font-sans text-sm text-blue-950/50 leading-relaxed italic">
                                    "It is not the neurotype that disables, but the environment's inability to accommodate it."
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {barriers.map((barrier, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-blue-900/5 shadow-sm hover:shadow-md transition-all">
                                        <div className="w-10 h-10 rounded-xl bg-blue-900/5 flex items-center justify-center mb-4">
                                            {barrier.icon}
                                        </div>
                                        <h4 className="font-heading font-bold text-blue-950 text-sm mb-2">{barrier.title}</h4>
                                        <p className="font-sans text-xs text-blue-950/60 leading-relaxed font-light">{barrier.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// PILLAR 1: DIAGNOSTIC SHUFFLER (Education)
// ==========================================
function DiagnosticShuffler() {
    const [cards, setCards] = useState([
        { id: 1, title: 'Experiential Workshop', desc: 'Hands-on experience developing deeper understanding of neurodiverse challenges and strengths.' },
        { id: 2, title: 'Certification Programs', desc: 'Recognizing institutions implementing inclusive practices in workplaces and schools.' },
        { id: 3, title: 'National Campaigns', desc: 'Annual awareness campaign in collaboration with mainstream media and digital platforms.' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCards(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[440px] w-full bg-[#f0f7ff] rounded-[2.5rem] border border-blue-900/10 shadow-sm p-8 flex flex-col group hover:shadow-xl transition-all duration-700 overflow-hidden">
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-blue-900/10">
                    <img src="/Assets/Educationicon-01.png" alt="Education" className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-medium text-blue-900 text-[10px] uppercase tracking-widest bg-blue-900/5 px-3 py-1 rounded-full border border-blue-900/10 backdrop-blur-sm">01. Education & Awareness</h3>
            </div>

            <div className="relative w-full h-full mt-16 z-10 flex items-center justify-center">
                {cards.map((card, i) => (
                    <div
                        key={card.id}
                        className={`absolute w-full max-w-[280px] bg-white border border-blue-900/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-700 ease-in-out shadow-sm`}
                        style={{
                            transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
                            opacity: 1 - i * 0.3,
                            zIndex: 10 - i,
                        }}
                    >
                        <div>
                            <h4 className="font-heading font-semibold text-blue-950 text-base mb-2">{card.title}</h4>
                            <p className="font-sans text-xs text-blue-950/60 leading-relaxed font-light">{card.desc}</p>
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <span className="font-data text-[10px] text-blue-900/40">[{card.id < 10 ? `0${card.id}` : card.id}]</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// PILLAR 2: TELEMETRY TYPEWRITER (Mentorship)
// ==========================================
function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const messages = [
        "INITIATING SUPPORT PROTOCOL...",
        "ESTABLISHING MENTORSHIP NEXUS...",
        "MATCHING NEUROMINORITY TALENT...",
        "BUILDING PEER-SUPPORT NETWORKS...",
        "ANALYZING CAREER ADAPTATIONS...",
        "STATUS: EMPOWERMENT ACTIVE"
    ];
    const charIdxRef = useRef(0);
    const msgIdxRef = useRef(0);
    const typingRef = useRef(true);

    useEffect(() => {
        let lastTime = 0;
        let animationFrameId;

        const type = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const msPerChar = 40;
            const pauseTime = 2000;
            const currentMsg = messages[msgIdxRef.current];

            if (timestamp - lastTime > (typingRef.current ? msPerChar : pauseTime)) {
                if (typingRef.current) {
                    if (charIdxRef.current < currentMsg.length) {
                        charIdxRef.current += 1;
                        setText(currentMsg.substring(0, charIdxRef.current));
                        lastTime = timestamp;
                    } else {
                        typingRef.current = false;
                        lastTime = timestamp;
                    }
                } else {
                    msgIdxRef.current = (msgIdxRef.current + 1) % messages.length;
                    charIdxRef.current = 0;
                    setText('');
                    typingRef.current = true;
                    lastTime = timestamp;
                }
            }
            animationFrameId = requestAnimationFrame(type);
        };

        animationFrameId = requestAnimationFrame(type);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative h-[440px] w-full bg-[#fff9eb] rounded-[2.5rem] p-8 flex flex-col group overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-700">
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-amber-900/10">
                    <img src="/Assets/Mentorshipicon-01.png" alt="Mentorship" className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-medium text-amber-600 text-[10px] uppercase tracking-widest bg-amber-600/5 px-3 py-1 rounded-full border border-amber-600/10 backdrop-blur-sm">02. Support & Mentorship</h3>
            </div>

            <div className="flex-1 mt-16 rounded-2xl bg-white/60 border border-amber-900/5 p-6 flex flex-col font-mono text-[10px] overflow-hidden">
                <div className="flex items-center gap-2 mb-6 text-amber-600/60 pb-3 border-b border-amber-900/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.3)]"></div>
                    <span className="tracking-widest capitalize">LIVE_TELEMETRY // MENTORSHIP</span>
                </div>

                <div className="space-y-3 opacity-40 text-amber-900 italic">
                    <p>{'>'} WORKPLACE_MENTORSHIP_SYS: ONLINE</p>
                    <p>{'>'} STUDENT_BUDDY_SYS: STANDBY</p>
                    <p>{'>'} SUPPORT_NETWORKS_SECURE: VERIFIED</p>
                </div>

                <div className="mt-8 flex gap-2 text-amber-700 font-medium text-xs leading-relaxed">
                    <span className="opacity-50">#</span>
                    <span>{text}<span className="inline-block w-2.5 h-4 bg-amber-500 ml-1 animate-pulse align-middle"></span></span>
                </div>

                <div className="mt-auto pt-6 flex justify-between text-amber-900/20 text-[9px] tracking-widest uppercase">
                    <span>UPTIME: 99.9%</span>
                    <span>FRQ: 0.85 HZ</span>
                </div>
            </div>
        </div>
    );
}

// ==========================================
// PILLAR 3: NETWORK TOPOLOGY (Community)
// ==========================================
function CommunityTopology() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const m = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let width, height;

        const init = () => {
            const rect = containerRef.current.getBoundingClientRect();
            width = canvas.width = rect.width;
            height = canvas.height = rect.height;
            particles = [];
            for (let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                if (m.current.active) {
                    const dx = m.current.x - p.x;
                    const dy = m.current.y - p.y;
                    const d = Math.sqrt(dx*dx + dy*dy);
                    if (d < 100) {
                        p.x -= dx * 0.02; p.y -= dy * 0.02;
                    }
                }
            });

            ctx.lineWidth = 1.2;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx*dx + dy*dy);
                    if (d < 70) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(118, 198, 145, ${1 - d/70})`;
                        ctx.stroke();
                    }
                }
            }
            ctx.fillStyle = '#059669'; // Deeper higher contrast emerald
            particles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
            });
            animationFrameId = requestAnimationFrame(draw);
        };

        init(); draw();
        const handleMove = (e) => {
            const r = canvas.getBoundingClientRect();
            m.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
        };
        window.addEventListener('resize', init);
        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('mouseleave', () => m.current.active = false);
        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return (
        <div ref={containerRef} className="relative h-[440px] w-full bg-[#f6fcf9] rounded-[2.5rem] border border-emerald-900/5 shadow-sm p-8 flex flex-col group overflow-hidden transition-all duration-700 hover:shadow-xl">
             <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-emerald-900/10">
                    <img src="/Assets/Communityicon-01.png" alt="Community" className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-medium text-emerald-900 text-[10px] uppercase tracking-widest bg-emerald-900/5 px-3 py-1 rounded-full border border-emerald-900/10 backdrop-blur-sm">03. Community Engagement</h3>
            </div>
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></canvas>
            <div className="mt-auto relative z-10 flex flex-wrap gap-2 justify-center pb-2">
                {[
                    "Interactive online forums",
                    "Networking events",
                    "Creative showcases",
                    "Connecting neurominorities & allies"
                ].map((text, i) => (
                    <div key={i} className="px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-900/10 backdrop-blur-md transition-all duration-700 group-hover:bg-[#76C691] group-hover:border-[#76C691] group-hover:shadow-md group-hover:shadow-emerald-900/20 hover:-translate-y-0.5">
                        <span className="font-heading font-semibold text-emerald-900/70 group-hover:text-white text-[11px] leading-none tracking-wide transition-colors duration-700">{text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// PILLAR 4: POLICY FRAMEWORK (Advocacy)
// ==========================================
function PolicyFramework() {
    return (
        <div className="relative h-[440px] w-full bg-[#fdf8f8] rounded-[2.5rem] border border-rose-900/5 shadow-sm p-8 flex flex-col group overflow-hidden transition-all duration-700 hover:shadow-xl">
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-rose-900/10">
                    <img src="/Assets/Policy-01.png" alt="Policy" className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading font-medium text-rose-900 text-[10px] uppercase tracking-widest bg-rose-900/5 px-3 py-1 rounded-full border border-rose-900/10 backdrop-blur-sm">04. Policy & Advocacy</h3>
            </div>
            
            <div className="mt-20 relative z-10 flex-1 flex flex-col justify-between">
                
                {/* Document Stack Animation */}
                <div className="relative w-full max-w-[120px] aspect-[3/4] mx-auto mb-6">
                    {/* Background Document 2 (Left) */}
                    <div className="absolute inset-0 bg-white/40 border border-rose-900/10 rounded-xl shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:-rotate-12 group-hover:-translate-x-8 group-hover:-translate-y-2 flex flex-col p-3 gap-2 backdrop-blur-sm">
                        <div className="w-1/3 h-1 bg-rose-900/10 rounded-full"></div>
                        <div className="w-3/4 h-1 bg-rose-900/10 rounded-full"></div>
                        <div className="w-5/6 h-1 bg-rose-900/10 rounded-full"></div>
                    </div>
                    {/* Background Document 1 (Right) */}
                    <div className="absolute inset-0 bg-white/70 border border-rose-900/10 rounded-xl shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:rotate-12 group-hover:translate-x-8 group-hover:-translate-y-2 flex flex-col p-3 gap-2 backdrop-blur-md">
                        <div className="w-1/2 h-1 bg-rose-900/15 rounded-full"></div>
                        <div className="w-4/5 h-1 bg-rose-900/15 rounded-full"></div>
                        <div className="w-full h-1 bg-rose-900/15 rounded-full"></div>
                    </div>
                    {/* Foreground Document (Center) */}
                    <div className="absolute inset-0 bg-white border border-rose-900/15 rounded-xl shadow-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group-hover:-translate-y-6 flex flex-col p-3 gap-2.5 z-10">
                        <div className="flex items-center gap-2 mb-1 border-b border-rose-900/5 pb-2">
                            <div className="w-4 h-4 rounded bg-rose-50 flex items-center justify-center">
                                <FileText className="text-rose-400" size={10} />
                            </div>
                            <div className="w-1/2 h-1 bg-rose-900/20 rounded-full"></div>
                        </div>
                        <div className="w-full h-1 bg-rose-900/10 rounded-full"></div>
                        <div className="w-5/6 h-1 bg-rose-900/10 rounded-full"></div>
                        <div className="w-4/5 h-1 bg-rose-900/10 rounded-full"></div>
                        <div className="w-2/3 h-1 bg-rose-900/10 rounded-full"></div>
                        
                        <div className="mt-auto flex items-center justify-between opacity-50">
                            <div className="w-1/3 h-1 bg-rose-900/20 rounded-full"></div>
                            <div className="w-3 h-3 rounded-full bg-rose-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center mt-4 mb-2">
                    {[
                        "Legislative Engagement",
                        "Caregiver Advocacy",
                        "Inclusive Hiring Partners"
                    ].map((text, i) => (
                        <div key={i} className="px-4 py-2 rounded-full bg-white/60 border border-rose-900/10 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 whitespace-nowrap hover:bg-white hover:border-rose-900/30">
                            <span className="font-heading font-semibold text-rose-950/80 text-xs leading-none tracking-wide">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-auto flex justify-between items-center text-[9px] font-data text-rose-900/30 uppercase tracking-[0.2em]">
                <span>Framework // 2026</span>
                <span>Registry: Verified</span>
            </div>
        </div>
    );
}

function Philosophy() {
    return (
        <section className="py-32 px-6 lg:px-16 bg-[#fcfcfd]" id="pillars">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-data text-xs uppercase tracking-[0.2em] text-blue-900/40 font-bold">How We Work</span>
                        <div className="h-px bg-blue-900/10 flex-1"></div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
                        <div>
                            <h2 className="text-5xl md:text-8xl font-drama italic text-blue-950 mb-6 drop-shadow-sm tracking-tighter leading-[0.8]">Our Core <br/>Philosophy.</h2>
                            <p className="font-sans font-light text-blue-950/50 max-w-xl leading-relaxed text-lg italic border-l-2 border-accent/20 pl-8">
                                We address the sensory and cognitive needs of those most at risk, creating environments that are healthier and more resilient for everyone.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                             <div className="flex items-center gap-3 bg-blue-950 text-white px-8 py-4 rounded-[2rem] border border-white/10 shadow-xl">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>
                                <span className="font-data text-[10px] tracking-[0.25em] uppercase font-bold">System Status // Optimal</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    <DiagnosticShuffler />
                    <TelemetryTypewriter />
                    <CommunityTopology />
                    <PolicyFramework />
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 5. LEADERSHIP DIALOGUE (Carousel)
// ==========================================
// ==========================================
// 5. LEADERSHIP DIALOGUE (Carousel)
// ==========================================
function LeadershipDialogue() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const slides = [
        "/Assets/slide-1--NerBnWf-sZJswuKcfBmfA.png",
        "/Assets/slide-2-KIN7Rnhm0L93rN21IuUw8g.png",
        "/Assets/slide-3-xCrQYvOt-lnmxjY2sx6oDQ.png",
        "/Assets/slide-4-RY61D-y2yPkeDQmExduK6A.png",
        "/Assets/slide-5-wngjyaylFrXGJHrMq6iMAQ.png"
    ];
    
    const brandColors = ['bg-primary', 'bg-ion-green', 'bg-ion-yellow', 'bg-accent', 'bg-primary'];

    // Auto-advance
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % slides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isHovered, slides.length]);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="py-20 bg-background" id="tuna-dialogue">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl lg:text-5xl font-drama italic text-dark tracking-tight">ION SG Leadership Dialogue</h2>
                </div>
                
                {/* Carousel Shell */}
                <div 
                    className="relative w-full max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#f5f5f7] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-4 border-white ring-1 ring-dark/5 flex flex-col"
                >
                    {/* Top Progress Bars */}
                    <div className="w-full pt-6 px-8 pb-4 flex gap-2">
                        {slides.map((_, i) => (
                            <div key={i} className="h-1.5 flex-1 bg-black/10 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${brandColors[i]} transition-all duration-[4.5s] ease-linear`}
                                    style={{ 
                                        width: i < activeIdx ? '100%' : i === activeIdx ? '100%' : '0%',
                                        transitionDuration: i === activeIdx && !isHovered ? '4.5s' : '0s'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Viewport & Track */}
                    <div 
                        className="relative w-full overflow-hidden flex px-8"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-sm border border-black/5 bg-white/50">
                            {slides.map((slide, i) => (
                                <div 
                                    key={i}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    style={{ transform: `translateX(${(i - activeIdx) * 100}%)` }}
                                >
                                    <img src={slide} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="w-full pb-6 pt-4 px-8 flex items-center justify-between gap-4">
                        <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-dark flex items-center justify-center transition-colors shrink-0 shadow-sm border border-black/5">
                            <ChevronLeft size={20} />
                        </button>
                        
                        <div className="flex-1 flex justify-center items-center gap-4">
                            {/* Dots Only */}
                            {slides.map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? `${brandColors[i]} scale-125 shadow-sm` : 'bg-black/10 hover:bg-black/20'}`}
                                ></button>
                            ))}
                        </div>

                        <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-dark flex items-center justify-center transition-colors shrink-0 shadow-sm border border-black/5">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="https://www.eventbrite.sg/e/ion-singapore-leadership-dialogue-tuna-world-brain-economy-readiness-tickets-1985038164586?aff=oddtdtcreator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 group bg-accent hover:bg-accent/90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 font-sans text-sm tracking-wide shadow-lg shadow-accent/20 hover:shadow-xl hover:-translate-y-1"
                    >
                        <span>Register Here on Eventbrite</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 6. ION CAREGIVERS CIRCLE
// ==========================================
function CaregiversCircle() {
    return (
        <section className="py-32 px-6 lg:px-16" id="caregivers-circle" style={{ background: 'linear-gradient(180deg, #f4f9f6 0%, #edf5ef 100%)' }}>
            <div className="max-w-7xl mx-auto">
                 <div className="bg-white rounded-[40px_16px_40px_16px] shadow-sm border border-emerald-900/5 p-8 lg:p-16 flex flex-col lg:flex-row-reverse gap-16 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center gap-3 mb-8">
                             <div className="w-10 h-10 rounded-full bg-emerald-900/5 flex items-center justify-center">
                                <Heart className="text-emerald-900" size={20} />
                            </div>
                            <span className="font-data text-xs uppercase tracking-widest text-emerald-900/40 font-bold">Safe Space</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-drama italic text-emerald-950 mb-8 leading-[0.9]">Caregivers <br/>Circle.</h2>
                        <div className="flex flex-col gap-6 text-emerald-950/70 font-light leading-relaxed mb-10 border-l-2 border-emerald-900/10 pl-6 text-left">
                            <p className="font-sans text-base">
                                Caring for a neurodivergent child, youth, or adult often means carrying a lot quietly. The planning, advocacy, and emotional labour rarely pause. Many caregivers put careers, independence, and parts of themselves on hold to support someone they love, while holding an unspoken question about the future.
                            </p>
                            <p className="font-sans text-base">
                                The <strong>ION Caregivers Circle</strong> is a monthly online space created for caregivers to pause, connect, and be heard without judgement or expectations.
                            </p>
                            <ul className="list-none space-y-2 font-sans text-sm mt-2 mb-2">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-900/40"></span> A safe, judgement-free space</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-900/40"></span> No pressure to share — listening is welcome</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-900/40"></span> Grounded in lived experience and mutual respect</li>
                            </ul>
                            <p className="font-sans text-base">
                                Come as you are. Share, listen, or simply sit with others who understand.
                            </p>
                            <div className="bg-emerald-900/5 p-4 rounded-xl inline-block mt-4 border border-emerald-900/10">
                                <p className="font-heading font-semibold text-emerald-950 text-xs tracking-wider uppercase mb-1">Next session:</p>
                                <p className="font-sans text-sm">Thursday, 5th March 2026<br/>8.30pm – 9.30pm (via Zoom)</p>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <a href="https://www.eventbrite.sg/e/caregivers-circle-a-safe-space-for-caregivers-of-neurodivergent-children-tickets-1982755675600?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer" className="bg-emerald-950 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all inline-flex items-center gap-3 group">
                                <span>Go to Eventbrite</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="rounded-[30px_12px_30px_12px] overflow-hidden border-[12px] border-emerald-900/5 shadow-2xl bg-white">
                            <img 
                                src="/Assets/caregivers circle march 5th.jpeg" 
                                alt="Caregivers Circle" 
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 7. WHITEPAPER SECTION
// ==========================================
function Whitepaper() {
    const [status, setStatus] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get('company')) { // Honeypot
            setSubmitted(true);
            return;
        }

        setStatus('Processing...');
        try {
            await fetch('https://script.google.com/macros/s/AKfycbwoichNFEdDVmpzpFaKKsd2CevBtBM23SMJI2LOUwd_e8O97qP191Zu9ePOoszYpOkqzg/exec', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            setStatus('Ready for download.');
            setSubmitted(true);
        } catch (err) {
            setStatus('Connection error. Try again.');
        }
    };

    return (
        <section className="py-32 px-6 lg:px-16" id="whitepaper" style={{ background: 'linear-gradient(170deg, #f9fbff 0%, #edf3fb 100%)' }}>
            <div className="max-w-7xl mx-auto">
                 <div className="bg-white rounded-[18px_38px_18px_38px] shadow-sm border border-blue-900/5 p-8 lg:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
                        <div>
                             <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-blue-900/5 flex items-center justify-center">
                                    <FileText className="text-blue-900" size={20} />
                                </div>
                                <span className="font-data text-xs uppercase tracking-widest text-blue-900/40 font-bold">Whitepaper // 2025</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-drama italic text-blue-950 mb-10 leading-[0.8] tracking-tighter">Neurodesign <br/>Roundtable.</h2>
                            
                            <blockquote className="relative p-10 rounded-3xl bg-blue-50/50 border border-blue-900/5 italic mb-8">
                                <p className="font-sans text-xl text-blue-950/70 leading-relaxed font-light mb-6">
                                    "Neuro-inclusive design is a timely response. By addressing the sensory and cognitive needs of those most at risk of exclusion, we create environments that focus on resilience."
                                </p>
                                <footer className="font-data text-[10px] tracking-widest text-blue-900/40 uppercase">
                                    — KAY SARGENT, Senior Principal | HOK
                                </footer>
                            </blockquote>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative group max-w-sm">
                                <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <img 
                                    src="/Assets/whitepaper cover.png" 
                                    alt="Whitepaper Cover" 
                                    className="relative z-10 w-full h-auto rounded-2xl shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-700 border-4 border-white" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto border-t border-blue-900/5 pt-12">
                        {submitted ? (
                            <div className="text-center bg-blue-50 p-10 rounded-3xl border border-blue-900/10">
                                <h3 className="text-2xl font-heading font-bold mb-4 text-blue-950">Document Access Authorized</h3>
                                <p className="font-sans text-blue-950/50 mb-8 font-light italic">Thank you for your interest in the Neurodesign Roundtable Whitepaper.</p>
                                <a 
                                    href="/Assets/Neurodesign-DesigningCitiesforEveryMind-W5awEs7u66J8nZPizjd9Sg.pdf" 
                                    className="bg-blue-950 text-white px-12 py-5 rounded-full inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all"
                                    download
                                >
                                    <span>Download Source (PDF)</span>
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                                <input type="text" name="name" placeholder="Full Name" required className="flex-1 px-8 py-5 rounded-2xl bg-blue-50/50 border border-blue-900/5 focus:border-blue-900/20 focus:bg-white outline-none transition-all font-sans text-sm" />
                                <input type="email" name="email" placeholder="Email Address" required className="flex-1 px-8 py-5 rounded-2xl bg-blue-50/50 border border-blue-900/5 focus:border-blue-900/20 focus:bg-white outline-none transition-all font-sans text-sm" />
                                <input type="text" name="company" className="hidden" />
                                <button type="submit" className="bg-blue-950 text-white px-10 py-5 rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-accent transition-all whitespace-nowrap">
                                    Request Access
                                </button>
                                {status && <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-data text-blue-900">{status}</p>}
                            </form>
                        )}
                        <p className="text-[10px] text-blue-950/30 text-center mt-8 uppercase tracking-widest font-bold">
                            Official ION Strategic Publication // Restricted Distribution
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 8. TEAM SECTION
// ==========================================
function Team() {
    const members = [
        { name: "Hazleen Ahmad", role: "Chair", img: "WhatsAppImage2025-11-12at09.36.01-XT7G2dPryHCtnAP5vx4K6w.jpeg", linkedin: "https://www.linkedin.com/in/hazleen/" },
        { name: "Abdul Rohim Sarip", role: "President", img: "Screenshot2025-03-25150731.png", linkedin: "http://linkedin.com/in/a-rohim-sarip-bbm-pbm-57b78951" },
        { name: "Dr. Atiqah Azhari", role: "Advisor", img: "ProfAtiqah_headshot-Go6OHhLTrZId7jl6nSdkSA.jpg", linkedin: "https://www.linkedin.com/in/atiqah-azhari" },
        { name: "Ong Chee Keong", role: "Advisor", img: "WhatsAppImage2026-02-12at16.42.42-zP_wR0vx4hXKBFh6MZ3drQ.jpeg", linkedin: "https://www.linkedin.com/in/ong-chee-keong-pbm-cftp-gfi-chartered-fellow-6944b032" },
        { name: "Sid Hamid", role: "Strategic Associate", img: "ProfilePhoto_SidHamid-EW0ItbJDjPvdTfwNXPYM3A.jpg", linkedin: "https://www.linkedin.com/in/wildtranstrickstery/" },
        { name: "Gayathri Ramaswami", role: "Treasurer", img: "gayathri-f0-LAw2ObHQYOin6okUxBw.jpg", linkedin: "https://www.linkedin.com/in/gayathri-ramaswami" },
        { name: "Juanita Mega", role: "Partnerships & Fundraising", img: "juanita-uTwf_o-8XY2hkXof7Y2fKg.jpg", linkedin: "https://www.linkedin.com/in/juanitamega" },
        { name: "Sindhu Chengad", role: "Programmes & Community Engagement", img: "SindhuChengadHeadshot-zAPAp-oOmaWWvVmC-DkZvw.JPEG", linkedin: "https://www.linkedin.com/in/sindhuc" },
        { name: "Leonard Lim", role: "Corporate & Strategic Partnerships", img: "leonardlim-EtEiltfq54rpmTA_5OJaWw.jpeg", linkedin: "https://www.linkedin.com/in/leonard-lim-640b42246" },
        { name: "Shiyun Lim", role: "Strategic Insurance", img: "ML0802220295-VpLxypfvuBgFPcIUf9UukA.png", linkedin: "https://www.linkedin.com/in/limshiyun" },
        { name: "Dr Faisal Aman", role: "Education & Neurodiversity Advocacy", img: "faisalaman-CKECfItS-Pl95fkHAYYzjQ.jpg", linkedin: "https://www.linkedin.com/in/dr-faisal-aman-phd-8b7669242" },
        { name: "Gene Kam", role: "Higher Education & Neurodiversity Advocacy", img: "genekam-pd8rcQ9Ik3WksMU5OydcCw.jpg", linkedin: "https://www.linkedin.com/in/genekam" },
        { name: "David Ng", role: "Advisor", img: "DavidNg-6fsEnI_TBQNiQs27wJX94A.jpeg", linkedin: "https://www.linkedin.com/in/david-ng-a2398236" },
        { name: "Subha Imtiaz", role: "Strategic Associate", img: "SubhaImtiaz-JsgUa2Dar8fNk7Ux71JhCA.jpeg", linkedin: "https://www.linkedin.com/in/subhaimtiaz001" },
        { name: "Hana Saemon Beck", role: "Strategic Associate", img: "HanaSaemon-Beck-eRTQvFpmBbcKb635v8hjng.jpg", linkedin: "https://www.linkedin.com/in/hana-saemon-beck" }
    ];

    return (
        <section className="py-32 px-6 lg:px-16 bg-background relative" id="team">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                     <div className="flex items-center gap-4 mb-8">
                        <span className="font-data text-xs uppercase tracking-[0.2em] text-primary/60">People // Strategy</span>
                        <div className="h-px bg-primary/30 flex-1"></div>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-drama italic text-dark mb-4 leading-none tracking-tighter">Our Board.</h2>
                    <p className="font-sans text-xl text-dark/50 font-light italic leading-relaxed max-w-xl">
                        A diverse multidisciplinary collective driving systemic transformation across the region.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-12">
                    {members.map((member, i) => (
                        <div key={i} className="group flex flex-col items-center text-center">
                            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border border-dark/5 shadow-sm group-hover:scale-105 group-hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                <img
                                    src={`/Assets/${member.img}`}
                                    alt={member.name}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=F5F7FA&color=2E4036` }}
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                             <div className="flex flex-col items-center">
                                <h3 className="font-heading font-bold text-dark text-lg leading-tight group-hover:text-primary transition-colors">{member.name}</h3>
                                <p className="font-data text-[10px] text-dark/40 uppercase tracking-[0.2em] font-medium mt-2">{member.role}</p>
                                {member.linkedin && (
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="mt-3 text-primary/40 hover:text-primary transition-all duration-300 transform hover:scale-110"
                                        title={`${member.name}'s LinkedIn`}
                                    >
                                        <Linkedin size={16} strokeWidth={1.5} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 9. INVITATION & CONTACT
// ==========================================
function Invitation() {
    return (
        <section className="py-32 px-6 lg:px-16 bg-dark text-background relative overflow-hidden" id="contact">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
                    <div className="lg:col-span-2">
                        <h2 className="text-6xl md:text-[10rem] font-drama italic text-accent mb-12 leading-[0.8] tracking-tighter">Every mind<br/>deserves to thrive.</h2>
                        <p className="text-2xl md:text-3xl font-sans font-light opacity-60 max-w-2xl leading-relaxed mb-16 italic">
                            Building a Singapore where neurodiversity is celebrated as our fundamental strength.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-6 group">
                                <h3 className="text-3xl font-heading font-medium text-accent border-b border-background/10 pb-4 group-hover:border-accent transition-colors">Donate</h3>
                                <p className="font-sans text-base opacity-40 leading-relaxed">Support our mission by funding essential resources for neurominorities.</p>
                                <a href="mailto:comms@ioneurodiversity.sg" className="font-data text-xs tracking-widest uppercase hover:text-accent transition-all flex items-center gap-4">
                                    Initiate Support <ArrowRight size={14} />
                                </a>
                            </div>
                            <div className="flex flex-col gap-6 group">
                                <h3 className="text-3xl font-heading font-medium text-primary border-b border-background/10 pb-4 group-hover:border-primary transition-colors">Participate</h3>
                                <p className="font-sans text-base opacity-40 leading-relaxed">Become an ION volunteer or attend our public awareness workshops.</p>
                                <a href="mailto:comms@ioneurodiversity.sg" className="font-data text-xs tracking-widest uppercase hover:text-primary transition-all flex items-center gap-4">
                                    Get Involved <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div className="p-12 rounded-[4rem] bg-accent text-dark flex flex-col gap-10 hover:translate-y-[-8px] transition-all duration-700 shadow-2xl relative group">
                             <div className="absolute top-8 right-8 w-16 h-16 rounded-full border border-dark/10 flex items-center justify-center opacity-40">
                                <Mail size={32} />
                             </div>
                             <div>
                                <h3 className="text-3xl font-heading font-bold mb-2">Connect</h3>
                                <a href="mailto:comms@ioneurodiversity.sg" className="text-xl font-sans underline underline-offset-8 block break-all font-medium">comms@ioneurodiversity.sg</a>
                             </div>
                             <p className="font-sans text-sm opacity-60 leading-relaxed uppercase tracking-widest font-bold">Inquiries & Partnerships</p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <a href="https://www.linkedin.com/company/institute-of-neurodiversity-singapore/" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-[3rem] bg-[#0077B5] border border-white/10 flex items-center justify-center hover:scale-[1.02] transition-all group shadow-lg">
                                <Linkedin size={32} className="text-white opacity-100 transition-all group-hover:scale-110" />
                            </a>
                            <a href="https://ioneurodiversity.org/" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-[3rem] bg-primary border border-white/10 flex items-center justify-center hover:scale-[1.02] transition-all group shadow-lg">
                                <img src="/Assets/Logo-01.png" alt="ION" className="h-8 w-auto brightness-0 invert opacity-100 transition-all group-hover:scale-110" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ==========================================
// 10. MAIN APP
// ==========================================
export default function App() {
    useEffect(() => {
        // Smooth scroll implementation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }, []);

    return (
        <div className="bg-background text-dark font-sans selection:bg-accent selection:text-background antialiased">
            <Navbar />
            <main>
                <Hero />
                <About />
                <WhoWeSupport />
                <Philosophy />
                <LeadershipDialogue />
                <CaregiversCircle />
                <Whitepaper />
                <Team />
                <Invitation />
            </main>
            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <footer className="bg-[#0c0c0c] text-background/80 px-6 lg:px-16 pt-32 pb-12 overflow-hidden border-t border-background/5">
            <div className="max-w-7xl mx-auto flex flex-col gap-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-8">
                    <div className="lg:col-span-2">
                        <img src="/Assets/Logo-01.png" alt="ION" className="h-10 w-auto mb-10 brightness-0 invert opacity-90" />
                        <h3 className="text-4xl font-drama italic text-background mb-6 leading-tight tracking-tighter">Institute of <br/>Neurodiversity.</h3>
                        <p className="font-sans font-light text-background/30 max-w-sm leading-relaxed text-lg">
                            Transforming the lives of neurominorities in Singapore through Awareness, Representation, and Research.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h4 className="font-data text-[10px] tracking-[0.3em] uppercase mb-10 text-primary/60">Ecosystem</h4>
                            <div className="flex flex-col gap-6 font-sans font-medium text-sm">
                                <a href="#about" className="hover:text-accent transition-colors w-fit">History & Story</a>
                                <a href="#pillars" className="hover:text-accent transition-colors w-fit">Core Philosophy</a>
                                <a href="#tuna-dialogue" className="hover:text-accent transition-colors w-fit">Leadership Dialogue</a>
                                <a href="#team" className="hover:text-accent transition-colors w-fit">Board of Advisors</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-background/5 text-[10px] font-data tracking-widest uppercase text-background/20">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-background/5 px-6 py-3 rounded-full border border-background/10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
                            <span className="opacity-70">SG_ION_NODE//ACTIVE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <span>© 2026 ION SG // GLOBAL STANDARDS</span>
                        <div className="flex gap-10">
                            <a href="#" className="hover:text-accent transition-colors">Privacy_Protocol</a>
                            <a href="#" className="hover:text-accent transition-colors">Digital_Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
