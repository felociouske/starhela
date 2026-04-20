const team = [
  {
    name: "Brian Otieno",
    role: "Founder & CEO",
    description: "Visionary behind Starhela. Passionate about creating digital income for everyday Africans.",
    initials: "BO",
    color: "#6C3FC5",
  },
  {
    name: "Amina Wanjiru",
    role: "Head of Operations",
    description: "Oversees daily platform operations and ensures members receive their payments on time.",
    initials: "AW",
    color: "#2DD4AA",
  },
  {
    name: "Chanda Mwale",
    role: "Country Lead — Zambia",
    description: "Manages Zambia operations and supports Zambian members through onboarding and growth.",
    initials: "CM",
    color: "#3B82F6",
  },
  {
    name: "Kofi Asante",
    role: "Country Lead — Ghana",
    description: "Leads the Ghana chapter and ensures seamless MTN and Vodafone payment processing.",
    initials: "KA",
    color: "#F59E0B",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            The People Behind Starhela
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Meet the Team
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto leading-relaxed">
            A dedicated team working across Africa to make daily income a
            reality for every member on the platform.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#6C3FC5] rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: member.color }}
              >
                {member.initials}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-text-primary font-semibold text-base">
                  {member.name}
                </h3>
                <span
                  className="text-xs font-semibold"
                  style={{ color: member.color }}
                >
                  {member.role}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}