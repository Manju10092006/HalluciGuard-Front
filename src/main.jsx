import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  FileSearch,
  FileText,
  GitBranch,
  Link2,
  Mail,
  Menu,
  Network,
  Phone,
  RefreshCw,
  Route,
  Scale,
  ScanSearch,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import './styles.css'

const capabilities = [
  ['Atomic claim extraction', ScanSearch, 'coral'],
  ['Source retrieval', FileSearch, 'blue'],
  ['Claim-source matching', Link2, 'violet'],
  ['Contradiction detection', AlertTriangle, 'amber'],
  ['Context preservation', FileText, 'mint'],
  ['Evidence grading', Scale, 'blue'],
  ['Multi-agent routing', Route, 'violet'],
  ['Human escalation', CircleHelp, 'coral'],
  ['Correction loop', RefreshCw, 'mint'],
  ['Provenance trail', GitBranch, 'amber'],
  ['Source quality checks', BookOpenCheck, 'blue'],
  ['Auditable verdicts', ShieldCheck, 'violet'],
]

const formats = [
  { title: 'Claim dossier', code: 'C—01', tone: 'white' },
  { title: 'Evidence map', code: 'E—04', tone: 'glass' },
  { title: 'Contradiction brief', code: 'R—02', tone: 'white' },
  { title: 'Source lineage', code: 'S—11', tone: 'glass' },
  { title: 'Uncertainty note', code: 'U—03', tone: 'white' },
  { title: 'Correction record', code: 'V—05', tone: 'glass' },
]

const agents = [
  { number: '01', name: 'Detector', action: 'Breaks an answer into independently checkable claims.', icon: ScanSearch },
  { number: '02', name: 'Retriever', action: 'Finds primary and high-quality sources for each claim.', icon: FileSearch },
  { number: '03', name: 'Characterizer', action: 'Maps support, contradiction, context, and uncertainty.', icon: Network },
  { number: '04', name: 'Judge', action: 'Weighs the evidence without hiding disagreement.', icon: Scale },
  { number: '05', name: 'Corrector', action: 'Repairs unsupported claims and sends them back through verification.', icon: RefreshCw },
]

const faqs = [
  {
    q: 'What does HalluciGuard verify?',
    a: 'It evaluates individual factual claims inside an AI answer. Each claim is separated, matched to evidence, characterized, and judged independently.',
  },
  {
    q: 'Does a citation automatically mean a claim is supported?',
    a: 'No. A citation is only a link. HalluciGuard checks whether the cited passage actually supports, contradicts, or merely discusses the claim.',
  },
  {
    q: 'What happens when sources disagree?',
    a: 'Disagreement is preserved as evidence, not averaged away. The Judge receives the source quality, exact relationship, and unresolved uncertainty.',
  },
  {
    q: 'Why are there five agents?',
    a: 'Separating detection, retrieval, characterization, judgment, and correction keeps each decision visible and makes the final verdict easier to audit.',
  },
  {
    q: 'Are the examples on this page live fact-checks?',
    a: 'No. The investigation shown here is a curated product demonstration. Live verification requires the HalluciGuard retrieval and model services to be connected.',
  },
  {
    q: 'Does correction end the process?',
    a: 'No. A corrected answer returns to claim extraction and verification. The loop ends only when the revised claims and their evidence can be traced.',
  },
]

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.14, rootMargin: '0px 0px -5% 0px' },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['The investigation', '#pipeline'],
    ['The agents', '#agents'],
    ['The evidence', '#evidence'],
  ]
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="HalluciGuard home">
          <span>HalluciGuard</span><i className="brand-dot" aria-hidden="true" />
        </a>
        <div className="desktop-links">
          {links.map(([label, href], index) => (
            <a className={index === 0 ? 'active' : ''} key={href} href={href}>{label}</a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">Explore the project <ArrowUpRight size={14} /></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)}>Explore the project</a>
        </div>
      )}
    </header>
  )
}

