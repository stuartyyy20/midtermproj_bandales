import { useState } from 'react'
import GridMotion from './GridMotion'
import './App.css'

const gridItems = [
  'https://images.unsplash.com/photo-1705032033999-efa3082e1a4e?w=640&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1721407964262-f9864b562453?w=640&q=75&auto=format&fit=crop',
  'SYSTEMS / 01',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=75&auto=format&fit=crop',
  'NETWORK / 02',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&q=75&auto=format&fit=crop',
  <div className="grid-jsx-tile" key="cloud">CLOUD<br />INFRASTRUCTURE</div>,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&q=75&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&q=75&auto=format&fit=crop',
  'AUTOMATE / 03',
]

const careerStages = [
  {
    number: '01',
    level: 'START HERE',
    title: 'IT Support Technician',
    summary: 'Build a strong foundation by helping people solve everyday technology problems.',
    responsibilities: ['Troubleshoot hardware, software, and account issues', 'Set up workstations and onboard new users', 'Document solutions and escalate complex incidents'],
    skills: ['Customer support', 'Windows & macOS basics', 'Ticketing systems'],
    icon: 'headset',
  },
  {
    number: '02',
    level: 'GROW YOUR SCOPE',
    title: 'System Administrator',
    summary: 'Keep the systems, networks, and services an organization depends on reliable and secure.',
    responsibilities: ['Manage servers, users, access, and backups', 'Monitor system health and resolve incidents', 'Apply patches and maintain security controls'],
    skills: ['Linux / Windows Server', 'Networking fundamentals', 'PowerShell or Bash'],
    icon: 'server',
  },
  {
    number: '03',
    level: 'LEAD & SPECIALIZE',
    title: 'Systems Engineer',
    summary: 'Design and improve resilient infrastructure that can scale with the organization.',
    responsibilities: ['Plan infrastructure architecture and migrations', 'Automate deployments and operational workflows', 'Set standards for reliability, security, and performance'],
    skills: ['Cloud platforms', 'Infrastructure as code', 'Architecture & mentoring'],
    icon: 'cloud',
  },
]

const capabilities = [
  { icon: 'terminal', title: 'Operating systems', description: 'Understand Windows and Linux administration, permissions, processes, and services to keep endpoints and servers running.' },
  { icon: 'network', title: 'Networking', description: 'Know how IP addressing, DNS, DHCP, routing, and firewalls connect users to the services they need.' },
  { icon: 'wrench', title: 'Troubleshooting', description: 'Use a calm, methodical approach to isolate root causes, restore service, and prevent repeat incidents.' },
  { icon: 'shield', title: 'Security fundamentals', description: 'Apply least privilege, patching, MFA, backups, and monitoring to protect systems and data.' },
  { icon: 'code', title: 'Scripting & automation', description: 'Use PowerShell, Bash, or Python to reduce repetitive work and make operations consistent.' },
  { icon: 'message', title: 'Communication', description: 'Explain technical issues clearly, write useful documentation, and work effectively across teams.' },
]

const tools = [
  { name: 'Windows Server', category: 'OPERATING SYSTEM', description: 'Practice directory services, Group Policy, user management, and server administration.' },
  { name: 'Linux', category: 'OPERATING SYSTEM', description: 'Build confidence with the command line, services, permissions, packages, and logs.' },
  { name: 'PowerShell', category: 'AUTOMATION', description: 'Automate Windows administration tasks and create repeatable workflows.' },
  { name: 'Microsoft Azure', category: 'CLOUD PLATFORM', description: 'Explore virtual machines, identity, networking, and cloud infrastructure.' },
  { name: 'Git', category: 'VERSION CONTROL', description: 'Track scripts and configuration changes with a clear, reviewable history.' },
  { name: 'VirtualBox', category: 'HOME LAB', description: 'Run virtual machines locally to safely practice server and network setups.' },
]

const roles = [
  { title: 'IT Support Technician', focus: 'People & endpoints', description: 'Resolves individual user issues, supports devices, and makes sure people can get back to work.', scope: 'User-facing · Reactive' },
  { title: 'System Administrator', focus: 'Services & servers', description: 'Maintains shared systems, user access, backups, and the day-to-day health of IT infrastructure.', scope: 'Organization-wide · Operational' },
  { title: 'Systems Engineer', focus: 'Architecture & scale', description: 'Designs, automates, and evolves infrastructure to meet future performance and reliability needs.', scope: 'Strategic · Project-led' },
]

