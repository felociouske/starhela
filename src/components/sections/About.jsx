const stats = [
  { value: "5", label: "African Countries" },
  { value: "7+", label: "Foreign Partner Nations" },
  { value: "1,200+", label: "Active Earners" },
  { value: "6+", label: "Income Streams" },
];

const values = [
  {
    title: "Daily Payments",
    description: "We pay every single day directly to your mobile money line with zero delays.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Zero Monthly Fees",
    description: "Pay the activation fee once and enjoy lifetime access. No recurring charges.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Multiple Services",
    description: "Access chatting, forex bots, betting tips, academic writing and more from one platform.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Mobile First",
    description: "Everything works on a basic smartphone. No laptop or special equipment needed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA]">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
              Africa's Leading{" "}
              <span className="text-[#6C3FC5]">Chat-to-Earn</span> Platform
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Starhela connects everyday Africans with lonely people in
              international countries. Through simple conversations, our
              members earn real daily income paid directly to their mobile
              money accounts.
            </p>
            <p className="text-text-secondary text-base leading-relaxed">
              Beyond chatting, we offer forex trading bots, smart betting
              insights, academic writing services, social media growth tools,
              and valuable e-books — all under one roof with a single
              one-time activation.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              {values.map((val) => (
                <div key={val.title} className="flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#6C3FC5]/10 flex items-center justify-center text-[#6C3FC5]">
                    {val.icon}
                  </div>
                  <h4 className="text-text-primary font-semibold text-sm">
                    {val.title}
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-1 text-center"
                >
                  <span className="text-4xl font-bold text-[#6C3FC5]">
                    {stat.value}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#0F0A1E] rounded-2xl p-6 flex flex-col gap-4">
              <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                Our Mission
              </p>
              <p className="text-white text-base leading-relaxed">
                To create accessible daily income opportunities for every
                African through technology, conversation, and digital skills
                — all from the palm of your hand.
              </p>
              <div className="w-10 h-0.5 bg-[#2DD4AA] rounded-full" />
              <p className="text-gray-400 text-sm">
                Operating across Kenya, Zambia, Uganda, Botswana and Ghana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}