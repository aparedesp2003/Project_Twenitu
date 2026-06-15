const Footer = () => {
  return (
    <footer className="bg-twenitu-navy text-white pt-10 px-8 pb-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between flex-wrap gap-6 border-b border-white/10 pb-8 mb-6">
          <div>
            <h3 className="font-brand-mono text-base font-bold text-white mb-2 tracking-wide">
              TWENITÚ
            </h3>
            <p className="font-brand-sans max-w-xs text-sm text-white/50 leading-relaxed">
              Building meaningful technology for the construction industry.
            </p>
          </div>
          <div className="flex gap-8 items-center">
            {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-brand-sans text-sm text-white/50 no-underline transition-colors duration-200 hover:text-twenitu-orange"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <p className="font-brand-sans text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} Twenitú. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;