function InvestigationVisual() {
  return (
    <div className="original-visual" aria-label="Example claim investigation">
      <div className="evidence-rings" aria-hidden="true">
        <i className="ring ring-one" /><i className="ring ring-two" /><i className="ring ring-three" />
        <span className="ring-ticks" />
      </div>
      <div className="investigation-visual">
        <div className="visual-toolbar">
          <span><ScanSearch size={16} /> INVESTIGATION 001</span>
          <span className="pause-mark">Ⅱ</span>
        </div>
        <div className="answer-strip">
          <span className="strip-label">AN AI ANSWER, UNDER EXAMINATION</span>
          <p>“Apollo 11 landed in <u>1969</u>.<br /><mark>Buzz Aldrin stepped out first.</mark>”</p>
        </div>
        <div className="investigation-progress"><i /><span>03 / 04</span></div>
        <p className="comparison-note">Comparing independent evidence</p>
        <p className="trace-route">Answer → Claims → Evidence → Verdict</p>
      </div>
      <p className="demo-note">Animated demonstration · not a live fact-check</p>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy" data-reveal>
        <h1>Don’t trust<br />the answer.</h1>
        <p className="hero-script">Trace the evidence.</p>
        <p className="hero-intro">An answer can sound right. Let’s find out if it is.<br />Follow every claim from first question to final verdict.</p>
        <div className="hero-actions">
          <a className="button primary" href="#pipeline">Follow an investigation <ArrowRight size={17} /></a>
          <a className="button secondary" href="#agents">Meet the agents <span className="play-mark" aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-stage" data-reveal>
        <InvestigationVisual />
      </div>
    </section>
  )
}

