import { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, MapPin, CheckCircle, MessageCircle, Baby, Plus, Trash2, Bookmark, X, Heart, Activity, Palette, ChevronDown, ChevronUp, Navigation, Loader2, Users, Brain, DollarSign, Microscope, Zap, Theater, Gamepad2, Menu, History, Lock } from "lucide-react";

// ── Password Gate ──────────────────────────────────────────────
// 🔑 Change this to your desired password
const APP_PASSWORD = "PlayfulKids!1122";

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (value === APP_PASSWORD) {
      sessionStorage.setItem("kidsplay_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:C.bgSoft, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", padding:24 }}>
      <div style={{ width:"100%", maxWidth:380 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:72, height:72, background:C.primary, borderRadius:22, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 12px 32px ${C.primary}40`, margin:"0 auto 16px" }}>
            <Sparkles size={36} fill="#fff" style={{ color:"#fff" }} />
          </div>
          <div style={{ fontWeight:900, fontSize:28, color:C.primary, letterSpacing:"-0.5px" }}>Kindred</div>
          <div style={{ fontSize:12, fontWeight:700, color:C.inkSoft, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:4 }}>Family Activity Companion</div>
        </div>

        {/* Card */}
        <div style={{ background:C.white, borderRadius:32, padding:32, boxShadow:"0 20px 60px rgba(26,26,46,0.10)", border:`2px solid ${C.primaryFg}`, animation: shake ? "shake 0.4s ease" : "none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <Lock size={18} style={{ color:C.primary }} />
            <span style={{ fontWeight:800, fontSize:16, color:C.ink }}>Enter Access Code</span>
          </div>
          <p style={{ fontSize:13, color:C.inkSoft, fontWeight:500, marginBottom:20, marginTop:0 }}>
            This app is for invited users only.
          </p>
          <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && attempt()}
            autoFocus
            style={{ ...inputSt, border: error ? `2px solid ${C.red}` : `2px solid ${C.primaryFg}`, marginBottom: error ? 6 : 16 }}
          />
          {error && (
            <p style={{ color:C.red, fontSize:12, fontWeight:700, marginBottom:14, marginTop:0 }}>
              Incorrect password. Please try again.
            </p>
          )}
          <button onClick={attempt} disabled={!value} style={{ width:"100%", padding:"14px 24px", background: value ? C.primary : C.inkFaint, color:C.white, borderRadius:20, fontWeight:800, fontSize:15, border:"none", cursor: value ? "pointer" : "not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow: value ? `0 8px 24px ${C.primary}40` : "none", transition:"all .15s", opacity: value ? 1 : 0.5 }}>
            <Sparkles size={18} fill="currentColor" /> Unlock App
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

// ── Design tokens ──────────────────────────────────────────────
const C = {
  bgSoft:"#F5F3FF", white:"#FFFFFF", ink:"#1A1A2E",
  inkMid:"rgba(26,26,46,0.6)", inkSoft:"rgba(26,26,46,0.4)", inkFaint:"rgba(26,26,46,0.1)",
  primary:"#6C47FF", primaryDark:"#5535E0", primaryFg:"rgba(108,71,255,0.1)",
  accent:"#F27D26", accentFg:"rgba(242,125,38,0.08)",
  success:"#22C55E", successFg:"rgba(34,197,94,0.08)",
  warning:"#F59E0B", warningFg:"rgba(245,158,11,0.08)",
  red:"#EF4444", redFg:"#FEF2F2",
};

const LANGUAGES = ["English","Spanish","French","Portuguese","German","Italian","Dutch","Polish","Czech"];

// NEW: Optimized Play Categories (activity types, not environments)
const PLAY_CATS = [
  { 
    type:"Active", 
    icon:Zap, 
    label:"Active & Sports", 
    color:"#22C55E",
    examples:"Running, jumping, sports, chasing, hide & seek, dance parties, obstacle courses, ball games, freeze dance, relay races, outdoor games"
  },
  { 
    type:"Creative", 
    icon:Palette, 
    label:"Creative & Arts", 
    color:"#F27D26",
    examples:"Painting, drawing, crafting, music, theatre, building, construction, DIY projects, collage, origami, instrument making, sculpture"
  },
  { 
    type:"Pretend", 
    icon:Theater, 
    label:"Pretend & Story", 
    color:"#6C47FF",
    examples:"Role-play, dress-up, storytelling, puppet shows, make-believe, acting out scenarios, imaginative play, character games"
  },
  { 
    type:"Games", 
    icon:Gamepad2, 
    label:"Games & Puzzles", 
    color:"#F59E0B",
    examples:"Board games, card games, puzzles, riddles, strategy games, brain teasers, logic challenges, detective games, mysteries"
  },
];

const LEARN_FOCUSES = [
  { id:"how-to-learn",     icon:Brain,         label:"How to Learn",      emoji:"🧠", subtitle:"Metacognition & Learning Skills", color:"#6C47FF" },
  { id:"soft-skills",      icon:MessageCircle, label:"Soft Skills",        emoji:"💬", subtitle:"Life Competencies",              color:"#F27D26" },
  { id:"financial",        icon:DollarSign,    label:"Financial Literacy", emoji:"💰", subtitle:"Money & Market Basics",          color:"#22C55E" },
  { id:"interdisciplinary",icon:Microscope,    label:"Interdisciplinary",  emoji:"🔬", subtitle:"Subject Blending",               color:"#F59E0B" },
];

const GENDERS         = ["Boy","Girl","Non-binary","Prefer not to say"];
const DISCARD_REASONS = ["Not age-appropriate","Already done it","Too complex","Missing materials","Other"];
const DIFFICULTY_OPTS = ["Way too easy","Easy","Just right","Difficult","Very difficult"];
const AGE_GROUPS      = a => a<=2?"toddler":a<=5?"preschool":a<=10?"primary":"tween";

// NEW: Simplified navigation (2 main tabs)
const NAV = [
  { id:"activities", Icon:Sparkles,      label:"Activities" },
  { id:"community",  Icon:MessageCircle, label:"Community"  },
];

// ── Storage — uses localStorage (Vercel deployment) ───────────
const defaultState = {
  lang:"English", 
  kids:[], 
  savedIdeas:[], 
  completedActivities:[],
  communityFeedback:[], 
  communityIdeas:[], 
  feedbackLoop:{},
  // NEW: Persistent preferences
  lastSelection: {
    selectedKids: [],
    mode: null,
    adults: 0,
    extraKids: 0,
  },
  activePlayCategory: null,      // null or 0-3 (index in PLAY_CATS)
  activeLearnFocus: null,         // FIX #2: Changed from array to single value (null or focus id)
  envFilter: [],                  // ["indoor"] or ["outdoor"] or both or []
};

async function loadState() {
  try { 
    const d = localStorage.getItem("kidsplay_v5"); 
    return d ? JSON.parse(d) : defaultState; 
  } catch { 
    return defaultState; 
  }
}

async function saveState(s) {
  try { localStorage.setItem("kidsplay_v5", JSON.stringify(s)); } catch {}
}

// ── API — calls /api/claude backend proxy (Vercel) ─────────────
async function callClaude(prompt, lang="English") {
  const res = await fetch("/api/claude", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1200,
      system:`You are a helpful assistant for parents. Respond ONLY in valid JSON, no markdown, no explanation. ALL text values MUST be in ${lang}. The "materials" field must always be a JSON array of strings, never a plain string.`,
      messages:[{role:"user", content:prompt}],
    }),
  });
  const d = await res.json();
  const text = d.content?.map(i=>i.text||"").join("")||"[]";
  try { return JSON.parse(text.replace(/```json|```/g,"").trim()); } catch { return null; }
}

function useAppState() {
  const [state, setState] = useState(null);
  useEffect(()=>{ loadState().then(setState); },[]);
  const update = useCallback(patch => {
    setState(prev => { const next={...prev,...patch}; saveState(next); return next; });
  },[]);
  return [state, update];
}

// ── Style helpers ──────────────────────────────────────────────
const cardSt   = { background:C.white, borderRadius:40, boxShadow:"0 20px 60px rgba(26,26,46,0.06)", border:`2px solid ${C.primaryFg}`, padding:32, position:"relative", overflow:"hidden" };
const cardSmSt = { background:C.white, borderRadius:32, boxShadow:"0 10px 40px rgba(26,26,46,0.05)", border:`2px solid ${C.primaryFg}`, padding:24, position:"relative", overflow:"hidden" };
const inputSt  = { width:"100%", padding:"14px 20px", background:C.bgSoft, borderRadius:24, border:"2px solid transparent", outline:"none", fontSize:16, fontWeight:600, color:C.ink, fontFamily:"inherit", boxSizing:"border-box", marginBottom:8, display:"block" };
const labelSt  = { fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", color:C.inkSoft, display:"block", marginBottom:8 };
const tagSt    = (bg,fg) => ({ background:bg, color:fg, borderRadius:8, padding:"3px 10px", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", display:"inline-block" });
const pillSt   = (active,bg,fg) => ({ padding:"8px 18px", borderRadius:20, fontWeight:700, fontSize:13, cursor:"pointer", border:`2px solid ${active?bg:C.inkFaint}`, background:active?bg:C.white, color:active?fg:C.inkSoft, transition:"all .15s", whiteSpace:"nowrap" });
const iconBtnSt= (bg,fg) => ({ padding:10, background:bg, borderRadius:16, border:"none", cursor:"pointer", color:fg, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s" });

// ── Primitives ─────────────────────────────────────────────────
function AccentBar({ color }) {
  return <div style={{ position:"absolute", top:0, left:0, width:6, height:"100%", background:color||C.primary, borderRadius:"40px 0 0 40px" }} />;
}
function MovementDots({ level }) {
  return (
    <div style={{ display:"flex", gap:3, alignItems:"center" }}>
      {[1,2,3,4].map(i=><Activity key={i} size={14} style={{ color:i<=level?C.accent:C.inkFaint, fill:i<=level?C.accent:"none" }} />)}
    </div>
  );
}
function HeartRow({ val, setVal, size=36 }) {
  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
      {[1,2,3,4,5].map(i=>(
        <button key={i} onClick={()=>setVal&&setVal(i)} style={{ background:"none", border:"none", cursor:"pointer", padding:2 }}>
          <Heart size={size} style={{ color:i<=val?"#EF4444":C.inkFaint, fill:i<=val?"#EF4444":"none" }} />
        </button>
      ))}
    </div>
  );
}
function BigBtn({ children, onClick, disabled, color=C.primary }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"14px 24px", background:disabled?C.inkFaint:color, color:C.white, borderRadius:20, fontWeight:800, fontSize:15, border:"none", cursor:disabled?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:disabled?"none":`0 8px 24px ${color}40`, transition:"all .15s", opacity:disabled?0.5:1 }}>
      {children}
    </button>
  );
}
function Modal({ show, onClose, title, accentColor, children }) {
  if (!show) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:4000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(26,26,46,0.6)", backdropFilter:"blur(8px)" }} />
      <div style={{ position:"relative", width:"100%", maxWidth:440, background:C.white, borderRadius:48, padding:40, boxShadow:"0 40px 80px rgba(0,0,0,0.2)", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, width:"100%", height:4, background:accentColor||C.primary }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <h3 style={{ fontWeight:900, fontSize:28, color:C.ink, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:C.bgSoft, border:"none", borderRadius:12, padding:8, cursor:"pointer" }}><X size={22} style={{ color:C.inkSoft }} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Empty({ icon:Icon, title, text }) {
  return (
    <div style={{ background:C.white, borderRadius:40, padding:48, textAlign:"center", border:`2px solid ${C.primaryFg}` }}>
      <div style={{ width:72, height:72, background:C.bgSoft, borderRadius:24, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <Icon size={36} style={{ color:C.inkFaint }} />
      </div>
      <h3 style={{ fontWeight:800, fontSize:20, color:C.ink, marginBottom:8 }}>{title}</h3>
      <p style={{ color:C.inkSoft, fontSize:14, fontWeight:500 }}>{text}</p>
    </div>
  );
}
function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom:20 }}>
      <h2 style={{ fontWeight:900, fontSize:36, color:C.ink, margin:"0 0 4px", letterSpacing:"-1px", lineHeight:1.1 }}>{title}</h2>
      <p style={{ fontSize:14, color:C.inkSoft, fontWeight:600, margin:0 }}>{subtitle}</p>
    </div>
  );
}
function Loading() {
  return (
    <div style={{ textAlign:"center", padding:40, color:C.inkSoft, fontWeight:700 }}>
      <Loader2 size={32} style={{ color:C.primary, margin:"0 auto 12px", display:"block" }} className="animate-spin" />
      Generating ideas for your family…
    </div>
  );
}

// ── NEW: Hamburger Menu ────────────────────────────────────────
function HamburgerMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = (page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", background:C.white, border:`2px solid ${C.primaryFg}`, borderRadius:14, fontWeight:800, fontSize:13, cursor:"pointer", color:C.ink }}>
        <Menu size={18} style={{ color:C.primary }} />
        <ChevronDown size={14} style={{ color:C.inkSoft, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }} />
      </button>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:200, background:C.white, borderRadius:20, boxShadow:"0 16px 48px rgba(26,26,46,0.16)", border:`1.5px solid ${C.primaryFg}`, zIndex:3000, overflow:"hidden" }}>
          <button onClick={()=>navigate('nearby')} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"14px 18px", border:"none", background:"transparent", cursor:"pointer", borderBottom:`1px solid ${C.primaryFg}`, textAlign:"left", fontWeight:700, fontSize:14, color:C.ink, transition:"background .15s" }} onMouseEnter={e=>e.target.style.background=C.bgSoft} onMouseLeave={e=>e.target.style.background="transparent"}>
            <MapPin size={18} style={{ color:C.accent }} /> Nearby Places
          </button>
          <button onClick={()=>navigate('history')} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"14px 18px", border:"none", background:"transparent", cursor:"pointer", textAlign:"left", fontWeight:700, fontSize:14, color:C.ink, transition:"background .15s" }} onMouseEnter={e=>e.target.style.background=C.bgSoft} onMouseLeave={e=>e.target.style.background="transparent"}>
            <History size={18} style={{ color:C.success }} /> Our Journey
          </button>
        </div>
      )}
    </div>
  );
}

// ── Children Dropdown ──────────────────────────────────────────
const ChildrenDropdown = ({ state, update, triggerAddRef }) => {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name:"", age:"5", gender:"Boy" });
  const ref = useRef(null);

  useEffect(() => {
    if (triggerAddRef) {
      triggerAddRef.current = () => {
        setOpen(true);
        setAdding(true);
      };
    }
  }, [triggerAddRef]);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addKid = () => {
    if (!form.name||!form.age) return;
    const newKid = {...form, id:Date.now(), age:parseInt(form.age)};
    update({ kids:[...state.kids, newKid] });
    
    if (state.kids.length === 0) {
      update({ 
        lastSelection: {
          selectedKids: [newKid.id],
          mode: "👤 Individual",
          adults: 0,
          extraKids: 0,
        }
      });
    }
    
    setForm({ name:"",age:"5",gender:"Boy" }); 
    setAdding(false);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={()=>{ setOpen(o=>!o); setAdding(false); }} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", background:C.white, border:`2px solid ${C.primaryFg}`, borderRadius:14, fontWeight:800, fontSize:13, cursor:"pointer", color:C.ink }}>
        <Users size={16} style={{ color:C.primary }} />
        Children
        <span style={{ background:C.primary, color:"#fff", borderRadius:20, padding:"1px 8px", fontSize:11, fontWeight:800 }}>{state.kids.length}</span>
        <ChevronDown size={14} style={{ color:C.inkSoft, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }} />
      </button>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, width:320, background:C.white, borderRadius:24, boxShadow:"0 16px 48px rgba(26,26,46,0.16)", border:`1.5px solid ${C.primaryFg}`, zIndex:3000, overflow:"hidden" }}>
          <div style={{ padding:"16px 20px 12px", borderBottom:`1.5px solid ${C.primaryFg}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontWeight:800, fontSize:14, color:C.ink }}>Family Profiles</span>
            <button onClick={()=>setAdding(a=>!a)} style={{ display:"flex", alignItems:"center", gap:4, padding:"5px 12px", background:C.primaryFg, color:C.primary, border:"none", borderRadius:10, fontWeight:800, fontSize:12, cursor:"pointer" }}>
              <Plus size={13} /> Add
            </button>
          </div>
          {adding && (
            <div style={{ padding:"14px 20px", borderBottom:`1.5px solid ${C.primaryFg}`, background:C.bgSoft }}>
              <input placeholder="Child's name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{ ...inputSt, fontSize:13, padding:"10px 14px", marginBottom:8 }} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                <input type="number" min={0} max={14} placeholder="Age" value={form.age} onChange={e=>setForm(f=>({...f,age:e.target.value}))} style={{ ...inputSt, fontSize:13, padding:"10px 14px", marginBottom:0 }} />
                <select value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))} style={{ ...inputSt, fontSize:13, padding:"10px 14px", marginBottom:0, appearance:"none" }}>
                  {GENDERS.map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={addKid} disabled={!form.name||!form.age} style={{ flex:1, padding:"9px 0", background:C.primary, color:"#fff", border:"none", borderRadius:12, fontWeight:800, fontSize:13, cursor:"pointer", opacity:(!form.name||!form.age)?0.4:1 }}>Save</button>
                <button onClick={()=>setAdding(false)} style={{ padding:"9px 16px", background:C.bgSoft, color:C.inkSoft, border:"none", borderRadius:12, fontWeight:800, fontSize:13, cursor:"pointer" }}>Cancel</button>
              </div>
            </div>
          )}
          <div style={{ maxHeight:260, overflowY:"auto" }}>
            {state.kids.length===0 && <div style={{ padding:"24px 20px", textAlign:"center", color:C.inkSoft, fontSize:13 }}>No children added yet.</div>}
            {state.kids.map(k=>(
              <div key={k.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:`1px solid ${C.primaryFg}` }}>
                <div style={{ width:36, height:36, background:C.primaryFg, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Baby size={18} style={{ color:C.primary }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:800, fontSize:13, color:C.ink }}>{k.name}</div>
                  <div style={{ fontSize:11, color:C.inkSoft }}>{k.age}y · {k.gender}</div>
                </div>
                <button onClick={()=>update({kids:state.kids.filter(x=>x.id!==k.id)})} style={{ background:"none", border:"none", color:C.inkFaint, cursor:"pointer", padding:4, borderRadius:8 }}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── NEW: Onboarding Card for First-Time Users ─────────────────
function OnboardingCard({ onAddChild }) {
  return (
    <div style={{ ...cardSt, textAlign:"center", marginTop:40 }}>
      <div style={{ fontSize:64, marginBottom:16 }}>👨‍👩‍👧‍👦</div>
      <h2 style={{ fontWeight:900, fontSize:32, color:C.ink, marginBottom:12 }}>Welcome to Kindred!</h2>
      <p style={{ fontSize:16, color:C.inkMid, lineHeight:1.7, marginBottom:24, maxWidth:400, margin:"0 auto 24px" }}>
        Let's start by adding your children to get personalized activities tailored just for them.
      </p>
      <button onClick={onAddChild} style={{ padding:"16px 32px", background:C.primary, color:"#fff", borderRadius:20, fontWeight:800, fontSize:16, border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:10, boxShadow:`0 8px 24px ${C.primary}40` }}>
        <Plus size={20} /> Add Your First Child
      </button>
    </div>
  );
}

// ── Environment Filter Chips ───────────────────────────────────
function EnvFilterChips({ envFilter, onChange }) {
  const select = val => {
    if (val === "none") {
      onChange([]);
    } else {
      onChange([val]);
    }
  };
  
  const isNone = envFilter.length === 0;
  
  return (
    <div style={{ marginBottom:20 }}>
      <p style={{ fontSize:12, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", color:C.inkSoft, marginBottom:8 }}>Environment (optional)</p>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={()=>select("none")} style={pillSt(isNone, C.inkMid, "#fff")}>
          ✨ No Preference
        </button>
        <button onClick={()=>select("indoor")} style={pillSt(envFilter.includes("indoor"), C.primary, "#fff")}>
          🏠 Indoor
        </button>
        <button onClick={()=>select("outdoor")} style={pillSt(envFilter.includes("outdoor"), C.success, "#fff")}>
          🌳 Outdoor
        </button>
      </div>
    </div>
  );
}

// ── NEW: Unified Activity Type Selector ────────────────────────
function ActivityTypeSelector({ state, update }) {
  const selectPlay = (index) => {
    update({ 
      activePlayCategory: index,
      activeLearnFocus: null,
    });
  };

  const selectLearn = (focusId) => {
    const current = state.activeLearnFocus;
    const newValue = current === focusId ? null : focusId;
    
    update({ 
      activeLearnFocus: newValue,
      activePlayCategory: newValue !== null ? null : state.activePlayCategory,
    });
  };

  return (
    <div style={{ marginBottom:24 }}>
      {/* Play Activities */}
      <div style={{ marginBottom:20 }}>
        <p style={{ fontSize:13, fontWeight:800, color:C.inkMid, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
          🎮 <span>Play Activities</span>
          <span style={{ fontSize:11, fontWeight:600, color:C.inkSoft }}>(choose one)</span>
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {PLAY_CATS.map((cat, i) => {
            const active = state.activePlayCategory === i;
            return (
              <button 
                key={cat.type} 
                onClick={() => selectPlay(i)} 
                style={{ 
                  padding:"20px 12px", 
                  borderRadius:24, 
                  border:`3px solid ${active ? cat.color : C.primaryFg}`, 
                  background:C.white, 
                  cursor:"pointer", 
                  display:"flex", 
                  flexDirection:"column", 
                  alignItems:"center", 
                  gap:8, 
                  transform:active ? "scale(1.04)" : "scale(1)", 
                  transition:"all .15s", 
                  boxShadow:active ? `0 8px 24px ${cat.color}25` : "none" 
                }}
              >
                <div style={{ 
                  width:46, 
                  height:46, 
                  borderRadius:14, 
                  background:active ? cat.color : C.bgSoft, 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"center" 
                }}>
                  <cat.icon size={24} style={{ color:active ? "#fff" : C.inkFaint }} />
                </div>
                <span style={{ 
                  fontSize:11, 
                  fontWeight:800, 
                  color:active ? cat.color : C.inkSoft, 
                  textAlign:"center",
                  lineHeight:1.3
                }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Learning Focuses */}
      <div>
        <p style={{ fontSize:13, fontWeight:800, color:C.inkMid, marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
          🧠 <span>Learning Focuses</span>
          <span style={{ fontSize:11, fontWeight:600, color:C.inkSoft }}>(choose one)</span>
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {LEARN_FOCUSES.map(focus => {
            const active = state.activeLearnFocus === focus.id;
            return (
              <button 
                key={focus.id} 
                onClick={() => selectLearn(focus.id)} 
                style={{ 
                  padding:"20px 12px", 
                  borderRadius:24, 
                  border:`3px solid ${active ? focus.color : C.primaryFg}`, 
                  background:C.white, 
                  cursor:"pointer", 
                  display:"flex", 
                  flexDirection:"column", 
                  alignItems:"center", 
                  gap:8, 
                  transform:active ? "scale(1.04)" : "scale(1)", 
                  transition:"all .15s", 
                  boxShadow:active ? `0 8px 24px ${focus.color}25` : "none" 
                }}
              >
                <div style={{ 
                  width:46, 
                  height:46, 
                  borderRadius:14, 
                  background:active ? focus.color : C.bgSoft, 
                  display:"flex", 
                  alignItems:"center", 
                  justifyContent:"center",
                  position:"relative"
                }}>
                  <focus.icon size={24} style={{ color:active ? "#fff" : C.inkFaint }} />
                  {active && (
                    <div style={{ 
                      position:"absolute", 
                      top:-4, 
                      right:-4, 
                      background:"#fff", 
                      borderRadius:"50%", 
                      padding:2,
                      boxShadow:"0 2px 8px rgba(0,0,0,0.15)"
                    }}>
                      <CheckCircle size={16} style={{ color:focus.color }} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <span style={{ 
                  fontSize:11, 
                  fontWeight:800, 
                  color:active ? focus.color : C.inkSoft, 
                  textAlign:"center",
                  lineHeight:1.3
                }}>
                  {focus.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── NEW: Enhanced Who's Joining Bar (without Generate button) ─────────
function JoiningBar({ state, update, accentColor }) {
  const [selKids, setSelKids] = useState([]);
  const [mode, setMode] = useState(null);
  const [adults, setAdults] = useState(0);
  const [extra, setExtra] = useState(0);

  useEffect(() => {
    if (state.lastSelection) {
      setSelKids(state.lastSelection.selectedKids || []);
      setMode(state.lastSelection.mode);
      setAdults(state.lastSelection.adults || 0);
      setExtra(state.lastSelection.extraKids || 0);
    }
  }, [state.lastSelection]);

  useEffect(() => {
    if (selKids.length > 0 && mode) {
      update({
        lastSelection: {
          selectedKids: selKids,
          mode: mode,
          adults: adults,
          extraKids: extra,
        }
      });
    }
  }, [selKids, mode, adults, extra, update]);

  const toggle = id => setSelKids(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  const fg = accentColor || C.primary;
  const isGroup = mode && mode.includes("Group");

  const Stepper = ({ val, setVal, lbl }) => (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <span style={{ fontSize:11, fontWeight:700, color:C.inkSoft, whiteSpace:"nowrap" }}>{lbl}</span>
      <div style={{ display:"flex", alignItems:"center", background:C.bgSoft, borderRadius:12, border:`1.5px solid ${C.primaryFg}`, overflow:"hidden" }}>
        <button onClick={()=>setVal(Math.max(0,val-1))} style={{ width:28, height:28, border:"none", background:"none", cursor:"pointer", fontWeight:800, color:fg, fontSize:16 }}>−</button>
        <span style={{ width:24, textAlign:"center", fontWeight:800, fontSize:13, color:C.ink }}>{val}{val>=5?"+":" "}</span>
        <button onClick={()=>setVal(Math.min(5,val+1))} style={{ width:28, height:28, border:"none", background:"none", cursor:"pointer", fontWeight:800, color:fg, fontSize:16 }}>+</button>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.white, borderRadius:24, border:`2px solid ${C.primaryFg}`, padding:"14px 18px", marginBottom:20, boxShadow:"0 4px 16px rgba(26,26,46,0.05)" }}>
      {state.kids.length === 0
        ? <p style={{ color:C.inkSoft, fontSize:13, margin:0 }}>Add children via the Children menu in the top-right corner.</p>
        : <>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center", marginBottom:10 }}>
            <span style={{ fontSize:11, fontWeight:800, color:C.inkSoft, textTransform:"uppercase", letterSpacing:"0.07em", marginRight:4 }}>For</span>
            {state.kids.map(k=>(
              <button key={k.id} onClick={()=>toggle(k.id)} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:16, fontWeight:700, fontSize:12, cursor:"pointer", border:`2px solid ${selKids.includes(k.id)?fg:C.inkFaint}`, background:selKids.includes(k.id)?fg:C.white, color:selKids.includes(k.id)?"#fff":C.inkSoft, transition:"all .12s" }}>
                <Baby size={12} /> {k.name}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
            {["👤 Individual","👨‍👩‍👧 Group"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{ ...pillSt(mode===m,fg,"#fff"), padding:"6px 14px", fontSize:12 }}>{m}</button>
            ))}
            {isGroup && (
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:11, fontWeight:800, color:C.inkSoft, display:"flex", alignItems:"center", gap:4 }}>
                  <Plus size={12} /> Optionally add:
                </span>
                <Stepper val={adults} setVal={setAdults} lbl="Adults" />
                <Stepper val={extra}  setVal={setExtra}  lbl="Extra kids" />
              </div>
            )}
          </div>
        </>
      }
    </div>
  );
}

// Enhanced Sticky Generate Button
function StickyGenerateButton({ onGenerate, genLabel, disabled }) {
  return (
    <div style={{ 
      position:"sticky", 
      bottom:100, 
      zIndex:1500, 
      display:"flex", 
      justifyContent:"center",
      pointerEvents:"none",
      marginTop:20,
      padding:"0 16px"
    }}>
      <div style={{
        pointerEvents:"auto",
        background:"rgba(255,255,255,0.7)",
        backdropFilter:"blur(12px)",
        borderRadius:36,
        padding:"6px",
        boxShadow:"0 16px 48px rgba(26,26,46,0.2), 0 0 0 1px rgba(255,255,255,0.8)",
        border:"3px solid rgba(255,255,255,0.9)"
      }}>
        <button 
          onClick={onGenerate} 
          disabled={disabled}
          style={{ 
            display:"flex", 
            alignItems:"center", 
            gap:10, 
            padding:"14px 36px", 
            background:disabled ? C.inkFaint : C.primary,
            color:"#fff", 
            border:"none", 
            borderRadius:30, 
            fontWeight:900, 
            fontSize:16, 
            cursor:disabled ? "not-allowed" : "pointer", 
            opacity:disabled ? 0.5 : 1, 
            boxShadow:disabled ? "none" : `0 8px 32px ${C.primary}60, inset 0 1px 0 rgba(255,255,255,0.2)`, 
            transition:"all .2s",
            transform:disabled ? "scale(1)" : "scale(1)",
            letterSpacing:"0.02em"
          }}
          onMouseEnter={e => !disabled && (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={e => !disabled && (e.target.style.transform = "scale(1)")}
        >
          <Sparkles size={22} fill="currentColor" style={{ filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} /> 
          <span>{genLabel || "Generate"}</span>
        </button>
      </div>
    </div>
  );
}

// ── Idea Card ───────────────
function IdeaCard({ idea, onDiscard, onSave, onComplete, isSaved, accentColor, isLearning }) {
  const [phase, setPhase] = useState("idle");
  const [discardReason, setDiscardReason] = useState("");
  const [difficulty, setDifficulty] = useState(2);
  const [enjoyment, setEnjoyment] = useState(3);
  const [expanded, setExpanded] = useState(false);
  const fg = accentColor||C.primary;
  const mats = Array.isArray(idea.materials) ? idea.materials : (typeof idea.materials==="string"&&idea.materials ? [idea.materials] : []);
  
  const focusTags = isLearning && idea.focuses ? (Array.isArray(idea.focuses) ? idea.focuses : [idea.focuses]) : [];

  return (
    <div style={{ ...cardSt, marginBottom:20 }}>
      <AccentBar color={fg} />
      <div style={{ paddingLeft:18 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, marginBottom:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
              {focusTags.map(fid=>{
                const f = LEARN_FOCUSES.find(x=>x.id===fid);
                if (!f) return null;
                return <span key={fid} style={{ ...tagSt(f.color+"22",f.color), display:"inline-flex", alignItems:"center", gap:3 }}>{f.emoji} {f.label}</span>;
              })}
              {idea.category && <span style={tagSt(C.primaryFg,C.primary)}>{idea.category}</span>}
              {idea.effortLevel && <MovementDots level={idea.effortLevel} />}
            </div>
            <h3 style={{ fontWeight:900, fontSize:22, color:C.ink, margin:0, lineHeight:1.2 }}>{idea.title}</h3>
          </div>
          <div style={{ display:"flex", gap:8, flexShrink:0 }}>
            <button onClick={()=>setPhase("discard")} style={iconBtnSt(C.redFg,"#EF4444")}><Trash2 size={20} /></button>
            {!isSaved && <button onClick={()=>onSave(idea)} style={iconBtnSt(C.primaryFg,C.primary)}><Bookmark size={20} /></button>}
            <button onClick={()=>setPhase("complete")} style={iconBtnSt(C.successFg,C.success)}><CheckCircle size={20} /></button>
          </div>
        </div>

        <p style={{ fontSize:15, lineHeight:1.7, color:C.inkMid, fontWeight:500, marginBottom:10 }}>{idea.description}</p>

        {isLearning && Array.isArray(idea.learningOutcomes) && idea.learningOutcomes.length>0 && (
          <div style={{ background:C.primaryFg, borderRadius:16, padding:"12px 16px", borderLeft:`3px solid ${C.primary}`, marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:800, color:C.primary, marginBottom:6 }}>🎯 LEARNING OUTCOMES</div>
            <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:C.primary, lineHeight:1.6 }}>
              {idea.learningOutcomes.map((o,i)=><li key={i}>{o}</li>)}
            </ul>
          </div>
        )}

        {(idea.whySuitable||idea.develops||mats.length>0) && (
          <button onClick={()=>setExpanded(!expanded)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:C.inkSoft, fontSize:12, fontWeight:700, padding:0, marginBottom:expanded?12:0 }}>
            {expanded?<ChevronUp size={14}/>:<ChevronDown size={14}/>} {expanded?"Less":"More details"}
          </button>
        )}
        {expanded && (
          <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:12, borderTop:`2px solid ${C.primaryFg}` }}>
            {idea.whySuitable && (
              <div style={{ background:C.successFg, borderRadius:16, padding:"10px 14px", borderLeft:`3px solid ${C.success}` }}>
                <p style={{ fontSize:13, color:C.success, margin:0, lineHeight:1.6 }}><strong>Why it works:</strong> {idea.whySuitable}</p>
              </div>
            )}
            {idea.develops && (
              <div style={{ background:C.primaryFg, borderRadius:16, padding:"10px 14px", borderLeft:`3px solid ${C.primary}` }}>
                <p style={{ fontSize:13, color:C.primary, margin:0, lineHeight:1.6 }}><strong>🧠 Develops:</strong> {idea.develops}</p>
              </div>
            )}
            {mats.length>0 && (
              <div>
                <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.08em", color:C.inkSoft, marginBottom:6 }}>You'll need</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {mats.map((m,i)=><span key={i} style={{ background:C.bgSoft, border:`2px solid ${C.primaryFg}`, borderRadius:10, padding:"4px 12px", fontSize:12, fontWeight:700, color:C.inkMid }}>{m}</span>)}
                </div>
              </div>
            )}
          </div>
        )}

        {phase==="discard" && (
          <div style={{ background:C.redFg, borderRadius:20, padding:18, marginTop:14 }}>
            <p style={{ fontWeight:800, color:"#C0392B", marginBottom:12, fontSize:13 }}>Why are you discarding this?</p>
            {DISCARD_REASONS.map(r=>(
              <label key={r} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:13, cursor:"pointer", color:C.inkMid }}>
                <input type="radio" name={`dr-${idea.id}`} onChange={()=>setDiscardReason(r)} style={{ accentColor:"#EF4444" }} />{r}
              </label>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:12 }}>
              <button onClick={()=>onDiscard(idea,discardReason)} style={{ padding:"8px 20px", background:"#EF4444", color:"#fff", border:"none", borderRadius:12, fontWeight:800, cursor:"pointer", fontSize:13 }}>Confirm</button>
              <button onClick={()=>setPhase("idle")} style={{ padding:"8px 20px", background:C.bgSoft, color:C.inkSoft, border:"none", borderRadius:12, fontWeight:800, cursor:"pointer", fontSize:13 }}>Cancel</button>
            </div>
          </div>
        )}
        {phase==="complete" && (
          <div style={{ background:C.successFg, borderRadius:20, padding:18, marginTop:14 }}>
            <p style={{ fontWeight:800, color:C.success, marginBottom:16, fontSize:14 }}>🎉 How did it go?</p>
            <span style={labelSt}>Difficulty for the kids</span>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
              {DIFFICULTY_OPTS.map((d,i)=>(
                <button key={d} onClick={()=>setDifficulty(i)} style={{ padding:"10px 8px", borderRadius:12, border:`2px solid ${difficulty===i?C.success:C.inkFaint}`, background:difficulty===i?C.success:C.white, color:difficulty===i?"#fff":C.inkMid, fontWeight:700, fontSize:12, cursor:"pointer" }}>{d}</button>
              ))}
            </div>
            <span style={labelSt}>Did they enjoy it?</span>
            <div style={{ marginBottom:16 }}><HeartRow val={enjoyment} setVal={setEnjoyment} size={32} /></div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>onComplete(idea,difficulty,enjoyment)} style={{ padding:"10px 20px", background:C.success, color:"#fff", border:"none", borderRadius:12, fontWeight:800, cursor:"pointer" }}>Save</button>
              <button onClick={()=>setPhase("idle")} style={{ padding:"10px 20px", background:C.bgSoft, color:C.inkSoft, border:"none", borderRadius:12, fontWeight:800, cursor:"pointer" }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared idea logic ──────────────────────────────────────────
function useIdeas(state, update) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const generate = async (prompt) => { setLoading(true); const r=await callClaude(prompt,state.lang); setIdeas(r||[]); setLoading(false); };
  const onDiscard = (idea,reason) => {
    setIdeas(p=>p.filter(i=>i.id!==idea.id));
    const loop=state.feedbackLoop||{};
    update({feedbackLoop:{...loop,discarded:[...(loop.discarded||[]),{ideaId:idea.id,reason,ts:Date.now()}]}});
  };
  const onSave = idea => { if(!state.savedIdeas.find(s=>s.id===idea.id)) update({savedIdeas:[...state.savedIdeas,{...idea,savedAt:Date.now()}]}); };
  const onComplete = (idea,difficulty,enjoyment) => {
    setIdeas(p=>p.filter(i=>i.id!==idea.id));
    update({completedActivities:[...state.completedActivities,{...idea,ideaId:idea.id,completedAt:Date.now(),difficulty,enjoyment}]});
  };
  return { ideas, loading, generate, onDiscard, onSave, onComplete };
}

// ── NEW: Unified Activities Section ────────────────────────────
function ActivitiesSection({ state, update }) {
  const { ideas, loading, generate, onDiscard, onSave, onComplete } = useIdeas(state, update);
  const envHint = (state.envFilter||[]).length>0 ? ` Preferred setting: ${state.envFilter.join(" or ")}.` : "";

  const doGenerate = () => {
    const { selectedKids, mode, adults, extraKids } = state.lastSelection || {};
    if (!selectedKids || selectedKids.length === 0 || !mode) return;
    
    const kids = state.kids.filter(k=>selectedKids.includes(k));
    const kidsDesc = kids.map(k=>`${k.name} (${k.age}yo, ${k.gender}, ${AGE_GROUPS(k.age)})`).join(", ");
    const isGroup = mode && mode.includes("Group");
    
    if (state.activePlayCategory !== null) {
      const cat = PLAY_CATS[state.activePlayCategory];
      const prompt = `Inspiration: ${cat.examples}\n\nGenerate 4 specific, hands-on ${cat.label} activities for: ${kidsDesc}. Mode: ${mode}. Adults: ${isGroup ? adults : 0}. Extra kids: ${isGroup ? extraKids : 0}.${envHint} Return JSON array: [{id,title,description,whySuitable,develops,effortLevel(1-4),category:"${cat.type}",materials:[]}]. Materials must be a JSON array.`;
      generate(prompt);
      return;
    }
    
    if (state.activeLearnFocus) {
      const focus = LEARN_FOCUSES.find(f => f.id === state.activeLearnFocus);
      if (!focus) return;
      
      const prompt = `Generate 4 experiential learning activities focused on: ${focus.label} for: ${kidsDesc}. Mode: ${mode}. Adults: ${isGroup ? adults : 0}. Extra kids: ${isGroup ? extraKids : 0}.${envHint} Homeschool/worldschool hands-on style. Return JSON: [{id,title,description,whySuitable,develops,effortLevel(1-4),focuses:"${state.activeLearnFocus}",learningOutcomes:["outcome1","outcome2","outcome3"],materials:[]}]. All arrays must be JSON arrays.`;
      generate(prompt);
      return;
    }
  };

  const getGenerateLabel = () => {
    if (state.activePlayCategory !== null) {
      return `Generate ${PLAY_CATS[state.activePlayCategory].label}`;
    }
    if (state.activeLearnFocus) {
      const focus = LEARN_FOCUSES.find(f => f.id === state.activeLearnFocus);
      return focus ? `Generate ${focus.label}` : "Generate Learning";
    }
    return "Select Activity Type";
  };

  const getAccentColor = () => {
    if (state.activePlayCategory !== null) {
      return PLAY_CATS[state.activePlayCategory].color;
    }
    if (state.activeLearnFocus) {
      const focus = LEARN_FOCUSES.find(f => f.id === state.activeLearnFocus);
      return focus ? focus.color : C.primary;
    }
    return C.primary;
  };

  const canGenerate = (state.activePlayCategory !== null || state.activeLearnFocus) && 
                      state.lastSelection?.selectedKids?.length > 0 && 
                      state.lastSelection?.mode;
  const isLearning = !!state.activeLearnFocus;

  return (
    <div>
      <PageHeader title="Discover & Learn" subtitle="Activities designed for your family's growth" />
      
      <JoiningBar 
        state={state} 
        update={update}
        accentColor={getAccentColor()} 
      />

      <ActivityTypeSelector state={state} update={update} />
      
      <EnvFilterChips envFilter={state.envFilter||[]} onChange={val=>update({envFilter:val})} />

      <StickyGenerateButton 
        onGenerate={doGenerate}
        genLabel={getGenerateLabel()}
        disabled={!canGenerate}
      />

      {!canGenerate && !loading && ideas.length === 0 && (
        <div style={{ ...cardSt, textAlign:"center", padding:40 }}>
          <Sparkles size={48} style={{ color:C.inkFaint, margin:"0 auto 16px" }} />
          <p style={{ fontSize:16, color:C.inkMid, fontWeight:600 }}>
            {!(state.activePlayCategory !== null || state.activeLearnFocus) 
              ? "Select a Play category or Learning focus above, then click Generate"
              : "Select children and mode above, then click Generate"
            }
          </p>
        </div>
      )}

      {loading && <Loading />}
      {ideas.map(idea=><IdeaCard key={idea.id} idea={idea} onDiscard={onDiscard} onSave={onSave} onComplete={onComplete} isSaved={!!state.savedIdeas.find(s=>s.id===idea.id)} accentColor={getAccentColor()} isLearning={isLearning} />)}
    </div>
  );
}

// ── Map Section ────────────────────────────────────────────────
function MapSection({ state }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [located, setLocated] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  const findPlaces = () => {
    setLoading(true); setError("");
    navigator.geolocation.getCurrentPosition(async pos => {
      const {latitude:lat,longitude:lng} = pos.coords;
      const qs = ["parks","playgrounds","children museum","fun park","zoo","skate park","sports center","science center"];
      const all = await Promise.all(qs.map(q=>callClaude(`Give 2 realistic kid-friendly "${q}" places near lat:${lat} lng:${lng}. JSON: [{name,type,description,ageRange,emoji,distance}].`,state.lang).catch(()=>[])));
      setPlaces(all.flat()); setLocated(true); setLoading(false);
    }, ()=>{ setError("Location access denied. Please enable location in your browser."); setLoading(false); });
  };

  return (
    <div>
      <PageHeader title="Nearby Adventures" subtitle="Playgrounds, parks and trails around you." />
      <div style={{ ...cardSt, marginBottom:20 }}>
        <div style={{ display:"flex", gap:12, marginBottom:14 }}>
          <div style={{ flex:1, position:"relative" }}>
            <input placeholder="Enter a city, address or landmark…" value={address} onChange={e=>setAddress(e.target.value)} style={{ ...inputSt, paddingLeft:44, marginBottom:0 }} />
            <Navigation size={18} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:C.primary }} />
          </div>
          <button onClick={findPlaces} style={{ padding:"0 24px", background:C.primary, color:"#fff", border:"none", borderRadius:20, fontWeight:800, cursor:"pointer", fontSize:14, flexShrink:0 }}>Search</button>
        </div>
        <BigBtn onClick={findPlaces} color={C.primary}><MapPin size={18} /> Find Places Near Me</BigBtn>
        {error && <p style={{ color:"#EF4444", marginTop:10, fontSize:13, textAlign:"center" }}>{error}</p>}
      </div>
      {loading && <Loading />}
      {located && places.length>0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
          {places.map((p,i)=>(
            <div key={i} style={{ ...cardSmSt }}>
              <AccentBar color={C.accent} />
              <div style={{ paddingLeft:16 }}>
                <div style={{ fontSize:34, marginBottom:8 }}>{p.emoji||"📍"}</div>
                <div style={{ fontWeight:800, fontSize:14, color:C.ink, marginBottom:2 }}>{p.name}</div>
                <div style={{ fontSize:11, color:C.accent, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>{p.type}</div>
                <div style={{ fontSize:12, color:C.inkMid, lineHeight:1.6, marginBottom:8 }}>{p.description}</div>
                {p.ageRange && <span style={tagSt(C.successFg,C.success)}>👶 {p.ageRange}</span>}
                {p.distance && <div style={{ fontSize:11, color:C.success, fontWeight:700, marginTop:6, display:"flex", alignItems:"center", gap:4 }}><Navigation size={12}/>{p.distance}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── History Section ────────────────────────────────────────────
function HistorySection({ state }) {
  const acts = [...state.completedActivities].sort((a,b)=>b.completedAt-a.completedAt);
  const avgE = acts.length?(acts.reduce((s,a)=>s+a.enjoyment,0)/acts.length).toFixed(1):"—";
  return (
    <div>
      <PageHeader title="Our Journey" subtitle="A timeline of memories and activities." />
      <div style={{ display:"flex", gap:12, marginBottom:24 }}>
        {[["🎯","Total Done",acts.length,C.primary],["❤️","Avg Enjoyment",avgE,"#EF4444"],["✅","Completed",acts.length,C.success]].map(([icon,lbl,val,color])=>(
          <div key={lbl} style={{ flex:1, background:C.white, borderRadius:20, padding:"16px 12px", textAlign:"center", border:`2px solid ${C.primaryFg}` }}>
            <div style={{ fontSize:22 }}>{icon}</div>
            <div style={{ fontWeight:900, fontSize:20, color }}>{val}</div>
            <div style={{ fontSize:10, color:C.inkSoft, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em" }}>{lbl}</div>
          </div>
        ))}
      </div>
      {acts.length===0
        ? <Empty icon={CheckCircle} title="No memories saved yet" text="Start an activity to begin your journey." />
        : <div style={{ position:"relative", paddingLeft:24 }}>
            <div style={{ position:"absolute", left:8, top:0, bottom:0, width:3, background:C.primaryFg, borderRadius:2 }} />
            {acts.map((a,i)=>(
              <div key={i} style={{ position:"relative", paddingBottom:20 }}>
                <div style={{ position:"absolute", left:-20, top:4, width:16, height:16, background:C.primary, borderRadius:"50%", border:`3px solid ${C.white}`, boxShadow:`0 2px 8px ${C.primary}40` }} />
                <div style={{ ...cardSmSt }}>
                  <AccentBar color={C.success} />
                  <div style={{ paddingLeft:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
                      <div>
                        <span style={{ fontSize:11, fontWeight:800, color:C.primary, textTransform:"uppercase", letterSpacing:"0.05em" }}>{new Date(a.completedAt).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</span>
                        <h3 style={{ fontWeight:800, fontSize:18, color:C.ink, margin:"4px 0" }}>{a.title}</h3>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          {a.category && <span style={tagSt(C.primaryFg,C.primary)}>{a.category}</span>}
                          {a.topic && <span style={tagSt(C.primaryFg,C.primary)}>{a.topic}</span>}
                          <span style={tagSt(C.successFg,C.success)}>{DIFFICULTY_OPTS[a.difficulty]||"Just right"}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:3 }}>
                        {[1,2,3,4,5].map(j=><Heart key={j} size={16} style={{ color:j<=a.enjoyment?"#EF4444":C.inkFaint, fill:j<=a.enjoyment?"#EF4444":"none" }} />)}
                      </div>
                    </div>
                    {a.develops && <div style={{ fontSize:12, color:C.inkSoft, marginTop:8, lineHeight:1.5 }}>🧠 {a.develops}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

// ── Community Section ──────────────────────────────────────────
function CommunitySection({ state, update }) {
  const [tab, setTab] = useState("Browse");
  const [form, setForm] = useState({title:"",description:"",category:"Play"});
  const [fbTarget, setFbTarget] = useState(null);
  const [fbRel, setFbRel] = useState(3);
  const [fbSuit, setFbSuit] = useState(3);
  const [fbTry, setFbTry] = useState("Yes");
  const [fbComment, setFbComment] = useState("");

  const submitIdea = () => { if(!form.title) return; update({communityIdeas:[...state.communityIdeas,{...form,id:Date.now(),votes:0,ts:Date.now()}]}); setForm({title:"",description:"",category:"Play"}); };
  const vote = (id,v) => update({communityIdeas:state.communityIdeas.map(i=>i.id===id?{...i,votes:(i.votes||0)+v}:i)});
  const submitFb = () => { update({communityFeedback:[...state.communityFeedback,{ideaId:fbTarget,relevance:fbRel,suitability:fbSuit,wouldTry:fbTry,comment:fbComment,ts:Date.now()}]}); setFbTarget(null); setFbComment(""); };

  const SubTabs = ({ tabs, active, onChange }) => (
    <div style={{ display:"flex", background:C.white, borderRadius:24, padding:6, border:`2px solid ${C.primaryFg}`, boxShadow:"0 4px 12px rgba(26,26,46,0.04)", width:"fit-content", marginBottom:24 }}>
      {tabs.map(t=>(
        <button key={t} onClick={()=>onChange(t)} style={{ padding:"8px 24px", borderRadius:18, fontWeight:800, fontSize:13, border:"none", cursor:"pointer", background:active===t?C.primary:"transparent", color:active===t?"#fff":C.inkSoft, boxShadow:active===t?"0 4px 12px rgba(108,71,255,0.25)":"none", transition:"all .15s" }}>{t}</button>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader title="Community" subtitle="Share ideas, rate suggestions and help all families." />
      <SubTabs tabs={["Browse","Submit"]} active={tab} onChange={setTab} />
      {tab==="Browse" && (state.communityIdeas.length===0
        ? <Empty icon={MessageCircle} title="No ideas yet" text="Be the first to share an idea with the community!" />
        : [...state.communityIdeas].sort((a,b)=>(b.votes||0)-(a.votes||0)).map(idea=>(
          <div key={idea.id} style={{ ...cardSt, marginBottom:16 }}>
            <AccentBar color={C.accent} />
            <div style={{ paddingLeft:18 }}>
              <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                <span style={tagSt(C.accentFg,C.accent)}>{idea.category}</span>
                <span style={{ fontSize:11, color:C.inkSoft, fontWeight:600 }}>{new Date(idea.ts).toLocaleDateString()}</span>
              </div>
              <h3 style={{ fontWeight:800, fontSize:20, color:C.ink, marginBottom:8 }}>{idea.title}</h3>
              <p style={{ fontSize:14, color:C.inkMid, marginBottom:14, lineHeight:1.7 }}>{idea.description}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <button onClick={()=>vote(idea.id,1)} style={{ ...iconBtnSt(C.successFg,C.success), padding:"8px 14px", gap:4 }}><span style={{ fontWeight:800, fontSize:13 }}>👍 {idea.votes||0}</span></button>
                <button onClick={()=>vote(idea.id,-1)} style={{ ...iconBtnSt(C.redFg,"#EF4444"), padding:"8px 14px" }}><span>👎</span></button>
                <button onClick={()=>setFbTarget(fbTarget===idea.id?null:idea.id)} style={{ ...iconBtnSt(C.primaryFg,C.primary), padding:"8px 14px", gap:4 }}><span style={{ fontWeight:700, fontSize:13 }}>⭐ Rate</span></button>
              </div>
              {fbTarget===idea.id && (
                <div style={{ background:C.bgSoft, borderRadius:20, padding:16, marginTop:12 }}>
                  {[["Relevance",fbRel,setFbRel],["Suitability",fbSuit,setFbSuit]].map(([lbl,v,sv])=>(
                    <div key={lbl} style={{ marginBottom:12 }}>
                      <span style={labelSt}>{lbl}</span>
                      <div style={{ display:"flex", gap:6 }}>
                        {[1,2,3,4,5].map(i=><button key={i} onClick={()=>sv(i)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, opacity:i<=v?1:0.2 }}>⭐</button>)}
                      </div>
                    </div>
                  ))}
                  <span style={labelSt}>Would you try it?</span>
                  <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                    {["Yes","Maybe","No"].map(v=><button key={v} onClick={()=>setFbTry(v)} style={pillSt(fbTry===v,C.primary,"#fff")}>{v}</button>)}
                  </div>
                  <textarea placeholder="Leave a comment…" value={fbComment} onChange={e=>setFbComment(e.target.value)} style={{ ...inputSt, height:70, resize:"vertical" }} />
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={submitFb} style={{ padding:"10px 20px", background:C.primary, color:"#fff", border:"none", borderRadius:12, fontWeight:800, cursor:"pointer" }}>Submit</button>
                    <button onClick={()=>setFbTarget(null)} style={{ padding:"10px 20px", background:C.bgSoft, color:C.inkSoft, border:"none", borderRadius:12, fontWeight:800, cursor:"pointer" }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {tab==="Submit" && (
        <div style={{ ...cardSt }}>
          <AccentBar color={C.accent} />
          <div style={{ paddingLeft:18 }}>
            <h3 style={{ fontWeight:800, fontSize:20, color:C.ink, marginBottom:20 }}>💡 Share Your Idea</h3>
            <span style={labelSt}>Title</span>
            <input placeholder="Idea title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inputSt} />
            <span style={labelSt}>Description</span>
            <textarea placeholder="Describe your idea or app suggestion…" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} style={{ ...inputSt, height:90, resize:"vertical" }} />
            <span style={labelSt}>Category</span>
            <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{ ...inputSt, appearance:"none" }}>
              {["Play","Learning","App Feature","Other"].map(c=><option key={c}>{c}</option>)}
            </select>
            <BigBtn onClick={submitIdea} disabled={!form.title} color={C.accent}>🚀 Submit to Community</BigBtn>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────
export default function App() {
  const [state, update] = useAppState();
  const [section, setSection] = useState(0);
  const [page, setPage] = useState("activities");
  const triggerAddChildRef = useRef(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem("kidsplay_auth") === "1";
    setAuthenticated(isAuth);
  }, []);

  // Show password gate if not authenticated
  if (!authenticated) {
    return <PasswordGate onUnlock={() => setAuthenticated(true)} />;
  }

  const handleNavigate = (newPage) => {
    if (newPage === 'nearby') setPage('nearby');
    if (newPage === 'history') setPage('history');
  };

  const handleAddFirstChild = () => {
    if (triggerAddChildRef.current) {
      triggerAddChildRef.current();
    }
  };

  if (!state) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:C.bgSoft, gap:16 }}>
      <div style={{ width:64, height:64, background:C.primary, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 24px ${C.primary}40` }}>
        <Sparkles size={32} fill="#fff" style={{ color:"#fff" }} />
      </div>
      <div style={{ fontWeight:900, fontSize:20, color:C.ink }}>Loading Kindred…</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bgSoft, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif", color:C.ink }}>
      <header style={{ position:"sticky", top:0, zIndex:1000, background:"rgba(245,243,255,0.9)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.primaryFg}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 12px rgba(108,71,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:42, height:42, background:C.primary, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 16px ${C.primary}35` }}>
            <Sparkles size={21} fill="#fff" style={{ color:"#fff" }} />
          </div>
          <div>
            <div style={{ fontWeight:900, fontSize:19, color:C.primary, letterSpacing:"-0.5px", lineHeight:1 }}>Kindred</div>
            <div style={{ fontSize:9, fontWeight:800, color:C.inkSoft, textTransform:"uppercase", letterSpacing:"0.08em" }}>Family Activity Companion</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <HamburgerMenu onNavigate={handleNavigate} />
          <ChildrenDropdown state={state} update={update} triggerAddRef={triggerAddChildRef} />
          <select value={state.lang} onChange={e=>update({lang:e.target.value})} style={{ borderRadius:14, border:`2px solid ${C.primaryFg}`, padding:"7px 12px", fontWeight:700, fontSize:12, background:C.white, color:C.ink, cursor:"pointer", outline:"none" }}>
            {LANGUAGES.map(l=><option key={l}>{l}</option>)}
          </select>
        </div>
      </header>

      <main style={{ maxWidth:720, margin:"0 auto", padding:"20px 16px 120px" }}>
        {state.kids.length === 0 && page === "activities" && (
          <OnboardingCard onAddChild={handleAddFirstChild} />
        )}
        
        {state.kids.length > 0 && (
          <>
            {page === "activities" && section === 0 && <ActivitiesSection state={state} update={update} />}
            {page === "community" && section === 1 && <CommunitySection state={state} update={update} />}
            {page === "nearby" && <MapSection state={state} />}
            {page === "history" && <HistorySection state={state} />}
          </>
        )}
        
        {state.kids.length === 0 && page === "community" && <CommunitySection state={state} update={update} />}
      </main>

      <nav style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"rgba(26,26,46,0.92)", backdropFilter:"blur(12px)", borderRadius:32, padding:"10px 14px", display:"flex", alignItems:"center", gap:6, boxShadow:"0 8px 32px rgba(26,26,46,0.25)", zIndex:2000, border:"2px solid rgba(255,255,255,0.08)" }}>
        {NAV.map((item,i)=>(
          <button 
            key={item.id} 
            onClick={()=>{ setSection(i); setPage(item.id); }} 
            style={{ 
              display:"flex", 
              alignItems:"center", 
              gap:section===i?8:0, 
              padding:section===i?"10px 18px":"10px 12px", 
              borderRadius:22, 
              background:section===i?C.primary:"transparent", 
              border:"none", 
              cursor:"pointer", 
              color:section===i?"#fff":"rgba(255,255,255,0.45)", 
              fontWeight:800, 
              fontSize:13, 
              transition:"all .2s", 
              boxShadow:section===i?`0 4px 16px ${C.primary}50`:"none", 
              whiteSpace:"nowrap" 
            }}
          >
            <item.Icon size={22} fill={section===i?"currentColor":"none"} />
            {section===i && <span style={{ textTransform:"uppercase", fontSize:11, letterSpacing:"0.06em" }}>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