function Icon({ name, size = 22 }) {
  const shared = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    headset: <><path d="M3 13v-1a9 9 0 0 1 18 0v1" /><path d="M5 13h2a2 2 0 0 1 2 2v3H7a4 4 0 0 1-4-4v-1h2Zm14 0h2v1a4 4 0 0 1-4 4h-2v-3a2 2 0 0 1 2-2h2Z" /><path d="M12 21h2" /></>,
    server: <><rect x="3" y="3" width="18" height="8" rx="2" /><rect x="3" y="13" width="18" height="8" rx="2" /><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" /></>,
    cloud: <><path d="M20 16.2A4.5 4.5 0 0 0 18 7.5a6 6 0 0 0-11.7 1.7A4 4 0 0 0 7 17h12a3.5 3.5 0 0 0 1-6.8" /><path d="m9 13 3 3 3-3M12 16V9" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
    network: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v5m-5 5 4-5m6 5-4-5M5 14v3m14-3v3" /></>,
    wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4l-5.1 5.1a2 2 0 0 0 2.8 2.8l5.1-5.1a5 5 0 0 0 6.4-6.4L14 12l-2-2 2.7-3.7Z" /><path d="m17 4 3 3" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" /></>,
    message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /><path d="M8 12h8m-8-3h5" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  }
  return <svg {...shared}>{paths[name]}</svg>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Careerways home">
          <span className="brand-mark"><Icon name="server" size={19} /></span>
          <span>CAREER<span className="brand-light">WAYS</span><small>IT CAREER FIELD GUIDE</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#pathway" onClick={closeMenu}>The pathway</a>
          <a href="#skills" onClick={closeMenu}>Skills & tools</a>
          <a href="#roles" onClick={closeMenu}>Compare roles</a>
          <a className="nav-cta" href="#about" onClick={closeMenu}>About the developer <Icon name="arrow" size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <GridMotion
            items={gridItems}
            rows={4}
            aspectRatio={1.33}
            gap={16}
            radius={14}
            angle={-12}
            tilt={0}
            speed={24}
            direction="alternate"
            parallax={0.5}
            spotlight={0.6}
            dim={0.35}
            fade={0.5}
            grayscale={false}
          />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> YOUR GUIDE TO IT INFRASTRUCTURE</div>
              <h1>Build the systems<br />that <span>keep us moving.</span></h1>
              <p className="hero-description">A practical guide to a career in system administration—from your first support ticket to designing the infrastructure an entire organization relies on.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#pathway">Explore the career path <span>↓</span></a>
                <a className="text-link" href="#skills">See skills & tools <Icon name="arrow" size={16} /></a>
              </div>
              <div className="hero-proof"><span className="proof-line" /><span>LEARN · BUILD · LEVEL UP</span></div>
            </div>
          </div>
          <div className="hero-index"><span>01</span><span className="index-rule" /><span>CAREER FIELD GUIDE</span></div>
        </section>

        <section className="pathway section-wrap section-block" id="pathway">
          <div className="section-heading">
            <div><span className="section-kicker">A ROADMAP, NOT A RACE</span><h2>Your path into<br />system administration.</h2></div>
            <p>Every career looks a little different. This common progression shows how foundational support experience can grow into infrastructure ownership and engineering.</p>
          </div>
          <div className="pathway-grid">
            {careerStages.map((stage) => (
              <article className="stage-card" key={stage.number}>
                <div className="stage-top"><span className="stage-number">{stage.number}</span><span className="stage-level">{stage.level}</span><span className="stage-icon"><Icon name={stage.icon} size={21} /></span></div>
                <h3>{stage.title}</h3>
                <p className="stage-summary">{stage.summary}</p>
                <div className="stage-detail"><h4>WHAT YOU'LL DO</h4><ul>{stage.responsibilities.map((item) => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul></div>
                <div className="stage-skills"><h4>BUILD THESE SKILLS</h4><div className="tag-list">{stage.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
              </article>
            ))}
          </div>
          <div className="pathway-footnote"><span className="footnote-icon">i</span><p><b>There isn't only one route.</b> Apprenticeships, certifications, home labs, and hands-on projects can all help you build experience at every stage.</p><a href="#about" aria-label="Read about the developer"><Icon name="arrow" size={17} /></a></div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap section-block">
            <div className="section-heading">
              <div><span className="section-kicker">YOUR PROFESSIONAL TOOLKIT</span><h2>Skills that make<br />systems stronger.</h2></div>
              <p>Good administrators pair technical know-how with sound judgment. Start with the fundamentals, then keep learning as technology evolves.</p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item, index) => (
                <article className="capability-card" key={item.title}>
                  <span className="capability-icon"><Icon name={item.icon} size={21} /></span>
                  <span className="capability-number">0{index + 1}</span>
                  <h3>{item.title}</h3><p>{item.description}</p>
                </article>
              ))}
            </div>
            <div className="tools-heading"><div><span className="section-kicker">GET HANDS-ON</span><h3>Tools worth getting to know.</h3></div><p>Build a small home lab and explore one tool at a time.</p></div>
            <div className="tools-grid">
              {tools.map((tool) => <article className="tool-card" key={tool.name}><span className="tool-category">{tool.category}</span><h4>{tool.name}</h4><p>{tool.description}</p><span className="tool-arrow"><Icon name="arrow" size={16} /></span></article>)}
            </div>
          </div>
        </section>

        <section className="roles-section section-wrap section-block" id="roles">
          <div className="section-heading">
            <div><span className="section-kicker">SAME ECOSYSTEM, DIFFERENT FOCUS</span><h2>Three roles.<br />Three kinds of impact.</h2></div>
            <p>Job titles vary between organizations. Look at the scope of the work to understand where a role sits and what you can learn next.</p>
          </div>
          <div className="role-table" role="table" aria-label="Comparison of system administration career roles">
            <div className="role-table-head" role="row"><span role="columnheader">ROLE</span><span role="columnheader">PRIMARY FOCUS</span><span role="columnheader">RESPONSIBILITIES</span><span role="columnheader">WORK STYLE</span></div>
            {roles.map((role, index) => <div className="role-row" role="row" key={role.title}><span className="role-name" role="cell"><span className="role-index">0{index + 1}</span>{role.title}</span><span className="role-focus" role="cell">{role.focus}</span><span className="role-description" role="cell">{role.description}</span><span className="role-scope" role="cell">{role.scope}</span></div>)}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-wrap about-inner">
            <div className="about-art">
              <div className="about-art-grid" />
              <div className="about-monogram">IT<span>.</span></div>
              <span className="about-art-label">CURIOUS BY NATURE<br />BUILT TO KEEP LEARNING</span>
              <span className="about-art-index">FIELD NOTE / 001</span>
            </div>
            <div className="about-copy">
              <span className="section-kicker">A LITTLE ABOUT THE MAKER</span>
              <h2>Hello! <br />Iam <span>Gian Kenneth Bandales</span></h2>
              <p className="about-intro">I'm a student building my foundation in information technology and exploring the systems that help people do their best work.</p>
              <div className="profile-details">
                <div><span>NAME</span><b>Gian Kenneth Bandales</b></div>
                <div><span>PROGRAM</span><b>Information Technology</b></div>
                <div><span>CAREER INTEREST</span><b>System Administration & Cloud Infrastructure</b></div>
                <div><span>MY GOAL</span><b>Grow into a thoughtful, security-minded infrastructure professional.</b></div>
              </div>
              <p className="profile-note">This portfolio is part of my journey—connecting what I'm learning today to the systems I hope to support tomorrow.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home"><span className="brand-mark"><Icon name="server" size={18} /></span><span>CAREER<span className="brand-light">WAYS</span><small>IT CAREER FIELD GUIDE</small></span></a>
        <p>Built with curiosity. Designed for what comes next.</p>
        <a className="back-top" href="#home">BACK TO TOP ↑</a>
        <span className="copyright">© 2026 · CAREER PATHWAYS</span>
      </footer>
    </>
  )
}

export default App
