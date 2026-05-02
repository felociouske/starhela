import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Summaries", href: "#summaries" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Team", href: "#team" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-[#6C3FC5] text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <span>
            Call / WhatsApp{" "}
            <a
              href="https://wa.me/254707569122"
              className="font-semibold underline hover:text-accent-light transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              +254 707 569 122
            </a>{" "}
            for quick support
          </span>
          <span className="text-accent-light font-medium">
            Chat with foreigners. Earn daily. Get paid on mobile money.
          </span>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 shrink-0">
              <span className="text-[#6C3FC5] font-bold text-xl tracking-tight">
                Starhela
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-secondary text-sm font-medium hover:text-[#6C3FC5] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2DD4AA] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://www.nexcribe.com/ref/NX-SKFV5T"
                className="text-sm font-semibold text-[#6C3FC5] border border-[#6C3FC5] px-5 py-2 rounded-full hover:bg-[#6C3FC5] hover:text-white transition-all duration-200"
              >
                Login
              </a>
              <a
                href="https://www.nexcribe.com/ref/NX-SKFV5T"
                className="text-sm font-semibold text-white bg-[#2DD4AA] px-5 py-2 rounded-full hover:bg-[#1A9E80] transition-all duration-200"
              >
                Register
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
          }`}
        >
          <div className="bg-white px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-text-secondary text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-surface-DEFAULT hover:text-[#6C3FC5] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <a
                href="https://www.nexcribe.com/ref/NX-SKFV5T"
                className="text-center text-sm font-semibold text-[#6C3FC5] border border-[#6C3FC5] px-5 py-2.5 rounded-full hover:bg-[#6C3FC5] hover:text-white transition-all duration-200"
              >
                Login
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=254707569122&text=Hi+Sree+Am+interested+in+nexcribe+"
                className="text-center text-sm font-semibold text-white bg-[#2DD4AA] px-5 py-2.5 rounded-full hover:bg-[#1A9E80] transition-all duration-200"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}