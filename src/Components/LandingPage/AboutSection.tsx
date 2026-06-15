import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import WorkersWalking from '../Images/Workers-before-construction.png';
import TeamMember1 from '../Images/Gabriel Paredes.png';
import TeamMember2 from '../Images/Andres Paredes.png';
import TeamMember3 from '../Images/Gabria Brenner.png';

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  image: string;
  objectFit: string;
  objectPosition: string;
  imageBg: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Gabriel Paredes",
    role: "CEO",
    bio: [
      "Gabriel's passion for the built environment began early in life, growing up across from one of Latin America's largest cement production and export facilities. Observing the scale and complexity of industrial operations from his neighborhood sparked a deep interest in construction, materials, and the systems that bring structures to life.",
      "He pursued this interest academically by earning a degree in Mechanical Engineering, where he developed a solid foundation in structural analysis, fluid mechanics, and process optimization. This technical background continues to inform his current work — particularly in the integration of digital tools, systems thinking, and the modeling of space through BIM and data-driven environments.",
      "Before founding Twenitú in Chicago, Gabriel led renovation ventures in Venezuela, gaining hands-on experience in project delivery and business development. Today, he integrates his engineering expertise with field experience to guide a company that bridges traditional building methods with modern digital solutions."
    ],
    image: TeamMember1,
    objectFit: "object-cover",
    objectPosition: "object-[center_15%]",
    imageBg: "bg-gray-100",
  },
  {
    name: "Andres Paredes",
    role: "Software Developer",
    bio: [
      "Andrés joined Twenitú as a creative and technical contributor, drawn by the opportunity to help shape the company's digital presence from the ground up. With a strong interest in design, coding, and user experience, he brings a fresh perspective to how clients interact with Twenitú's products and identity online.",
      "Currently studying software development, Andrés combines his academic learning with hands-on experience in front-end design, UI/UX prototyping, and responsive web architecture. His approach is driven by curiosity and a passion for intuitive, accessible interfaces that support both beauty and functionality.",
      "As the lead developer of Twenitú's website, Andrés is helping build a digital platform that integrates client dashboards, 3D visualization, and interactive project data — all with the goal of making Twenitú's ecosystem seamless, professional, and human-centered."
    ],
    image: TeamMember2,
    objectFit: "object-cover",
    objectPosition: "object-[center_15%]",
    imageBg: "bg-gray-100",
  },
  {
    name: "Gabria Brenner",
    role: "Consultant",
    bio: [
      "Gabria Brenner serves as a consultant at Twenitú, bringing her expertise as a Certified Public Accountant (CPA) and Data Analyst to support our Digital Division. Her work focuses on helping us manage, organize, and visualize data across the properties and portfolios we analyze.",
      "With a professional background that includes financial modeling, SQL-based data structuring, and advanced visualization tools such as Power BI, Gabria plays a vital role in structuring our analytical dashboards and transforming raw data into meaningful insights for our clients.",
      "Her contribution to Digital Twenitú bridges the technical with the strategic, ensuring that our deliverables are not only visually dynamic but also financially accurate, operationally relevant, and client-ready."
    ],
    image: TeamMember3,
    objectFit: "object-cover",
    objectPosition: "object-[center_15%]",
    imageBg: "bg-gray-800",
  }
];

const cardDelays = ["delay-0", "delay-[120ms]", "delay-[240ms]"] as const;

const AboutSection = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-twenitu-off-white" id="about">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="reveal mb-14">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
            About Us
          </span>
          <h2 className="font-brand-mono text-4xl font-bold text-twenitu-navy mt-2 max-[640px]:text-3xl">
            Meet Twenitú
          </h2>
        </div>

        {/* Main two-column block */}
        <div className="grid grid-cols-[minmax(260px,480px)_1fr] gap-16 items-center mb-24 max-[900px]:grid-cols-1 max-[900px]:gap-10">

          {/* Image with clip-path reveal */}
          <div className="reveal-clip rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] max-[900px]:order-1">
            <img
              src={WorkersWalking}
              alt="Twenitú team at work"
              className="block w-full h-120 object-cover max-[900px]:h-72"
            />
          </div>

          {/* Text content */}
          <div className="max-[900px]:order-2">
            <p className="reveal font-brand-mono text-xs font-semibold uppercase tracking-widest text-twenitu-sage mb-4">
              Two Divisions. One Vision.
            </p>
            <div className="font-brand-sans text-[#2a3347] leading-relaxed text-[1.02rem] flex flex-col gap-4">
              <p className="reveal delay-100">
                Twenitú is a company focused on reimagining and reengineering spaces. With two integrated divisions —
                Twenitú Digital and Twenitú Build — we offer solutions that blend technical precision, intelligent design,
                and advanced technology to transform spaces into energetic and functional environments.
              </p>
              <p className="reveal delay-200">
                We exist to unlock the hidden potential in every space. Inspired by our heritage and roots, we help people,
                families, and investors see beyond walls, plans, and details — to see what their spaces can truly become.
              </p>
              <p className="reveal delay-300">
                We reimagine. We breathe life and energy into space using precise data, realistic visualizations, and
                flawless, caring execution. We build meaning.
              </p>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="reveal">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
            Our People
          </span>
          <h3 className="font-brand-mono text-2xl font-bold text-twenitu-navy mt-2 mb-10">
            The Team
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1 max-[640px]:grid-cols-1">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`reveal ${cardDelays[index]} group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              onClick={() => setSelectedMember(member)}
            >
              <div className={`overflow-hidden h-72 ${member.imageBg}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full ${member.objectFit} ${member.objectPosition} transition-transform duration-500 group-hover:scale-105`}
                />
              </div>
              <div className="p-5">
                <p className="font-brand-mono text-xs font-semibold uppercase tracking-widest text-twenitu-orange mb-1">
                  {member.role}
                </p>
                <p className="font-brand-sans text-base font-semibold text-twenitu-navy">
                  {member.name}
                </p>
                <p className="font-brand-sans text-xs text-gray-400 mt-2">
                  View bio →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team member drawer */}
      {selectedMember && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-1000 flex justify-end"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white w-100 max-w-[85%] h-full py-8 px-6 shadow-[-4px_0_24px_rgba(0,0,0,0.15)] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer text-lg border-none"
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className={`w-full h-64 ${selectedMember.objectFit} ${selectedMember.objectPosition} rounded-xl mb-5 ${selectedMember.imageBg}`}
            />
            <p className="font-brand-mono text-xs font-semibold uppercase tracking-widest text-twenitu-orange mb-1">
              {selectedMember.role}
            </p>
            <h3 className="font-brand-mono text-xl font-bold text-twenitu-navy mb-4">
              {selectedMember.name}
            </h3>
            {selectedMember.bio.map((paragraph, i) => (
              <p key={i} className="font-brand-sans text-[0.95rem] text-gray-600 leading-[1.65] mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;