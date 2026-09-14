import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
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
    ['How it works', '#pipeline'],
    ['Agents', '#agents'],
    ['Evidence', '#evidence'],
    ['Questions', '#questions'],
  ]
  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="HalluciGuard home">
          <BrandMark />
          <span>HalluciGuard</span>
        </a>
        <div className="desktop-links">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="nav-cta" href="#contact">Begin investigation <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)}>Begin investigation</a>
        </div>
      )}
    </header>
  )
}

function InvestigationVisual() {
  return (
    <div className="investigation-visual" aria-label="Example claim investigation">
      <div className="visual-toolbar">
        <span><i /> LIVE INVESTIGATION</span>
        <span>CASE 01 / 03</span>
      </div>
      <div className="answer-strip">
        <span className="strip-label">ANSWER</span>
        <p>Apollo 11 landed on the Moon in 1969. <mark>Buzz Aldrin was the first person to step onto the lunar surface.</mark></p>
      </div>
      <div className="claim-row active">
        <span>C—01</span>
        <p>The landing was in 1969.</p>
        <span className="state supported">SUPPORTED</span>
      </div>
      <div className="claim-row">
        <span>C—02</span>
        <p>Buzz Aldrin stepped out first.</p>
        <span className="state checking">TRACING</span>
      </div>
      <div className="evidence-thread">
        <div className="thread-line"><i /></div>
        <div className="source-chip">
          <FileText size={15} />
          <span><b>NASA mission record</b><small>Primary source · Apollo 11</small></span>
        </div>
        <div className="relationship-chip"><AlertTriangle size={14} /> CONTRADICTS C—02</div>
      </div>
      <p className="demo-note">Curated demonstration — not a live fact-check.</p>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-rays" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-copy" data-reveal>
        <div className="eyebrow"><span /> EVIDENCE-GROUNDED VERIFICATION</div>
        <h1>Don’t trust<br />the answer.</h1>
        <p className="hero-script">Trace the evidence.</p>
        <p className="hero-intro">Turn fluent AI responses into inspectable claims, evidence relationships, and defensible verdicts.</p>
        <div className="hero-actions">
          <a className="button primary" href="#pipeline">Begin the investigation <ArrowRight size={17} /></a>
          <a className="text-link" href="#agents">Meet the five agents <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="hero-stage" data-reveal>
        <InvestigationVisual />
      </div>
      <div className="hero-foot">
        <span>ANSWER</span><i /><span>CLAIMS</span><i /><span>EVIDENCE</span><i /><span>VERDICT</span>
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
            <article className={`format-card ${item.tone}`} key={`a-${index}`}>
              <span>{item.code}</span>
              <h3>{item.title}</h3>
              <FileText size={25} />
            </article>
          ))}
        </div>
        <div className="format-track track-two">
          {[...formats.slice().reverse(), ...formats.slice().reverse()].map((item, index) => (
            <article className={`format-card ${item.tone}`} key={`b-${index}`}>
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

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-section" id="questions">
      <div className="section-shell faq-grid">
        <div className="faq-aside" data-reveal>
          <span className="section-index">07 / HELP & SUPPORT</span>
          <h2>Questions should<br /><em>open the evidence.</em></h2>
          <p>Clear answers about what the system does, what it does not do, and why the trail matters.</p>
          <div className="question-orbit" aria-hidden="true">
            <CircleHelp size={42} />
            <span>?</span><span>?</span><span>?</span>
          </div>
          <a className="button dark" href="#contact">Ask another question <ArrowRight size={16} /></a>
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
        <div className="contact-title" data-reveal>
          <span className="section-index">08 / BEGIN</span>
          <h2>Bring us the answer.<br /><em>We’ll trace the questions.</em></h2>
          <p>Tell us where unreliable AI output creates risk in your workflow.</p>
        </div>
        <div className="contact-grid">
          <aside className="contact-aside" data-reveal>
            <div className="contact-channel"><Mail size={18} /><span><small>PROJECT ENQUIRIES</small><b>Choose a team inbox before launch</b></span></div>
            <div className="contact-channel"><ShieldCheck size={18} /><span><small>INVESTIGATION PRINCIPLE</small><b>Every verdict keeps its evidence trail</b></span></div>
            <div className="contact-signal">
              <Sparkles size={25} />
              <p>A good investigation begins by making uncertainty visible.</p>
            </div>
          </aside>
          <form className="contact-form" onSubmit={submit} data-reveal>
            <h3>How can HalluciGuard help?</h3>
            <div className="form-row">
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Email<input name="email" type="email" required placeholder="you@company.com" /></label>
            </div>
            <label>Investigation type
              <select name="topic" defaultValue="">
                <option value="" disabled>Select a topic</option>
                <option>Product demonstration</option>
                <option>Research workflow</option>
                <option>Enterprise verification</option>
                <option>Technical integration</option>
              </select>
            </label>
            <label>Message<textarea name="message" required placeholder="Where do you need stronger evidence?" rows="5" /></label>
            <button className="button dark" type="submit">{sent ? 'Enquiry prepared' : 'Prepare enquiry'} <Send size={15} /></button>
            <p className="form-note" aria-live="polite">{sent ? 'This preview does not transmit data. Connect a team inbox or form service before launch.' : 'Preview form — no information is transmitted yet.'}</p>
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
