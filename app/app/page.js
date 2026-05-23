'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Volume2, ChevronLeft, Loader2, Send, Sparkles,
  Languages, BookOpen, Eye, Flame, Crown, Search, X, Pause,
  RefreshCw, MessageCircle, Settings, ArrowRight, Activity,
  Radio, Trash2, Cpu
} from 'lucide-react';
import { IDIOMAS, NIVELES, askClaude, streamClaude, TTSQueue, extractSentences, cleanForTTS, speak, getSpeechRecognition, requestMicPermission, loadState, saveState } from '@/lib/core';

// ============================================================
//  OJO DIVINO COMPONENTE
// ============================================================
function DivineEye({ size = 60, animated = true, glow = true }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
      <defs>
        <radialGradient id={`eye-i-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0a1855" />
        </radialGradient>
        <linearGradient id={`eye-f-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
        {glow && (
          <radialGradient id={`eye-g-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      {glow && <circle cx="50" cy="50" r="48" fill={`url(#eye-g-${size})`} />}
      <path d="M 50 10 L 90 80 L 10 80 Z" stroke={`url(#eye-f-${size})`} strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M 25 50 Q 50 32 75 50 Q 50 68 25 50 Z" stroke={`url(#eye-f-${size})`} strokeWidth="1.8" fill="rgba(2,8,32,0.6)" />
      <circle cx="50" cy="50" r="10" fill={`url(#eye-i-${size})`} />
      <circle cx="50" cy="50" r="4" fill="#020410" />
      <circle cx="47" cy="47" r="1.5" fill="#fff" opacity="0.9" />
      {animated && (
        <g className="animate-rune" style={{ transformOrigin: 'center' }}>
          {[0, 60, 120, 180, 240, 300].map(angle => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 38;
            const y1 = 50 + Math.sin(rad) * 38;
            const x2 = 50 + Math.cos(rad) * 44;
            const y2 = 50 + Math.sin(rad) * 44;
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="1" opacity="0.6" strokeLinecap="round" />;
          })}
        </g>
      )}
    </svg>
  );
}

// ============================================================
//  FONDO MÍSTICO (versión reducida para la app)
// ============================================================
function AppBackground() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 30 + Math.random() * 70,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.4,
      size: 2 + Math.random() * 2,
      color: i % 3 === 0 ? '#fbbf24' : i % 2 === 0 ? '#7dd3fc' : '#5eead4'
    }));
    setParticles(arr);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-abyss-700 via-abyss-900 to-abyss-950" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(94,234,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 80%)'
      }} />
      <div className="absolute" style={{ width: 500, height: 500, top: -100, left: -100, background: 'radial-gradient(circle, rgba(94,234,212,0.18), rgba(94,234,212,0) 70%)', filter: 'blur(60px)' }} />
      <div className="absolute" style={{ width: 400, height: 400, bottom: 0, right: -100, background: 'radial-gradient(circle, rgba(251,191,36,0.12), rgba(251,191,36,0) 70%)', filter: 'blur(60px)' }} />
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full animate-particle" style={{
          width: p.size, height: p.size,
          left: `${p.left}%`, top: `${p.top}%`,
          background: p.color,
          boxShadow: `0 0 8px ${p.color}`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          opacity: p.opacity
        }} />
      ))}
    </div>
  );
}

