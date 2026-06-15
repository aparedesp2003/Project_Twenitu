import DigitalImage from "../Images/AFTER 1.jpg";
import BuildImage from "../Images/FLYER 2.png";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const services = [
  {
    label: "Twenitú Digital",
    image: DigitalImage,
    imageAlt: "Twenitú Digital",
    imagePosition: "object-[center_20%]",
    accent: "text-twenitu-orange",
    tag: "Digital Division",
    points: [
      "Helping professionals in the construction industry understand their spaces through data and visualization.",
      "Enhancing production workflow by integrating products that help stakeholders make better, faster decisions.",
    ],
  },
  {
    label: "Twenitú Build",
    image: BuildImage,
    imageAlt: "Twenitú Build",
    imagePosition: "object-[center_30%]",
    accent: "text-twenitu-sage",
    tag: "Build Division",
    points: [
      "Thoughtful and efficient design plans that reflect the client's vision and meet building codes.",
      "End-to-end construction management with precision, craft, and accountability at every stage.",
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="py-24 px-8 bg-twenitu-navy"
      id="services"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="reveal mb-16">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
            What We Do
          </span>
          <h2 className="font-brand-mono text-4xl font-bold text-white mt-2 max-[640px]:text-3xl">
            Our Services
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-2 gap-8 max-[768px]:grid-cols-1">
          {services.map((service, i) => (
            <div
              key={service.label}
              className={`reveal ${i === 0 ? "delay-0" : "delay-150"} group rounded-2xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8`}
            >
              {/* Image */}
              <div className="overflow-hidden h-120">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className={`w-full h-full object-cover ${service.imagePosition} transition-transform duration-500 group-hover:scale-105`}
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <span
                  className={`font-brand-mono text-[11px] font-semibold uppercase tracking-widest ${service.accent}`}
                >
                  {service.tag}
                </span>
                <h3
                  className={`font-brand-mono text-xl font-bold text-white mt-2 mb-5`}
                >
                  {service.label}
                </h3>
                <ul className="flex flex-col gap-3">
                  {service.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-twenitu-orange shrink-0" />
                      <p className="font-brand-sans text-sm text-white/65 leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
