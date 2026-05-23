'use client';
import { useEffect, useState, useRef } from 'react';
import {
  Sparkles, Mic, ScrollText, Languages, Award, Globe, Brain, Zap,
  ArrowRight, Volume2, Check, ChevronRight, Menu, X,
  Play, Star, TrendingUp, Activity, Cpu, Loader2, Crown, Eye, Flame
} from 'lucide-react';
import { TRANSLATIONS } from '@/lib/i18n';
import { IDIOMAS } from '@/lib/core';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ============================================================
//  TORRE DE BABEL · con el Ojo Divino que todo lo ve en la cumbre
// ============================================================
function BabylonTower({ size = 80, className = '' }) {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className={className} fill="none">
      <defs>
        <linearGradient id="tower-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <radialGradient id="eye-iris-tower" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0a1855" />
        </radialGradient>
        <radialGradient id="divine-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base sombra */}
      <ellipse cx="50" cy="115" rx="38" ry="4" stroke="#5eead4" strokeOpacity="0.3" strokeWidth="0.5" />

      {/* 4 niveles de la torre */}
      <rect x="20" y="92" width="60" height="22" rx="2" stroke="url(#tower-grad)" strokeWidth="1.5" />
      <rect x="25" y="72" width="50" height="20" rx="2" stroke="url(#tower-grad)" strokeWidth="1.5" />
      <rect x="30" y="52" width="40" height="20" rx="2" stroke="url(#tower-grad)" strokeWidth="1.5" />
      <rect x="35" y="32" width="30" height="20" rx="2" stroke="url(#tower-grad)" strokeWidth="1.5" />

      {/* Pedestal del ojo */}
      <rect x="42" y="26" width="16" height="6" rx="1" stroke="url(#tower-grad)" strokeWidth="1" />

      {/* Glow divino detrás del ojo */}
      <circle cx="50" cy="15" r="18" fill="url(#divine-glow)" className="animate-pulse" />

      {/* OJO DIVINO QUE TODO LO VE */}
      {/* Triángulo de la providencia */}
      <path
        d="M 50 4 L 64 24 L 36 24 Z"
        stroke="#fbbf24"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Almendra del ojo */}
      <path
        d="M 41 15 Q 50 9 59 15 Q 50 21 41 15 Z"
        stroke="#fbbf24"
        strokeWidth="1"
        fill="rgba(2,8,32,0.8)"
      />
      {/* Iris */}
      <circle cx="50" cy="15" r="3.5" fill="url(#eye-iris-tower)" />
      {/* Pupila */}
      <circle cx="50" cy="15" r="1.4" fill="#020410" />
      {/* Reflejo divino */}
      <circle cx="49" cy="14" r="0.6" fill="#fff" />

      {/* Rayos divinos rotando */}
      <g style={{ transformOrigin: '50px 15px' }} className="animate-rune">
        {[0, 60, 120, 180, 240, 300].map(angle => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 50 + Math.cos(rad) * 12;
          const y1 = 15 + Math.sin(rad) * 12;
          const x2 = 50 + Math.cos(rad) * 16;
          const y2 = 15 + Math.sin(rad) * 16;
          return (
            <line
              key={angle}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#fbbf24"
              strokeWidth="0.6"
              opacity="0.7"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
}

// ============================================================
//  CÍRCULO RÚNICO · marca mística rotante
// ============================================================
function RunicCircle({ size = 60, className = '' }) {
  const runes = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח'];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none">
      <defs>
        <linearGradient id="rune-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <g className="animate-rune" style={{ transformOrigin: 'center' }}>
        <circle cx="50" cy="50" r="45" stroke="url(#rune-grad)" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="50" cy="50" r="38" stroke="url(#rune-grad)" strokeWidth="0.5" opacity="0.4" />
        {runes.map((r, i) => {
          const angle = (i / runes.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 42;
          const y = 50 + Math.sin(angle) * 42;
          return (
            <text key={i} x={x} y={y + 3} fontSize="6" fill="#5eead4" opacity="0.7" textAnchor="middle">{r}</text>
          );
        })}
      </g>
      <circle cx="50" cy="50" r="20" stroke="url(#rune-grad)" strokeWidth="1" />
      <path
        d="M 35 50 C 35 35, 50 35, 50 50 C 50 65, 65 65, 65 50 C 65 35, 50 35, 50 50 C 50 65, 35 65, 35 50 Z"
        stroke="url(#rune-grad)" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

// ============================================================
//  FONDO MÍSTICO ACUÁTICO · templo hundido
// ============================================================
function MysticBackground() {
  const [particles, setParticles] = useState([]);
  const [embers, setEmbers] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 30 + Math.random() * 70,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
      size: 2 + Math.random() * 3,
      color: i % 4 === 0 ? '#fbbf24' : i % 3 === 0 ? '#a78bfa' : i % 2 === 0 ? '#7dd3fc' : '#5eead4'
    }));
    setParticles(p);

    const e = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3
    }));
    setEmbers(e);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-abyss-700 via-abyss-900 to-abyss-950" />
      <div className="absolute inset-0 grid-bg" />

      <div className="sacred-glow absolute animate-wave" style={{ width: 700, height: 700, top: -200, left: -150 }} />
      <div className="gold-glow absolute animate-float" style={{ width: 500, height: 500, top: '15%', right: -100, animationDelay: '-5s' }} />
      <div className="sacred-glow absolute animate-wave" style={{ width: 500, height: 500, top: '45%', left: '20%', animationDelay: '-10s' }} />
      <div className="mystic-glow absolute animate-float" style={{ width: 600, height: 600, top: '70%', right: '15%', animationDelay: '-15s' }} />
      <div className="gold-glow absolute" style={{ width: 400, height: 400, bottom: 0, left: '40%' }} />

      <div className="absolute top-20 right-10 opacity-20 hidden md:block">
        <RunicCircle size={200} />
      </div>
      <div className="absolute top-1/2 left-10 opacity-15 hidden lg:block">
        <RunicCircle size={150} />
      </div>

      <svg className="absolute bottom-0 left-0 w-full h-40 opacity-30" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,50 C300,80 600,20 900,50 C1200,80 1440,40 1440,50 L1440,100 L0,100 Z" fill="url(#wave-grad)" className="animate-wave" />
        <path d="M0,60 C400,30 800,70 1440,40 L1440,100 L0,100 Z" fill="url(#wave-grad2)" opacity="0.5" />
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {particles.map(p => (
        <div
          key={`p${p.id}`}
          className="absolute rounded-full animate-particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, top: `${p.top}%`,
            background: p.color,
            boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}80`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity
          }}
        />
      ))}

      {embers.map(e => (
        <div
          key={`e${e.id}`}
          className="absolute w-1 h-1 rounded-full animate-ember"
          style={{
            left: `${e.left}%`, top: `${e.top}%`,
            background: '#fbbf24',
            boxShadow: '0 0 6px #fbbf24',
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
//  NAVBAR
// ============================================================
function Navbar({ lang, setLang, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#features', label: t.nav.features },
    { href: '#languages', label: t.nav.languages },
    { href: '#demo', label: t.nav.demo },
    { href: '#pricing', label: t.nav.pricing }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-abyss-950/70 backdrop-blur-xl border-b border-sacred-400/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <BabylonTower size={36} />
          </div>
          <div>
            <div className="font-display text-xl font-semibold tracking-tight text-gradient-gold">Babylon</div>
            <div className="text-[9px] text-sacred-400/80 tracking-[0.3em] uppercase -mt-1">The temple</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-sacred-300 transition-colors font-light">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-1 bg-white/5 border border-sacred-400/15 rounded-full px-1 py-1">
            {['en', 'es'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition ${
                  lang === l ? 'bg-gradient-to-r from-sacred-400 to-gold-400 text-abyss-950' : 'text-white/60 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/app" className="btn-primary text-sm px-5 py-2 rounded-full inline-flex items-center gap-1.5">
            {t.nav.login} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-abyss-900/95 backdrop-blur-xl border-b border-sacred-400/10 px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-white/80 py-2">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2">
            {['en', 'es'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lang === l ? 'bg-sacred-400 text-abyss-950' : 'bg-white/5 text-white/60'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="/app" className="btn-primary text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 w-full justify-center">
            {t.nav.login} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}

// ============================================================
//  HERO MÍSTICO
// ============================================================
function Hero({ t }) {
  return (
    <section className="relative pt-40 pb-24 px-6 text-center z-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8 animate-fade-up">
          <BabylonTower size={100} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sacred mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-sacred-400 animate-pulse" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-sacred-200 font-medium">
            {t.hero.pill}
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="text-gradient-sacred block italic">{t.hero.title1}</span>
          <span className="text-gradient-gold font-semibold block my-1">{t.hero.title2}</span>
          <span className="text-gradient-sacred block italic">{t.hero.title3}</span>
        </h1>

        <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {t.hero.sub}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-14 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a href="/app" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm">
            <Flame className="w-4 h-4" /> {t.hero.cta1}
          </a>
          <a href="#demo" className="btn-mystic inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full text-sm">
            <Eye className="w-4 h-4" /> {t.hero.cta2}
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-sacred-400/40" />
          <RunicCircle size={50} />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-sacred-400/40" />
        </div>

        <p className="font-display italic text-sacred-300/90 text-base md:text-lg tracking-wide animate-fade-up" style={{ animationDelay: '0.6s' }}>
          &ldquo; {t.hero.tagline} &rdquo;
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.7s' }}>
          {t.stats.map(s => (
            <div key={s.v} className="text-center">
              <div className="font-display text-4xl md:text-5xl font-light text-gradient-gold">{s.k}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-[0.25em] mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, lede }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`text-center mb-14 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="text-[11px] tracking-[0.35em] uppercase text-sacred-400 font-medium mb-3">
        ✦ {eyebrow} ✦
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight mb-4 text-gradient-sacred inline-block italic">
        {title}
      </h2>
      {lede && <p className="text-white/55 max-w-xl mx-auto font-light mt-3">{lede}</p>}
    </div>
  );
}

function Features({ t }) {
  const icons = [Mic, ScrollText, Languages, Award, Globe, Brain];
  return (
    <section id="features" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader {...t.features} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.items.map((item, i) => {
            const Icon = icons[i];
            return <FeatureCard key={i} icon={Icon} {...item} delay={i * 0.08} num={i + 1} />;
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc, delay, num }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`group relative p-7 rounded-2xl glass hover:bg-white/[0.07] hover:border-sacred-400/30 transition-all duration-500 cursor-pointer overflow-hidden ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sacred-400/10 via-transparent to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-3 right-4 font-display text-3xl text-sacred-400/15 group-hover:text-gold-400/30 transition-colors">
        {String(num).padStart(2, '0')}
      </div>
      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sacred-400/20 to-gold-400/15 border border-sacred-400/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5 text-sacred-300" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2 italic">{title}</h3>
        <p className="text-sm text-white/55 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function LiveDemo({ t }) {
  const [input, setInput] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const targetIdioma = IDIOMAS.find(i => i.code === targetLang) || IDIOMAS[0];

  const translate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: `Professional translator from Spanish to ${targetIdioma.name}. JSON ONLY: {"natural":"...","literal":"...","formal":"...","phonetic":"phonetic spelling in latin alphabet"}`,
          messages: [{ role: 'user', content: `Translate: "${input}"` }],
          max_tokens: 500
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const match = data.text.match(/\{[\s\S]*\}/);
      if (match) setResult(JSON.parse(match[0]));
    } catch (e) {
      setErrorMsg(e.message || 'Error');
    }
    setLoading(false);
  };

  const speak = (text) => {
    if (typeof window === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = targetIdioma.voice;
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const popularLangs = ['en', 'fr', 'ar', 'ja', 'zh', 'it', 'pt', 'de', 'ru'];
  const [ref, inView] = useInView();

  return (
    <section id="demo" className="relative py-24 px-6 z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader {...t.demo} />

        <div
          ref={ref}
          className={`glass-strong rounded-3xl p-6 md:p-10 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(94,234,212,0.06), rgba(251,191,36,0.04))',
            borderColor: 'rgba(94,234,212,0.2)'
          }}
        >
          <div className="mb-5">
            <label className="text-xs text-sacred-400 uppercase tracking-widest mb-3 block font-medium">{t.demo.langTo}</label>
            <div className="flex flex-wrap gap-2">
              {popularLangs.map(code => {
                const i = IDIOMAS.find(x => x.code === code);
                if (!i) return null;
                return (
                  <button
                    key={code}
                    onClick={() => setTargetLang(code)}
                    className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition ${
                      targetLang === code
                        ? 'bg-gradient-to-r from-sacred-400 to-gold-400 text-abyss-950 font-semibold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>{i.flag}</span> {i.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && translate()}
              placeholder={t.demo.placeholder}
              className="flex-1 bg-abyss-800/60 border border-sacred-400/20 rounded-xl px-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-sacred-400/60 transition font-display italic"
            />
            <button
              onClick={translate}
              disabled={loading || !input.trim()}
              className="btn-primary px-6 py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {t.demo.btnLabel}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 bg-red-500/10 border border-red-400/30 rounded-xl p-3 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-3 animate-fade-up">
              {['natural', 'literal', 'formal'].map(k => result[k] && (
                <div key={k} className="bg-abyss-800/40 border border-sacred-400/10 rounded-xl p-4 flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-sacred-400 mb-1.5 font-semibold">
                      ✦ {t.demo.labels[k]}
                    </div>
                    <p className="text-white break-words font-display text-lg">{result[k]}</p>
                  </div>
                  <button
                    onClick={() => speak(result[k])}
                    className="bg-sacred-400/10 hover:bg-sacred-400/20 border border-sacred-400/20 p-2.5 rounded-lg transition shrink-0"
                  >
                    <Volume2 className="w-4 h-4 text-sacred-300" />
                  </button>
                </div>
              ))}
              {result.phonetic && (
                <div className="bg-gold-400/5 border border-gold-400/20 rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300 mb-1.5 font-semibold">
                    🔮 {t.demo.labels.phonetic}
                  </div>
                  <p className="font-mono text-white/90">{result.phonetic}</p>
                </div>
              )}
            </div>
          )}

          {!result && !loading && (
            <p className="text-center text-white/30 text-xs mt-6 italic font-display">
                Powered by ancient AI · {targetIdioma.flag} {targetIdioma.name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function LanguagesShowcase({ t }) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? IDIOMAS : IDIOMAS.slice(0, 24);
  const [ref, inView] = useInView();

  return (
    <section id="languages" className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader {...t.languages} />

        <div
          ref={ref}
          className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 transition-all duration-1000 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {display.map((i, idx) => (
            <div
              key={i.code}
              className="glass aspect-square rounded-2xl flex flex-col items-center justify-center hover:bg-sacred-400/10 hover:border-sacred-400/30 transition-all cursor-pointer group"
              style={{
                animation: inView ? `fadeUp 0.6s cubic-bezier(.16,1,.3,1) forwards` : 'none',
                animationDelay: `${idx * 0.02}s`,
                opacity: 0
              }}
            >
              <div className="text-3xl mb-1 group-hover:scale-125 transition-transform">{i.flag}</div>
              <div className="text-[10px] text-white/60 text-center px-1 truncate w-full">{i.name}</div>
            </div>
          ))}
        </div>

        {!showAll && IDIOMAS.length > 24 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 btn-mystic px-6 py-2.5 rounded-full text-sm"
            >
              {t.languages.cta} ({IDIOMAS.length - 24}+) <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function DashboardPreview({ t }) {
  const [time, setTime] = useState('');
  const [xp, setXp] = useState(2840);
  const [bars] = useState(Array.from({ length: 7 }, (_, i) => 30 + Math.sin(i * 0.8) * 30 + 40));

  useEffect(() => {
    const pad = n => n.toString().padStart(2, '0');
    const tick = () => {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const t1 = setInterval(tick, 1000);
    const t2 = setInterval(() => setXp(x => x + Math.floor(Math.random() * 3)), 3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const [ref, inView] = useInView();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader {...t.dashboard} />

        <div
          ref={ref}
          className={`glass-strong rounded-3xl p-6 md:p-8 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between pb-5 border-b border-sacred-400/15 mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sacred-400 animate-pulse" />
              <span className="text-sm text-white/85 font-medium font-display italic">{t.dashboard.labels.liveSession}</span>
            </div>
            <div className="font-mono text-xs text-sacred-400/60">{time}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <DashStat icon={Flame} label={t.dashboard.labels.streak} value="27" color="from-gold-400 to-orange-400" />
            <DashStat icon={Star} label={t.dashboard.labels.xp} value={xp.toLocaleString()} color="from-sacred-400 to-sacred-200" />
            <DashStat icon={ScrollText} label={t.dashboard.labels.words} value="1,247" color="from-mystic-400 to-sacred-400" />
            <DashStat icon={Crown} label={t.dashboard.labels.accuracy} value="94%" color="from-gold-300 to-sacred-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h4 className="text-xs uppercase tracking-widest text-sacred-400 font-medium">✦ {t.dashboard.labels.progress}</h4>
                <TrendingUp className="w-4 h-4 text-sacred-400" />
              </div>
              <div className="flex items-end gap-3 h-40 pb-3 border-b border-white/10">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-sacred-400/30 to-gold-300 relative shadow-lg shadow-sacred-400/20"
                      style={{ height: `${h}%`, minHeight: 4 }}
                    >
                      <span className="absolute -top-0.5 left-0 right-0 h-0.5 bg-gold-300 rounded shadow-[0_0_8px_#fcd34d]" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-white/40 font-mono">
                {days.map(d => <span key={d}>{d}</span>)}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs uppercase tracking-widest text-sacred-400 font-medium">✦ {t.dashboard.labels.recent}</h4>
                <Activity className="w-4 h-4 text-sacred-400" />
              </div>
              <div className="space-y-2">
                {[
                  { lang: '🇯🇵', name: 'Japanese · Temple', xp: '+25' },
                  { lang: '🇫🇷', name: 'French · Verbs', xp: '+30' },
                  { lang: '🇸🇦', name: 'Arabic · Sacred', xp: '+20' },
                  { lang: '🇩🇪', name: 'German · Codex', xp: '+35' }
                ].map((l, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/[0.03] border border-sacred-400/10">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg shrink-0">{l.lang}</span>
                      <span className="text-[11px] text-white/80 truncate">{l.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-gold-300 shrink-0">{l.xp}</span>
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

function DashStat({ icon: Icon, label, value, color }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest text-white/50">{label}</span>
        <Icon className="w-3.5 h-3.5 text-sacred-400" />
      </div>
      <div className={`text-2xl font-light font-display bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </div>
    </div>
  );
}

function Testimonials({ t }) {
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader {...t.testimonials} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.testimonials.items.map((item, i) => <TestimonialCard key={i} {...item} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, text, delay }) {
  const [ref, inView] = useInView();
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 hover:border-sacred-400/30 transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gold-400" fill="currentColor" />
        ))}
      </div>
      <p className="text-white/80 italic font-display text-lg mb-5 leading-relaxed">&ldquo; {text} &rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-sacred-400/15">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sacred-400 to-gold-400 flex items-center justify-center font-medium text-abyss-950 text-sm">
          {initials}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-white/50">{role}</div>
        </div>
      </div>
    </div>
  );
}

function Pricing({ t }) {
  return (
    <section id="pricing" className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <SectionHeader {...t.pricing} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.pricing.plans.map((p, i) => <PricingCard key={i} {...p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ name, price, period, features, cta, popular, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`relative rounded-3xl p-8 transition-all duration-700 ${
        popular
          ? 'glass-strong border-gold-400/40 scale-105 z-10'
          : 'glass hover:border-sacred-400/20'
      } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-primary px-3 py-1 rounded-full text-[10px] tracking-wider uppercase inline-flex items-center gap-1">
          <Crown className="w-3 h-3" /> Most chosen
        </div>
      )}
      <h3 className="font-display text-2xl font-semibold mb-2 italic">{name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-display text-5xl font-light text-gradient-gold">{price}</span>
        <span className="text-sm text-white/50">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/75">
            <Check className="w-4 h-4 text-sacred-400 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="/app"
        className={`block text-center py-3 rounded-xl font-medium text-sm transition ${
          popular ? 'btn-primary' : 'btn-mystic'
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

function FinalCTA({ t }) {
  const [ref, inView] = useInView();
  return (
    <section className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`relative p-12 md:p-16 rounded-3xl overflow-hidden glass-strong text-center transition-all duration-1000 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(94,234,212,0.1), rgba(251,191,36,0.06), rgba(167,139,250,0.1))',
            borderColor: 'rgba(94,234,212,0.25)'
          }}
        >
          <div className="absolute inset-0 opacity-30 animate-rune" style={{ transformOrigin: 'center' }}>
            <RunicCircle size={400} className="absolute -inset-32 mx-auto" />
          </div>

          <div className="relative">
            <div className="flex justify-center mb-6">
              <BabylonTower size={70} />
            </div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-sacred-400 mb-3 font-medium">
              ✦ {t.cta.eyebrow} ✦
            </div>
            <h3 className="font-display text-5xl md:text-7xl font-light mb-5 tracking-tight italic">
              <span className="text-gradient-sacred">{t.cta.title}</span>
            </h3>
            <p className="text-white/70 mb-10 font-light text-base md:text-lg max-w-xl mx-auto font-display italic">
              {t.cta.sub}
            </p>
            <a href="/app" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm">
              <Flame className="w-4 h-4" /> {t.cta.btn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="relative border-t border-sacred-400/10 py-14 px-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BabylonTower size={40} />
              <div>
                <div className="font-display text-2xl font-semibold text-gradient-gold italic">Babylon</div>
                <div className="text-[9px] text-sacred-400/80 tracking-[0.3em] uppercase -mt-1">The temple</div>
              </div>
            </div>
            <p className="text-sm text-white/55 font-display italic max-w-sm mb-4 text-lg">
              &ldquo; {t.footer.tagline} &rdquo;
            </p>
            <div className="flex items-center gap-2">
              <RunicCircle size={32} />
              <span className="text-[10px] text-sacred-400/70 tracking-wider uppercase font-medium">Ancient · Eternal · Infinite</span>
            </div>
          </div>

          {[t.footer.cols.product, t.footer.cols.company, t.footer.cols.legal].map(col => (
            <div key={col.title}>
              <h5 className="text-xs uppercase tracking-widest text-sacred-400 mb-3 font-medium">{col.title}</h5>
              <ul className="space-y-2">
                {col.items.map(i => (
                  <li key={i}>
                    <a href="#" className="text-sm text-white/55 hover:text-sacred-300 transition-colors">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-sacred-400/10 flex flex-wrap justify-between items-center gap-3">
          <p className="text-[11px] text-white/30 tracking-wider uppercase font-display italic">{t.footer.copy}</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sacred-400 animate-pulse" />
            <span className="text-[11px] text-sacred-400/80 font-mono tracking-wider">THE WATERS RISE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('babylon_lang');
      if (saved === 'es' || saved === 'en') setLang(saved);
      else {
        const browserLang = navigator.language?.slice(0, 2);
        if (browserLang === 'es') setLang('es');
      }
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('babylon_lang', lang); } catch {}
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang];

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MysticBackground />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Features t={t} />
      <LiveDemo t={t} />
      <LanguagesShowcase t={t} />
      <DashboardPreview t={t} />
      <Testimonials t={t} />
      <Pricing t={t} />
      <FinalCTA t={t} />
      <Footer t={t} />
    </main>
  );
}