function StoryBridge() {
  return (
    <section className="story-bridge">
      <div className="section-shell bridge-grid">
        <span className="section-index" data-reveal>01 / THE INVESTIGATION</span>
        <h2 data-reveal>Fluency is easy.<br /><em>Proof takes work.</em></h2>
        <div className="bridge-copy" data-reveal>
          <p>An answer can sound complete while hiding several factual claims. HalluciGuard slows the response down—just enough to make every decision inspectable.</p>
          <div className="mini-route">
            <span>Answer</span><ArrowRight size={16} /><span>Claims</span><ArrowRight size={16} /><span>Evidence</span><ArrowRight size={16} /><strong>Verdict</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function EvidenceFormats() {
  return (
    <section className="formats-section" id="evidence">
      <div className="formats-copy" data-reveal>
        <span className="section-index inverse">02 / THE SOURCE DESK</span>
        <p className="mini-label">ANY EVIDENCE SHAPE</p>
        <h2>Research that<br /><em>moves with the claim.</em></h2>
        <p>Each output is a working record: what was claimed, which passage was found, and what relationship the evidence establishes.</p>
        <a className="button light" href="#pipeline">Follow a claim <ArrowRight size={16} /></a>
      </div>
      <div className="format-window" data-reveal>
        <div className="aurora" aria-hidden="true" />
        <div className="format-track track-one">
          {[...formats, ...formats].map((item, index) => (
            <article className={`format-card ${item.tone}`} key={`a-${index}`} tabIndex={0}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <FileText size={25} />
            </article>
          ))}
        </div>
        <div className="format-track track-two">
          {[...formats.slice().reverse(), ...formats.slice().reverse()].map((item, index) => (
            <article className={`format-card ${item.tone}`} key={`b-${index}`} tabIndex={0}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <GitBranch size={24} />
            </article>
          ))}
        </div>
        <p className="drag-note">Moving evidence records · pause on hover</p>
      </div>
    </section>
  )
}

function CapabilityPill({ item }) {
  const [title, Icon, tone] = item
  return (
    <div className="capability-pill">
      <span className={`cap-icon ${tone}`}><Icon size={21} /></span>
      <span><b>{title}</b><small>Visible at claim level</small></span>
    </div>
  )
}

function Capabilities() {
  const rows = [
    capabilities.slice(0, 5),
    capabilities.slice(4, 9),
    capabilities.slice(8).concat(capabilities.slice(0, 1)),
  ]
  return (
    <section className="capabilities-section">
      <div className="section-shell">
        <span className="section-index" data-reveal>03 / CAPABILITY FIELD</span>
        <div className="section-heading" data-reveal>
          <h2>Everything the agents can do.</h2>
          <p>No feature grid. One moving field of checks, handoffs, and traceable decisions.</p>
        </div>
      </div>
      <div className="capability-field" data-reveal>
        {rows.map((row, rowIndex) => (
          <div className={`cap-row row-${rowIndex + 1}`} key={rowIndex}>
            <div className="cap-track">
              {[...row, ...row, ...row].map((item, index) => <CapabilityPill item={item} key={`${rowIndex}-${index}`} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Pipeline() {
  const steps = [
    ['01', 'Extract', 'Turn the answer into precise, independently checkable claims.'],
    ['02', 'Retrieve', 'Find the passage—not merely a page about the same topic.'],
    ['03', 'Relate', 'Measure support, contradiction, context, and uncertainty.'],
    ['04', 'Judge', 'Issue a claim-level verdict with the reasoning left visible.'],
    ['05', 'Reverify', 'Correct weak claims and run the revised answer through again.'],
  ]
  return (
    <section className="pipeline-section" id="pipeline">
      <div className="section-shell">
        <span className="section-index" data-reveal>04 / VERIFICATION PATH</span>
        <div className="section-heading narrow" data-reveal>
          <h2>The answer doesn’t move forward until the evidence does.</h2>
          <p>Scroll through one continuous investigation—from language to a verdict that can be audited.</p>
        </div>
        <div className="pipeline" data-reveal>
          <svg className="pipeline-path" viewBox="0 0 1240 330" preserveAspectRatio="none" aria-hidden="true">
            <path className="path-ghost" d="M45 70 C170 5 240 10 310 115 S485 230 560 125 S750 8 820 120 S1015 275 1195 130" />
            <path className="path-live" d="M45 70 C170 5 240 10 310 115 S485 230 560 125 S750 8 820 120 S1015 275 1195 130" />
          </svg>
          {steps.map(([number, title, copy], index) => (
            <article className={`pipeline-step step-${index + 1}`} key={number}>
              <span className="step-dot" />
              <div><b>{number}</b><h3>{title}</h3></div>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AgentSystem() {
  const [active, setActive] = useState(0)
  const ActiveIcon = agents[active].icon
  return (
    <section className="agents-section" id="agents">
      <div className="section-shell agents-shell">
        <div className="agents-intro" data-reveal>
          <span className="section-index inverse">05 / ORCHESTRATION LAYER</span>
          <h2>Five specialists.<br /><em>One evidence trail.</em></h2>
          <p>The orchestration layer passes a claim forward with its context intact. Select an agent to inspect its responsibility.</p>
          <div className="agent-tabs" role="tablist" aria-label="HalluciGuard agents">
            {agents.map((agent, index) => (
              <button
                key={agent.name}
                role="tab"
                aria-selected={index === active}
                className={index === active ? 'active' : ''}
                onClick={() => setActive(index)}
              >
                <span>{agent.number}</span>{agent.name}
              </button>
            ))}
          </div>
        </div>
        <div className="agent-map" data-reveal>
          <div className="agent-orbit" aria-hidden="true">
            <i className="orbit one" /><i className="orbit two" /><i className="orbit three" />
            {agents.map((agent, index) => {
              const Icon = agent.icon
              return <span key={agent.name} className={`orbit-node node-${index + 1} ${index === active ? 'active' : ''}`}><Icon size={18} /></span>
            })}
          </div>
          <div className="agent-inspector">
            <span className="agent-number">{agents[active].number} / 05</span>
            <ActiveIcon size={30} />
            <h3>{agents[active].name}</h3>
            <p>{agents[active].action}</p>
            <div className="agent-output">
              <span>HANDOFF</span>
              <b>{active === agents.length - 1 ? 'Return to Detector' : `Pass to ${agents[active + 1].name}`}</b>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RelationshipLab() {
  const [mode, setMode] = useState('Contradiction')
  const relations = {
    Support: { label: 'SUPPORTS THE CLAIM', detail: 'A primary mission record confirms the landing date.', status: 'Supported', color: 'support' },
    Contradiction: { label: 'DISAGREES WITH THE CLAIM', detail: 'NASA identifies Neil Armstrong as the first person to step onto the Moon, followed by Buzz Aldrin.', status: 'Contradicted', color: 'contradict' },
    Uncertainty: { label: 'DOES NOT RESOLVE THE CLAIM', detail: 'The available passage discusses the mission but does not establish who stepped out first.', status: 'Unverified', color: 'uncertain' },
  }
  const current = relations[mode]
  return (
    <section className="relationship-section">
      <div className="section-shell">
        <span className="section-index inverse" data-reveal>06 / EVIDENCE RELATIONSHIPS</span>
        <div className="relationship-head" data-reveal>
          <h2>A citation is a link.<br /><em>The relationship matters.</em></h2>
          <p>Topic relevance is only the beginning. Check what the source actually establishes.</p>
        </div>
        <div className="relation-tabs" data-reveal>
          {Object.keys(relations).map((relation) => (
            <button key={relation} className={mode === relation ? 'active' : ''} onClick={() => setMode(relation)}>{relation}</button>
          ))}
        </div>
        <div className="relation-stage" data-reveal>
          <div className="claim-panel">
            <span>THE CLAIM</span>
            <blockquote>“Buzz Aldrin stepped out first.”</blockquote>
            <small>FROM THE ORIGINAL ANSWER</small>
          </div>
          <div className={`relation-arrow ${current.color}`}><i /><ArrowRight size={21} /><i /></div>
          <div className="finding-panel">
            <span>{current.label}</span>
            <p>{current.detail}</p>
            <a href="https://www.nasa.gov/history/apollo-11-mission-overview/" target="_blank" rel="noreferrer">NASA · Apollo 11 mission overview <ArrowUpRight size={13} /></a>
          </div>
        </div>
        <div className="relation-verdict" data-reveal>
          <strong className={current.color}>{current.status}</strong>
          <span>{mode === 'Contradiction' ? 'Correct the person. The mission itself remains valid.' : mode === 'Support' ? 'Preserve the claim and attach the supporting passage.' : 'Keep the claim visibly unresolved.'}</span>
        </div>
      </div>
    </section>
  )
}

function PhonePersonIllustration() {
  return (
    <svg viewBox="0 0 160 210" width="130" height="170" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="person-svg">
      <path d="M 65 52 C 60 38, 75 32, 88 38 C 96 36, 102 44, 98 54 C 92 50, 78 48, 65 52 Z" fill="#111" />
      <path d="M 70 54 C 66 66, 76 78, 90 75 C 94 71, 95 61, 95 55" fill="#fff" />
      <path d="M 85 62 L 87 64" />
      <rect x="92" y="52" width="9" height="20" rx="4.5" fill="#111" />
      <path d="M 80 88 C 95 86, 100 72, 96 66" />
      <path d="M 62 88 L 94 88 L 92 142 L 64 142 Z" fill="#fff" />
      <path d="M 78 88 L 78 142" />
      <path d="M 70 88 L 78 96 L 86 88" />
      <path d="M 62 88 C 52 102, 54 124, 64 130" />
      <path d="M 64 142 L 64 194 M 92 142 L 92 194" strokeWidth="3" stroke="#111" fill="#111" />
      <path d="M 78 142 L 78 194" strokeWidth="1.5" />
      <path d="M 56 194 L 70 194 M 86 194 L 100 194" strokeWidth="3.5" stroke="#111" />
    </svg>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  const videoSrc = `${import.meta.env.BASE_URL}contact-support.mp4`

  return (
    <section className="faq-section" id="questions">
      <div className="section-shell faq-grid">
        <div className="faq-aside" data-reveal>
          <h2>Help and <span className="highlight-support">support</span></h2>
          <p>Clear answers about what HalluciGuard verifies, how evidence is judged, and why the trail matters.</p>
          <div className="faq-media-card">
            <video src={videoSrc} autoPlay loop muted playsInline className="faq-video" />
          </div>
          <p className="still-questions-text">Still have questions?</p>
          <a className="button dark contact-btn" href="#contact">Contact us <ArrowRight size={15} /></a>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((item, index) => (
            <article className={open === index ? 'open' : ''} key={item.q}>
              <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                <span>{item.q}</span><ChevronDown size={18} />
              </button>
              <div className="faq-answer"><p>{item.a}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }
  return (
    <section className="contact-section" id="contact">
      <div className="section-shell">
        <div className="contact-header" data-reveal>
          <h2>Get in <span className="highlight-touch">touch</span></h2>
          <p>Reach out to our team at any time for support or questions and we'll get back to you within 2 business days.</p>
        </div>
        <div className="contact-grid">
          <aside className="contact-aside-v2" data-reveal>
            <div className="contact-info-card">
              <Phone size={18} />
              <span>412-483-8261</span>
            </div>
            <div className="contact-info-card">
              <Mail size={18} />
              <span>support@zovasaas.com</span>
            </div>
            <div className="contact-info-card">
              <Building2 size={18} />
              <span>210 Market St. Suite 402<br />San Francisco, CA</span>
            </div>
            <div className="contact-illustration-wrap">
              <PhonePersonIllustration />
            </div>
          </aside>
          <form className="contact-form-v2" onSubmit={submit} data-reveal>
            <h3>How can we help you today?</h3>
            <label>Name
              <input name="name" required placeholder="Jane Smith" />
            </label>
            <label>Email
              <input name="email" type="email" required placeholder="jane@framer.com" />
            </label>
            <label>Topic
              <select name="topic" defaultValue="">
                <option value="" disabled>Select...</option>
                <option>Product demonstration</option>
                <option>Research workflow</option>
                <option>Enterprise verification</option>
                <option>Technical integration</option>
              </select>
            </label>
            <label>Message
              <textarea name="message" required placeholder="Enter your message" rows="4" />
            </label>
            <button className="submit-btn" type="submit">{sent ? 'Submitted' : 'Submit'}</button>
            {sent && <p className="form-note-v2" aria-live="polite">Thank you! We will get back to you within 2 business days.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-glow" aria-hidden="true" />
      <div className="section-shell footer-inner">
        <a className="brand footer-brand" href="#top"><BrandMark /><span>HalluciGuard</span></a>
        <h2>Don’t trust the answer.<br /><em>Trace the evidence.</em></h2>
        <div className="footer-line">
          <span>Evidence-grounded claim verification</span>
          <span>Curated product preview</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  useReveal()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StoryBridge />
        <EvidenceFormats />
        <Capabilities />
        <Pipeline />
        <AgentSystem />
        <RelationshipLab />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
