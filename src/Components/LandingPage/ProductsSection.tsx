import { useScrollReveal } from "../../hooks/useScrollReveal";

const productDelays = ["delay-0", "delay-100", "delay-200"] as const;
const buildDelays  = ["delay-0", "delay-100", "delay-200", "delay-300"] as const;

const buildServices = [
  {
    name: "Build | Design",
    description: "Thoughtful design plans that reflect your vision and comply with building codes — from initial concept to construction-ready drawings.",
  },
  {
    name: "Build | Renovate",
    description: "Full-scope residential and commercial renovation delivered on time, on budget, and with meticulous attention to craft.",
  },
  {
    name: "Build | Manage",
    description: "End-to-end construction management with real-time reporting, subcontractor coordination, and quality control at every stage.",
  },
  {
    name: "Build | Consult",
    description: "Expert feasibility assessments, budget planning, and site evaluation before a single nail is driven.",
  },
];

const digitalProducts = [
  {
    name: "Twin | Scan",
    description:
      "Capture real-world spaces with precision. Using advanced scanning and photogrammetry, Twin | Scan generates accurate digital twins — perfect for site analysis, renovation planning, and seamless collaboration between stakeholders.",
  },
  {
    name: "Twin | Model",
    description:
      "Transform ideas into intelligent 3D models. Twin | Model enables customizable layouts, structural simulations, and sustainable design solutions, making it easier to visualize and optimize projects before construction even begins.",
  },
  {
    name: "Twin | Show",
    description:
      "Bring projects to life with immersive presentations. Twin | Show combines interactive walkthroughs, blueprint integration, and real-time updates — ensuring clients and teams stay aligned at every stage.",
  },
];

const ProductsSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-24 px-8 bg-twenitu-off-white" id="products">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="reveal mb-16">
          <span className="font-brand-mono text-xs font-semibold tracking-widest uppercase text-twenitu-orange">
            Our Products
          </span>
          <h2 className="font-brand-mono text-4xl font-bold text-twenitu-navy mt-2 max-[640px]:text-3xl">
            Built to Transform
          </h2>
          <p className="font-brand-sans text-gray-500 text-base mt-3 max-w-xl leading-relaxed">
            Twenitú designs and delivers high-quality, innovative tools that elevate every phase of a construction or design project.
          </p>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-14 items-start max-[980px]:grid-cols-1">

          {/* Digital products */}
          <div>
            <h3 className="reveal font-brand-mono text-sm font-bold uppercase tracking-widest text-twenitu-navy mb-8">
              Twenitú Digital Products
            </h3>
            <div className="flex flex-col gap-5">
              {digitalProducts.map((product, i) => (
                <div
                  key={product.name}
                  className={`reveal ${productDelays[i]} rounded-xl p-5 border border-gray-200 bg-white hover:border-twenitu-orange/40 hover:shadow-sm transition-all duration-300`}
                >
                  <p className="font-brand-mono text-xs font-bold uppercase tracking-widest text-twenitu-orange mb-2">
                    {product.name}
                  </p>
                  <p className="font-brand-sans text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Build services */}
          <div>
            <h3 className="reveal font-brand-mono text-sm font-bold uppercase tracking-widest text-twenitu-navy mb-8">
              Twenitú Build Services
            </h3>
            <div className="flex flex-col gap-4">
              {buildServices.map((service, i) => (
                <div
                  key={service.name}
                  className={`reveal ${buildDelays[i]} relative rounded-xl p-5 border border-twenitu-sage/25 bg-twenitu-sage/8 opacity-75`}
                >
                  {/* Coming soon badge */}
                  <span className="absolute top-4 right-4 font-brand-mono text-[9px] font-bold uppercase tracking-widest text-twenitu-sage/70 border border-twenitu-sage/30 rounded-full px-2 py-0.5">
                    Soon
                  </span>

                  <p className="font-brand-mono text-xs font-bold uppercase tracking-widest text-twenitu-sage mb-2 pr-12">
                    {service.name}
                  </p>
                  <p className="font-brand-sans text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}

              {/* CTA */}
              <div className="reveal delay-300 mt-1 flex items-center gap-2">
                <span className="font-brand-sans text-xs text-gray-400">
                  Full catalogue launching soon.
                </span>
                <a
                  href="#contact"
                  className="font-brand-sans text-xs font-semibold text-twenitu-orange underline underline-offset-4 hover:opacity-75 transition-opacity"
                >
                  Get in touch →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;