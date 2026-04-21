const services = [
  {
    id: 1,
    title: "Chatting Hub",
    description:
      "Connect with lonely foreigners from UK, USA, Australia, Qatar, Malaysia and Canada. Chat daily and earn directly to your mobile money account.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    tag: "Core Service",
    tagColor: "bg-[#6C3FC5]/10 text-[#6C3FC5] border-[#6C3FC5]/20",
    accent: "#6C3FC5",
  },
  {
    id: 2,
    title: "Academic Writing",
    description:
      "Access professional academic writing services. Essays, research papers, dissertations and more delivered on time with quality guaranteed.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    tag: "Education",
    tagColor: "bg-[#2DD4AA]/10 text-[#1A9E80] border-[#2DD4AA]/20",
    accent: "#2DD4AA",
  },
  {
    id: 3,
    title: "Forex Trading Bots",
    description:
      "Enhance your forex journey with automated trading bots. Enjoy frequent strategy updates and pro tools designed to improve your trading outcomes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    tag: "Trading",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    accent: "#F59E0B",
  },
  {
    id: 4,
    title: "Smart Betting Tips",
    description:
      "Receive daily expert betting picks backed by deep analysis. Place smarter wagers with reliable insights and increase your chances of consistent wins.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-3 3" />
      </svg>
    ),
    tag: "Betting",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "#3B82F6",
  },
  {
    id: 5,
    title: "Social Media Growth",
    description:
      "Grow your Instagram followers and YouTube views with our proven social media growth solutions. Expand your reach and build your online brand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    tag: "Social Media",
    tagColor: "bg-pink-50 text-pink-700 border-pink-200",
    accent: "#EC4899",
  },
  {
    id: 6,
    title: "E-Books & Courses",
    description:
      "Access a library of valuable e-books and online courses covering forex, business, personal development, and digital skills to grow your knowledge.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    tag: "Education",
    tagColor: "bg-[#2DD4AA]/10 text-[#1A9E80] border-[#2DD4AA]/20",
    accent: "#2DD4AA",
  },
  {
    id: 7,
    title: "Free E-Commerce Website",
    description:
      "Get a free professional e-commerce website to sell your products online. Start your online store with zero setup cost and reach customers everywhere.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    tag: "E-Commerce",
    tagColor: "bg-[#6C3FC5]/10 text-[#6C3FC5] border-[#6C3FC5]/20",
    accent: "#6C3FC5",
  },
  {
    id: 8,
    title: "Chess & Draughts Challenges",
    description:
      "Join engaging chess and draughts challenges against players worldwide. Sharpen your strategic thinking while competing for prizes and recognition.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    tag: "Gaming",
    tagColor: "bg-gray-100 text-gray-600 border-gray-200",
    accent: "#6B7280",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Our Services
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            Starhela is more than a chatting platform. We offer a full suite
            of income-generating and skill-building services all accessible
            from your smartphone or laptop.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#6C3FC5] rounded-full mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.accent }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${service.accent}15`,
                  color: service.accent,
                }}
              >
                {service.icon}
              </div>

              {/* Tag */}
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${service.tagColor}`}
              >
                {service.tag}
              </span>

              {/* Title */}
              <h3 className="text-text-primary font-semibold text-base leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Learn More */}
              <div
                className="flex items-center gap-1 text-xs font-semibold mt-auto transition-colors duration-200"
                style={{ color: service.accent }}
              >
                <span>Learn more</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary text-sm mb-4">
            All services accessible with a single activation. No monthly fees.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=254707569122&text=Hi+Sree+Am+interested+in+starhela+"
            className="inline-block text-sm font-semibold text-white bg-[#6C3FC5] px-8 py-3.5 rounded-full hover:bg-[#4C2E8A] transition-all duration-200"
          >
            Get Full Access Now
          </a>
        </div>
      </div>
    </section>
  );
}