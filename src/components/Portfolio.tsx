import Image from 'next/image';
import RevealCard from './RevealCard';

const PROJECTS = [
  {
    title: 'Web Development',
    body: 'React storefront wired to a Node.js core, delivering multi-region inventory sync and full-stack performance budgets.',
    image: '/assets/projects/web_development.webp',
    alt: 'Web development: React storefront backed by a Node.js core',
    width: 1200,
    height: 800,
  },
  {
    title: 'App Development',
    body: 'React Native command center focused on buttery-smooth interactions, quick load times, and reliable offline moments.',
    image: '/assets/projects/app_development.webp',
    alt: 'App development: React Native command center interface',
    width: 1200,
    height: 799,
  },
  {
    title: 'Project Management',
    body: 'Agile + Scrum coaching toolkit that keeps sprint rituals, burndowns, and stakeholder updates concise across distributed teams.',
    image: '/assets/projects/project_management.webp',
    alt: 'Project management: agile sprint board and burndown reporting',
    width: 1200,
    height: 821,
  },
  {
    title: 'Digital Marketing',
    body: 'Friendly landing pages, on-brand campaigns, and clear reporting loops for every launch.',
    image: '/assets/projects/digital_marketing.webp',
    alt: 'Digital marketing: landing page campaign and reporting visuals',
    width: 1200,
    height: 821,
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="section-intro">
        <h2 className="eyebrow">Portfolio</h2>
        <p className="lede">
          Delivering standout fintech, marketplace, and creative products, each designed
          to showcase tangible performance gains.
        </p>
      </div>

      <div className="portfolio-list">
        {PROJECTS.map((project, index) => (
          <RevealCard className="portfolio-card" index={index} key={project.title}>
            <div className="card-media">
              <Image
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="card-content">
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </div>
          </RevealCard>
        ))}
      </div>
    </section>
  );
}