// ============================================================
//  ONBOARDING · iniciación al templo
// ============================================================
function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', native: 'es', target: 'en', level: 'A1' });
  const [searchLang, setSearchLang] = useState('');
  const filteredLangs = IDIOMAS.filter(i =>
    i.code !== profile.native &&
    (searchLang === '' || i.name.toLowerCase().includes(searchLang.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <AppBackground />
      <div className="glass-strong rounded-3xl p-7 max-w-2xl w-full relative z-10" style={{ background: 'linear-gradient(135deg, rgba(94,234,212,0.06), rgba(251,191,36,0.04))' }}>
        <div className="flex items-center gap-3 mb-6">
          <DivineEye size={48} />
          <div>
            <h1 className="font-display text-2xl font-semibold text-gradient-gold italic">Babylon</h1>
            <p className="text-aqua-300/70 text-[10px] tracking-[0.25em] uppercase -mt-1">The temple awaits</p>
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl italic text-gradient-sacred">¿Cuál es tu nombre, peregrino?</h2>
            <input
              autoFocus
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              placeholder="Tu nombre..."
              className="w-full bg-white/10 border border-sacred-400/30 rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none focus:border-sacred-400 text-white font-display italic text-lg"
            />
            <button
              onClick={() => setStep(1)}
              disabled={!profile.name.trim()}
              className="w-full btn-primary py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <h2 className="font-display text-2xl italic text-gradient-sacred">¿Qué lengua deseas dominar?</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={searchLang}
                onChange={e => setSearchLang(e.target.value)}
                placeholder="Busca tu lengua..."
                className="w-full bg-white/10 border border-sacred-400/20 rounded-xl pl-9 pr-4 py-2.5 placeholder-white/40 focus:outline-none focus:border-sacred-400 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {filteredLangs.map(i => (
                <button
                  key={i.code}
                  onClick={() => setProfile({ ...profile, target: i.code })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-sm transition ${
                    profile.target === i.code
                      ? 'bg-gradient-to-r from-sacred-400 to-gold-400 border-gold-400 text-abyss-950 font-semibold'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{i.flag}</span>
                  <span className="truncate">{i.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full btn-primary py-3 rounded-xl">Siguiente →</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-2xl italic text-gradient-sacred">¿Cuál es tu nivel actual?</h2>
            <div className="grid grid-cols-7 gap-2">
              {NIVELES.map(n => (
                <button
                  key={n}
                  onClick={() => setProfile({ ...profile, level: n })}
                  className={`py-3 rounded-xl border font-bold transition ${
                    profile.level === n
                      ? 'bg-gradient-to-r from-sacred-400 to-gold-400 border-gold-400 text-abyss-950'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/50">A0 = principiante absoluto · C2 = maestría nativa</p>
            <button
              onClick={() => onFinish(profile)}
              className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5" /> Entrar al templo
            </button>
          </div>
        )}

        <div className="flex gap-1 mt-5 justify-center">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-8 bg-sacred-400' : 'w-2 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  DASHBOARD del templo
// ============================================================
function Dashboard({ profile, setView, setProfile }) {
  const target = IDIOMAS.find(i => i.code === profile.target) || IDIOMAS[0];

  const cards = [
    { id: 'maestro', label: 'Habla con el Maestro', desc: 'Conversación por voz en tiempo real', icon: Mic, big: true, gradient: 'from-sacred-400 to-gold-400' },
    { id: 'chat', label: 'Consulta al Oráculo', desc: 'Pregunta lo que quieras al maestro', icon: MessageCircle, gradient: 'from-mystic-400 to-sacred-400' },
    { id: 'translator', label: 'Traductor de la Torre', desc: 'Múltiples versiones + fonética', icon: Languages, gradient: 'from-sacred-400 to-aqua-200' },
    { id: 'lessons', label: 'Pergaminos sagrados', desc: 'Lecciones estructuradas', icon: BookOpen, gradient: 'from-gold-400 to-mystic-400' }
  ];

  return (
    <div className="min-h-screen relative z-10">
      <AppBackground />
      <div className="max-w-5xl mx-auto p-4 relative z-10">
        <header className="flex items-center justify-between mb-6 pt-3">
          <a href="/" className="flex items-center gap-3 group hover:opacity-80 transition">
            <DivineEye size={42} />
            <div>
              <p className="font-display text-xl font-semibold text-gradient-gold italic leading-tight">Babylon</p>
              <p className="text-aqua-300/70 text-[9px] tracking-[0.25em] uppercase">El templo</p>
            </div>
          </a>
          <button onClick={() => setView('settings')} className="p-2.5 glass-aqua rounded-xl hover:bg-sacred-400/10">
            <Settings className="w-5 h-5 text-sacred-300" />
          </button>
        </header>

        <div className="glass-aqua rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sacred-400 to-gold-400 flex items-center justify-center text-abyss-950 font-bold text-xl">
              {profile.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest">Bienvenido</p>
              <h1 className="font-display text-2xl italic text-gradient-sacred">{profile.name}</h1>
              <p className="text-sacred-300/80 text-sm mt-0.5">
                {target.flag} {target.name} · <span className="font-mono text-gold-300">{profile.level}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cards.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setView(c.id)}
                className={`bg-gradient-to-br ${c.gradient} rounded-2xl p-5 text-left active:scale-95 transition shadow-lg ${
                  c.big ? 'md:col-span-2' : ''
                } relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-abyss-950/30" />
                <div className="relative">
                  <Icon className={`text-white ${c.big ? 'w-10 h-10 mb-3' : 'w-7 h-7 mb-2'}`} />
                  <h3 className={`font-display italic font-semibold text-white ${c.big ? 'text-2xl' : 'text-lg'}`}>{c.label}</h3>
                  <p className="text-white/85 text-sm mt-1">{c.desc}</p>
                  {c.big && (
                    <div className="mt-3 inline-flex items-center gap-1 text-white/90 text-sm">
                      Empezar conversación <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  EL MAESTRO · Conversación por voz en tiempo real
// ============================================================
function MaestroVoice({ profile, setView }) {
  const [permError, setPermError] = useState(null);
  const [permGranted, setPermGranted] = useState(false);
  const [state, setState] = useState('idle');
  const [messages, setMessages] = useState([]);
  const [interim, setInterim] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [handsFree, setHandsFree] = useState(true);
  const [textInput, setTextInput] = useState('');

  const stateRef = useRef(state);
  const handsFreeRef = useRef(handsFree);
  const recogRef = useRef(null);
  const ttsRef = useRef(null);
  const abortRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const scrollRef = useRef(null);
  const messagesRef = useRef(messages);
  const isMounted = useRef(true);

  const target = IDIOMAS.find(i => i.code === profile.target) || IDIOMAS[0];

  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => () => {
    isMounted.current = false;
    try { recogRef.current?.abort?.(); } catch {}
    try { abortRef.current?.abort?.(); } catch {}
    ttsRef.current?.cancel();
    clearTimeout(safetyTimeoutRef.current);
    try { window.speechSynthesis?.cancel(); } catch {}
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, interim]);

  const requestPerm = async () => {
    const r = await requestMicPermission();
    if (r.ok) { setPermGranted(true); setPermError(null); }
    else setPermError(r);
  };

  const buildSystem = () => {
    return `You are a warm, patient, native-level ${target.name} teacher for a ${profile.level} level Spanish-speaking student named ${profile.name}.

CRITICAL RULES:
1. This is a VOICE conversation. Keep responses SHORT: maximum 2 sentences, 20-35 words total.
2. Speak in ${target.name} appropriate for ${profile.level} level. Use simple vocabulary for A0-A1, gradually more complex for higher levels.
3. NO markdown, NO emojis, NO parentheses, NO special symbols. Only plain spoken text.
4. If the student makes a mistake: gently correct in one short sentence, then continue conversation.
5. Always END with a SHORT question to keep the conversation flowing.
6. Be encouraging, warm, and natural like a real human tutor.
7. If the student speaks in Spanish, gently encourage them to try in ${target.name}, but help them.
8. Adapt difficulty in real-time. If they struggle, simplify. If they excel, challenge them slightly.
9. Teach culturally relevant phrases, idioms, and natural expressions of ${target.name}.
10. You are their personal master. Make them feel safe to make mistakes.

Begin by greeting them naturally and asking what they'd like to practice today.`;
  };

  const sendUserText = (text) => {
    if (!text?.trim()) return;
    const newMessages = [...messagesRef.current, { role: 'user', content: text.trim() }];
    setMessages(newMessages);
    setTimeout(() => initiateTurn(newMessages), 50);
  };

  const initiateTurn = async (msgsParam = null) => {
    if (!isMounted.current) return;
    setState('thinking');
    setErrorMsg('');

    const msgs = msgsParam || messagesRef.current;
    const apiMessages = msgs.length === 0
      ? [{ role: 'user', content: `Greet me warmly in ${target.name} and ask what I want to practice today. Be very brief.` }]
      : msgs.map(m => ({ role: m.role, content: m.content }));

    const controller = new AbortController();
    abortRef.current = controller;

    clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      if (stateRef.current === 'thinking' && isMounted.current) {
        setErrorMsg('El oráculo tardó demasiado en responder. Intenta otra vez.');
        setState('error');
        try { controller.abort(); } catch {}
      }
    }, 22000);

    const tts = new TTSQueue({
      lang: target.voice,
      rate: 0.93,
      onStart: () => { if (stateRef.current !== 'speaking') setState('speaking'); },
      onAllDone: () => {
        if (!isMounted.current) return;
        if (handsFreeRef.current) setTimeout(() => isMounted.current && startListening(), 400);
        else setState('idle');
      }
    });
    ttsRef.current = tts;

    let ttsBuffer = '';
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);

    let receivedFirstChunk = false;

    await streamClaude({
      system: buildSystem(),
      messages: apiMessages,
      signal: controller.signal,
      maxTokens: 400,
      onChunk: (delta, full) => {
        if (!isMounted.current) return;
        if (!receivedFirstChunk) {
          receivedFirstChunk = true;
          clearTimeout(safetyTimeoutRef.current);
        }
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: full };
          return copy;
        });
        ttsBuffer += delta;
        const { sentences, remainder } = extractSentences(ttsBuffer);
        ttsBuffer = remainder;
        for (const s of sentences) {
          const clean = cleanForTTS(s);
          if (clean.length > 2) tts.add(clean);
        }
      },
      onDone: () => {
        if (!isMounted.current) return;
        const clean = cleanForTTS(ttsBuffer);
        if (clean.length > 2) tts.add(clean);
        tts.markStreamDone();
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], streaming: false };
          return copy;
        });
      },
      onError: (err) => {
        if (!isMounted.current) return;
        clearTimeout(safetyTimeoutRef.current);
        setErrorMsg(err.message || 'Error de conexión con el oráculo');
        setState('error');
        setMessages(prev => {
          const copy = [...prev];
          if (copy.length && copy[copy.length - 1].streaming) {
            copy[copy.length - 1] = { ...copy[copy.length - 1], streaming: false };
          }
          return copy;
        });
      }
    });
  };

  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) {
      setErrorMsg('Reconocimiento de voz no soportado. Usa Chrome o Safari.');
      setState('error');
      return;
    }
    try { recogRef.current?.abort?.(); } catch {}

    const rec = new SR();
    rec.lang = target.voice;
    rec.continuous = false;
    rec.interimResults = true;
    let finalText = '';

    rec.onstart = () => { if (isMounted.current) { setState('listening'); setInterim(''); } };
    rec.onresult = (e) => {
      let interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interimText += r[0].transcript;
      }
      if (!isMounted.current) return;
      setInterim(interimText);
      if (finalText) { try { rec.stop(); } catch {} }
    };
    rec.onerror = (e) => {
      if (!isMounted.current) return;
      const code = e.error;
      if (code === 'no-speech' || code === 'aborted') {
        if (handsFreeRef.current && stateRef.current === 'listening') {
          setTimeout(() => isMounted.current && startListening(), 200);
        } else setState('idle');
        return;
      }
      if (code === 'not-allowed') setErrorMsg('Permiso de micrófono denegado.');
      else setErrorMsg(`Error: ${code}`);
      setState('error');
    };
    rec.onend = () => {
      if (!isMounted.current) return;
      setInterim('');
      if (finalText.trim()) sendUserText(finalText.trim());
      else if (handsFreeRef.current && stateRef.current === 'listening') {
        setTimeout(() => isMounted.current && startListening(), 100);
      } else setState('idle');
    };
    try { rec.start(); recogRef.current = rec; }
    catch { setTimeout(() => isMounted.current && startListening(), 300); }
  }, [target]);

  const interrupt = () => {
    ttsRef.current?.cancel();
    try { window.speechSynthesis.cancel(); } catch {}
    abortRef.current?.abort();
    clearTimeout(safetyTimeoutRef.current);
    setMessages(prev => {
      const copy = [...prev];
      if (copy.length && copy[copy.length - 1].streaming) copy[copy.length - 1].streaming = false;
      return copy;
    });
    setHandsFree(true);
    setTimeout(() => isMounted.current && startListening(), 100);
  };

  const handleMainButton = () => {
    if (state === 'listening') {
      setHandsFree(false);
      try { recogRef.current?.stop?.(); } catch {}
      setState('idle');
    } else if (state === 'speaking' || state === 'thinking') {
      interrupt();
    } else if (state === 'error') {
      setErrorMsg(''); setState('idle');
    } else {
      if (messagesRef.current.length === 0) {
        initiateTurn([]);
      } else {
        setHandsFree(true);
        startListening();
      }
    }
  };

  if (!permGranted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <AppBackground />
        <div className="glass-strong rounded-3xl p-8 max-w-md w-full text-center relative z-10">
          <button onClick={() => setView('dashboard')} className="absolute top-5 left-5 text-white/60 hover:text-white text-sm">
            ← Volver
          </button>
          <div className="flex justify-center mb-5">
            <DivineEye size={80} />
          </div>
          <h1 className="font-display text-2xl italic mb-3 text-gradient-sacred">El Maestro te escuchará</h1>
          <p className="text-white/65 mb-6 text-sm">
            Habla con el oráculo en {target.flag} {target.name}. Necesita acceso al micrófono.
          </p>
          {permError ? (
            <div className="bg-red-500/15 border border-red-400/30 rounded-2xl p-4 mb-4 text-left">
              <p className="font-semibold text-red-300 mb-1">{permError.message}</p>
              {permError.code === 'denied' && (
                <div className="mt-3 bg-white/5 rounded-lg p-3 text-xs text-white/70 space-y-1">
                  <p>1. Toca el icono 🔒 en la barra del navegador</p>
                  <p>2. En "Micrófono" → Permitir</p>
                  <p>3. Recarga la página</p>
                </div>
              )}
              <button onClick={requestPerm} className="mt-3 w-full bg-red-500 font-semibold py-2 rounded-xl text-white">
                Reintentar
              </button>
            </div>
          ) : (
            <button
              onClick={requestPerm}
              className="w-full btn-primary py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Mic className="w-5 h-5" /> Activar micrófono
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <AppBackground />
      <header className="bg-abyss-950/70 backdrop-blur-xl border-b border-sacred-400/10 p-3 flex items-center gap-3 sticky top-0 z-20">
        <button onClick={() => setView('dashboard')} className="p-2 hover:bg-white/5 rounded-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <DivineEye size={32} animated={state === 'thinking'} />
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold italic text-sm">Maestro {target.flag} {target.name}</p>
          <p className="text-xs">
            <span className={
              state === 'listening' ? 'text-red-400' :
              state === 'thinking' ? 'text-gold-400' :
              state === 'speaking' ? 'text-sacred-400' :
              state === 'error' ? 'text-red-400' : 'text-white/50'
            }>
              {state === 'listening' && '🎤 Escuchando...'}
              {state === 'thinking' && '💭 El oráculo medita...'}
              {state === 'speaking' && '🔊 El maestro habla...'}
              {state === 'idle' && '⏸ Toca el botón para hablar'}
              {state === 'error' && '⚠️ Error'}
            </span>
          </p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-w-3xl mx-auto w-full relative z-10">
        {messages.length === 0 && state !== 'thinking' && (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center gap-4">
              <DivineEye size={100} />
              <h2 className="font-display text-2xl italic text-gradient-sacred">El templo te espera</h2>
              <p className="text-white/50 text-sm max-w-xs">
                Toca el botón abajo para iniciar tu conversación con el maestro de {target.name}.
              </p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="shrink-0 mt-1">
                <DivineEye size={32} animated={m.streaming} />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-3.5 ${
              m.role === 'user'
                ? 'bg-gradient-to-br from-mystic-500 to-mystic-600 text-white'
                : 'glass-aqua text-white'
            } ${m.streaming ? 'ring-1 ring-gold-400/40' : ''}`}>
              <p className="whitespace-pre-wrap font-display italic">
                {m.content || (m.streaming ? '...' : '')}
                {m.streaming && <span className="inline-block w-1.5 h-4 bg-gold-400 ml-1 animate-pulse" />}
              </p>
            </div>
          </div>
        ))}
        {interim && (
          <div className="flex justify-end opacity-60">
            <div className="bg-mystic-500/40 rounded-2xl p-3 max-w-[80%]">
              <p className="text-sm italic font-display">{interim}...</p>
            </div>
          </div>
        )}
      </div>

      {state === 'error' && errorMsg && (
        <div className="max-w-3xl mx-auto w-full px-4 mb-2 relative z-10">
          <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3 text-sm text-red-200">
            {errorMsg}
          </div>
        </div>
      )}

      <div className="bg-abyss-950/80 backdrop-blur-xl border-t border-sacred-400/10 p-4 max-w-3xl mx-auto w-full relative z-10">
        <div className="flex gap-2 mb-3">
          <input
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && textInput.trim()) { sendUserText(textInput); setTextInput(''); } }}
            placeholder={`O escribe en ${target.name}...`}
            className="flex-1 bg-white/5 border border-sacred-400/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sacred-400 font-display italic"
          />
          <button
            onClick={() => { if (textInput.trim()) { sendUserText(textInput); setTextInput(''); } }}
            disabled={!textInput.trim()}
            className="btn-primary disabled:opacity-30 p-2.5 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleMainButton}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-base transition ${
            state === 'listening' ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse text-white' :
            state === 'speaking' || state === 'thinking' ? 'bg-gradient-to-r from-gold-400 to-sacred-400 text-abyss-950' :
            state === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
            'btn-primary'
          }`}
        >
          {state === 'listening' && <><MicOff className="w-5 h-5" /> Detener</>}
          {state === 'thinking' && <><Cpu className="w-5 h-5 animate-spin" /> El oráculo medita</>}
          {state === 'speaking' && <><Pause className="w-5 h-5" /> Interrumpir</>}
          {state === 'idle' && <><Mic className="w-5 h-5" /> {messages.length === 0 ? 'Iniciar conversación' : 'Hablar'}</>}
          {state === 'error' && <><RefreshCw className="w-5 h-5" /> Reintentar</>}
        </button>

        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <button
            onClick={() => setHandsFree(h => !h)}
            className={`text-xs px-3 py-1 rounded-full ${
              handsFree ? 'bg-sacred-400/20 text-sacred-300' : 'bg-white/5 text-white/50'
            }`}
          >
            <Radio className="w-3 h-3 inline mr-1" /> Manos libres {handsFree ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => { setMessages([]); setErrorMsg(''); setState('idle'); }}
            className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/50"
          >
            <Trash2 className="w-3 h-3 inline mr-1" /> Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  CHAT con el Oráculo (texto)
// ============================================================
function ChatView({ profile, setView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef();
  const target = IDIOMAS.find(i => i.code === profile.target) || IDIOMAS[0];

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: `Bienvenido, ${profile.name}. Soy el oráculo de ${target.name}.\n\nPregúntame lo que desees aprender:\n• "Explícame el verbo to be"\n• "¿Cómo se dice: tengo hambre?"\n• "Corrígeme: I goed to the store"\n• "Enséñame frases para un restaurante"`
    }]);
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const system = `You are a wise oracle teaching ${target.name} to ${profile.name} (level ${profile.level}, Spanish speaker). Respond in a warm, professorial tone. Use both ${target.name} and Spanish when helpful. Keep responses focused (max 3 short paragraphs). For corrections use: "💡 Corrección: ...". For translations add: "📖 Español: [traducción]". Be the most encouraging, patient teacher they've ever had.`;
      const convo = newMsgs.map(m => ({ role: m.role, content: m.content }));
      const reply = await askClaude(system, convo, false, 800, 22000);
      setMessages([...newMsgs, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: `⚠️ ${e.message || 'El oráculo no pudo responder. Intenta de nuevo.'}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <AppBackground />
      <header className="bg-abyss-950/70 backdrop-blur-xl border-b border-sacred-400/10 p-3 flex items-center gap-3 sticky top-0 z-20">
        <button onClick={() => setView('dashboard')} className="p-1 text-white/60">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <DivineEye size={28} />
        <p className="font-display italic font-semibold text-sm">Oráculo {target.flag} {target.name}</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-w-3xl mx-auto w-full relative z-10">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="shrink-0 mt-1">
                <DivineEye size={28} />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl p-3.5 ${
              m.role === 'user'
                ? 'bg-gradient-to-br from-gold-400 to-sacred-400 text-abyss-950 font-medium'
                : 'glass-aqua'
            }`}>
              <p className="whitespace-pre-wrap text-sm">{m.content}</p>
              {m.role === 'assistant' && (
                <button
                  onClick={() => speak(m.content.split('📖')[0].replace(/[💡📖⚠️✦]/g, ''), target.voice)}
                  className="mt-2 text-xs text-sacred-400 flex items-center gap-1 hover:text-sacred-300"
                >
                  <Volume2 className="w-3 h-3" /> Escuchar
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sacred-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-display italic">El oráculo medita...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-sacred-400/10 bg-abyss-950/70 backdrop-blur-xl p-3 relative z-10">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Pregunta al oráculo..."
            className="flex-1 bg-white/5 border border-sacred-400/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sacred-400 font-display italic"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="btn-primary disabled:opacity-30 p-2.5 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  TRADUCTOR
// ============================================================
function Translator({ profile, setView }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dir, setDir] = useState('toTarget');
  const [errorMsg, setErrorMsg] = useState('');
  const target = IDIOMAS.find(i => i.code === profile.target) || IDIOMAS[0];
  const native = IDIOMAS.find(i => i.code === profile.native) || IDIOMAS[3];
  const from = dir === 'toTarget' ? native : target;
  const to = dir === 'toTarget' ? target : native;

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    try {
      const r = await askClaude(
        `Professional translator ${from.name} → ${to.name}. JSON ONLY: {"natural":"natural translation","literal":"word by word","formal":"formal version","fonetica":"phonetic spelling in latin alphabet"}`,
        `Translate: "${text}"`,
        true, 600, 18000
      );
      setResult({ ...r, lang: to.voice });
    } catch (e) {
      setErrorMsg(e.message || 'Error al traducir');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 relative z-10">
      <AppBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <button onClick={() => setView('dashboard')} className="text-white/60 text-sm mb-4 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver al templo
        </button>
        <div className="flex items-center gap-3 mb-5">
          <DivineEye size={42} />
          <h1 className="font-display text-3xl italic text-gradient-sacred">Traductor de la Torre</h1>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 glass-aqua rounded-xl p-3 text-center text-sm">
            {from.flag} {from.name}
          </div>
          <button
            onClick={() => { setDir(d => d === 'toTarget' ? 'toNative' : 'toTarget'); setResult(null); }}
            className="bg-sacred-400/20 p-2.5 rounded-lg hover:bg-sacred-400/30"
          >
            <RefreshCw className="w-4 h-4 text-sacred-300" />
          </button>
          <div className="flex-1 glass-aqua rounded-xl p-3 text-center text-sm">
            {to.flag} {to.name}
          </div>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          placeholder={`Susurra tu frase en ${from.name}...`}
          className="w-full bg-white/5 border border-sacred-400/20 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-sacred-400 resize-none font-display italic"
        />
        <button
          onClick={translate}
          disabled={loading || !text.trim()}
          className="w-full btn-primary disabled:opacity-30 py-3 rounded-xl flex items-center justify-center gap-2 mb-4"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />} Invocar
        </button>
        {errorMsg && (
          <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3 text-sm text-red-200 mb-3">
            {errorMsg}
          </div>
        )}
        {result && (
          <div className="space-y-2">
            {[
              { k: 'natural', l: 'Natural' },
              { k: 'literal', l: 'Literal' },
              { k: 'formal', l: 'Formal' }
            ].map(v => result[v.k] && (
              <div key={v.k} className="glass-aqua rounded-xl p-3 flex justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-sacred-400 uppercase font-semibold tracking-widest">✦ {v.l}</p>
                  <p className="break-words text-lg font-display">{result[v.k]}</p>
                </div>
                <button
                  onClick={() => speak(result[v.k], result.lang)}
                  className="text-sacred-300 self-center shrink-0 hover:scale-110 transition"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {result.fonetica && (
              <div className="bg-gold-400/5 border border-gold-400/20 rounded-xl p-3">
                <p className="text-[10px] text-gold-300 uppercase font-semibold tracking-widest">🔮 Encantamiento</p>
                <p className="font-mono text-sm mt-1">{result.fonetica}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
//  LECCIONES (simplificado)
// ============================================================
function Lessons({ profile, setView }) {
  const target = IDIOMAS.find(i => i.code === profile.target) || IDIOMAS[0];
  const temas = [
    'Saludos y despedidas',
    'Presentarse',
    'Números 1-100',
    'Familia',
    'En el restaurante',
    'En el aeropuerto',
    'Pedir direcciones',
    'Ir de compras',
    'Verbo ser/estar',
    'Presente simple',
    'Pasado simple',
    'Email formal'
  ];

  return (
    <div className="min-h-screen p-4 relative z-10">
      <AppBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <button onClick={() => setView('dashboard')} className="text-white/60 text-sm mb-4 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver al templo
        </button>
        <div className="flex items-center gap-3 mb-5">
          <DivineEye size={42} />
          <h1 className="font-display text-3xl italic text-gradient-sacred">Pergaminos sagrados</h1>
        </div>
        <p className="text-white/60 mb-6 text-sm">
          {target.flag} {target.name} · Toca un pergamino y el maestro te lo enseñará personalmente.
        </p>
        <div className="space-y-2">
          {temas.map((tema, i) => (
            <button
              key={i}
              onClick={() => setView('maestro')}
              className="w-full text-left glass-aqua rounded-xl p-4 hover:bg-sacred-400/10 active:scale-[0.98] transition flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sacred-400 to-gold-400 flex items-center justify-center text-abyss-950 font-bold text-sm">
                {i + 1}
              </div>
              <span className="font-display italic flex-1">{tema}</span>
              <ArrowRight className="w-4 h-4 text-sacred-400" />
            </button>
          ))}
        </div>
        <div className="mt-6 glass-aqua rounded-2xl p-4 text-center text-sm text-white/60">
          <p>Cada pergamino te lleva directo al maestro para que te lo enseñe por voz.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  SETTINGS
// ============================================================
function SettingsView({ profile, setProfile, setView }) {
  const [searchLang, setSearchLang] = useState('');
  const filteredLangs = IDIOMAS.filter(i =>
    i.code !== profile.native &&
    (searchLang === '' || i.name.toLowerCase().includes(searchLang.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4 relative z-10">
      <AppBackground />
      <div className="max-w-2xl mx-auto relative z-10">
        <button onClick={() => setView('dashboard')} className="text-white/60 text-sm mb-4 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver al templo
        </button>
        <h1 className="font-display text-3xl italic text-gradient-sacred mb-6">Ajustes del peregrino</h1>

        <div className="glass-aqua rounded-2xl p-4 mb-3">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Nombre</p>
          <p className="font-display italic text-xl">{profile.name}</p>
        </div>

        <div className="glass-aqua rounded-2xl p-4 mb-3">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">Nivel</p>
          <div className="grid grid-cols-7 gap-1.5">
            {NIVELES.map(n => (
              <button
                key={n}
                onClick={() => { setProfile({ ...profile, level: n }); saveState('profile', { ...profile, level: n }); }}
                className={`py-2 rounded-lg font-bold text-sm transition ${
                  profile.level === n ? 'bg-gradient-to-r from-sacred-400 to-gold-400 text-abyss-950' : 'bg-white/5'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-aqua rounded-2xl p-4 mb-3">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Lengua a dominar</p>
          <div className="relative mb-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={searchLang}
              onChange={e => setSearchLang(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-white/5 border border-sacred-400/20 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {filteredLangs.map(i => (
              <button
                key={i.code}
                onClick={() => { setProfile({ ...profile, target: i.code }); saveState('profile', { ...profile, target: i.code }); }}
                className={`p-2 rounded-lg text-xs flex items-center gap-1 transition ${
                  profile.target === i.code ? 'bg-gradient-to-r from-sacred-400 to-gold-400 text-abyss-950 font-semibold' : 'bg-white/5'
                }`}
              >
                <span className="text-base">{i.flag}</span>
                <span className="truncate">{i.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('¿Reiniciar todo el templo? Perderás tu progreso.')) {
              try { localStorage.clear(); } catch {}
              window.location.reload();
            }
          }}
          className="w-full bg-red-500/15 border border-red-400/30 rounded-xl py-3 text-red-300 font-semibold mt-4"
        >
          Reiniciar el templo
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  ROOT
// ============================================================
export default function AppRoot() {
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('dashboard');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = loadState('profile', null);
    if (p) setProfile(p);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && profile) saveState('profile', profile);
  }, [profile, loaded]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-abyss-950">
        <Loader2 className="w-10 h-10 animate-spin text-sacred-400" />
      </div>
    );
  }

  if (!profile) return <Onboarding onFinish={setProfile} />;

  const views = {
    dashboard: <Dashboard profile={profile} setView={setView} setProfile={setProfile} />,
    maestro: <MaestroVoice profile={profile} setView={setView} />,
    chat: <ChatView profile={profile} setView={setView} />,
    translator: <Translator profile={profile} setView={setView} />,
    lessons: <Lessons profile={profile} setView={setView} />,
    settings: <SettingsView profile={profile} setProfile={setProfile} setView={setView} />
  };

  return views[view] || views.dashboard;
}
