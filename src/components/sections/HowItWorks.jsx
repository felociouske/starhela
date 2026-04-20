const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Register with your email address and choose a unique username and password. The process takes less than 2 minutes.",
    color: "#6C3FC5",
    bg: "#6C3FC5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Pay Activation Fee",
    description:
      "Pay the one-time activation fee via mobile money. Kenya KSH 550, Zambia ZK 125, Uganda UGX 15K, Botswana BWP 55, Ghana GHC 50.",
    color: "#2DD4AA",
    bg: "#2DD4AA",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Start Chatting",
    description:
      "Log in to your dashboard and start chatting with lonely foreigners from UK, USA, Australia, Qatar, Malaysia and Canada.",
    color: "#3B82F6",
    bg: "#3B82F6",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Get Paid Daily",
    description:
      "Earn daily and receive your payment directly to your M-Pesa, Airtel Money, MTN or Vodafone Cash line every day.",
    color: "#F59E0B",
    bg: "#F59E0B",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            Getting started on Starhela takes less than 5 minutes. Follow
            these four simple steps and start earning today.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#6C3FC5] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gray-100 z-0" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center text-center gap-4"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: step.bg }}
              >
                {step.icon}
              </div>

              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: step.color }}
              >
                STEP {step.number}
              </span>

              <h3 className="text-text-primary font-semibold text-base">
                {step.title}
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="lg:hidden w-px h-8 bg-gray-200 mt-2" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#register"
            className="inline-block text-sm font-semibold text-white bg-[#2DD4AA] px-8 py-3.5 rounded-full hover:bg-[#1A9E80] transition-all duration-200"
          >
            Start Now
          </a>
        </div>
      </div>
    </section>
  );
}