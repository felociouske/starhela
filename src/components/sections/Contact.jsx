export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Contact Us
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
            Have a question before joining? Reach out via WhatsApp or fill
            in the form and we will get back to you within hours.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#6C3FC5] rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "WhatsApp Support",
                  value: "+254 707 569 122",
                  href: "https://wa.me/254707569122",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.505A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.666-.523-5.18-1.431l-.371-.221-3.762.894.952-3.671-.244-.387A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  ),
                  color: "#25D366",
                },
                {
                  label: "Email Address",
                  value: "support@starhela.cc",
                  href: "mailto:support@starhela.com",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  color: "#6C3FC5",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-[#F8F7FF] border border-gray-100 rounded-xl p-4 hover:border-[#6C3FC5]/30 transition-colors duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">{item.label}</p>
                    <p className="text-text-primary font-semibold text-sm">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-[#0F0A1E] rounded-2xl p-6 flex flex-col gap-3">
              <p className="text-white font-semibold text-base">
                Ready to start earning?
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Join thousands of Africans already earning daily on Starhela.
                Register now and activate your account in minutes.
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=254707569122&text=Hi+Sree+Am+interested+in+starhela+"
                className="inline-block text-center text-sm font-semibold text-white bg-[#6C3FC5] px-6 py-3 rounded-full hover:bg-[#4C2E8A] transition-all duration-200 mt-2 w-fit"
              >
                Register Now
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-5">
            <h3 className="text-text-primary font-semibold text-lg">
              Send a Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#6C3FC5] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-text-secondary text-xs font-medium">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+254 700 000 000"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#6C3FC5] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary text-xs font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#6C3FC5] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary text-xs font-medium">
                Country
              </label>
              <select className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-[#6C3FC5] transition-colors bg-white">
                <option value="">Select your country</option>
                <option>Kenya</option>
                <option>Zambia</option>
                <option>Uganda</option>
                <option>Botswana</option>
                <option>Ghana</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-text-secondary text-xs font-medium">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message here..."
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#6C3FC5] transition-colors resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full text-sm font-semibold text-white bg-[#6C3FC5] py-3.5 rounded-full hover:bg-[#4C2E8A] transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}