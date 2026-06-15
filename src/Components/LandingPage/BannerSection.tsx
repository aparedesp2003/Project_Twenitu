import transitionVideo from "../Images/LOGO MOTION - SAGE GRAY BACKGROUND-Horizontal.mp4";

const BannerSection = () => {
  const handleCTAClick = (): void => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-start overflow-hidden bg-twenitu-sage"
      id="banner"
    >
      {/* Background video */}
      <video
        className="hero-video-mask absolute top-1/2 left-[58%] w-[110%] h-auto -translate-x-1/2 -translate-y-1/2 object-contain z-0 opacity-85 brightness-110 pointer-events-none"
        src={transitionVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-twenitu-navy/95 via-twenitu-navy/35 to-transparent z-1" />

      {/* Grain texture overlay */}
      <div className="grain-texture absolute inset-0 z-2 pointer-events-none opacity-[0.035]" />

      {/* Content */}
      <div className="relative z-3 max-w-2xl px-16 max-[768px]:px-10 max-[640px]:px-7">

        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full border border-twenitu-orange/50 bg-twenitu-orange/10">
          <span className="w-1.5 h-1.5 rounded-full bg-twenitu-orange animate-pulse" />
          <span className="font-brand-mono text-twenitu-orange text-[11px] font-semibold tracking-widest uppercase">
            Design & Construction
          </span>
        </div>

        {/* Headline — each line staggers in */}
        <h1 className="font-brand-mono font-bold leading-[1.05] text-white mb-6 text-[clamp(2.5rem,5vw,4rem)]">
          <span className="hero-line-1 block">Your Space</span>
          <span className="hero-line-2 block text-twenitu-sage">Matters.</span>
          <span className="hero-line-3 block">Let's Build Meaning.</span>
        </h1>

        {/* Tagline */}
        <p className="hero-tagline font-brand-sans text-sm text-white/50 mb-10 font-light tracking-[0.35em] uppercase">
          Scan &nbsp;·&nbsp; Model &nbsp;·&nbsp; Show &nbsp;·&nbsp; Reimagine
        </p>

        {/* CTA */}
        <div className="hero-cta flex items-center gap-6 flex-wrap">
          <button
            type="button"
            onClick={handleCTAClick}
            className="font-brand-sans px-8 py-3.5 bg-twenitu-orange text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
          >
            Get in Touch
          </button>
          <a
            href="#about"
            className="font-brand-sans flex items-center gap-2 text-white/55 text-sm font-medium no-underline transition-colors duration-200 hover:text-white"
          >
            Learn more
            <span className="text-xs">↓</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-3 flex flex-col items-center gap-2">
        <span className="font-brand-mono text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="scroll-bounce w-px h-10 bg-linear-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};

export default BannerSection;