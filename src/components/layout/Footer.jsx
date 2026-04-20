const footerLinks = {
  Platform: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  Services: [
    { label: "Chatting Hub", href: "#services" },
    { label: "Forex Trading Bots", href: "#services" },
    { label: "Smart Betting", href: "#services" },
    { label: "Academic Writing", href: "#services" },
  ],
  Countries: [
    { label: "Kenya", href: "#summaries" },
    { label: "Zambia", href: "#summaries" },
    { label: "Uganda", href: "#summaries" },
    { label: "Botswana", href: "#summaries" },
    { label: "Ghana", href: "#summaries" },
  ],
  Support: [
    { label: "Contact Us", href: "#contact" },
    { label: "WhatsApp", href: "https://wa.me/254707569122" },
    { label: "Blog", href: "#blog" },
    { label: "Team", href: "#team" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F0A1E] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6C3FC5] flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Starhela
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Africa's leading chat-to-earn platform. Earn daily income from
              your smartphone by chatting with lonely foreigners abroad.
            </p>
            <a
              href="https://wa.me/254707569122"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[#25D366] hover:text-green-400 transition-colors w-fit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.505A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.18-1.431l-.371-.221-3.762.894.952-3.671-.244-.387A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              +254 707 569 122
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <h4 className="text-white text-sm font-semibold">{section}</h4>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#2DD4AA] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            2025 Starhela. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Operating in Kenya, Zambia, Uganda, Botswana and Ghana.
          </p>
        </div>
      </div>
    </footer>
  );
}