import { useState } from "react";
import { countries, foreigners } from "../../data/countries";

const requirements = [
  "One-time activation fee (paid once)",
  "Smartphone or Laptop",
  "Valid email address",
  "Mobile money number (network varies by country)",
  "Unique username and password",
];

const countryFlags = {
  kenya: "🇰🇪",
  zambia: "🇿🇲",
  uganda: "🇺🇬",
  botswana: "🇧🇼",
  ghana: "🇬🇭",
};

export default function Summaries() {
  const [activeCountry, setActiveCountry] = useState(countries[0].id);

  const selected = countries.find((c) => c.id === activeCountry);

  return (
    <section id="summaries" className="py-20 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            Country Breakdown
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Earnings Summary by Country
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            Select your country to see the activation fee, daily earnings,
            payment method, and everything you need to get started.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#2DD4AA] rounded-full mx-auto" />
        </div>

        {/* Country Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => setActiveCountry(country.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCountry === country.id
                  ? "bg-[#6C3FC5] text-white border-[#6C3FC5] shadow-md shadow-[#6C3FC5]/20"
                  : "bg-white text-text-secondary border-gray-200 hover:border-[#6C3FC5] hover:text-[#6C3FC5]"
              }`}
            >
              <span className="text-base">{countryFlags[country.id]}</span>
              {country.name}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Earnings & Fee Cards */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Activation Fee */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#6C3FC5]/10 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6C3FC5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  Activation Fee
                </span>
              </div>
              <p className="text-3xl font-bold text-[#6C3FC5]">
                {selected.activationFee}
              </p>
              <p className="text-text-secondary text-sm">
                Paid once. No monthly charges.
              </p>
            </div>

            {/* Daily Earnings */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#2DD4AA]/10 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2DD4AA"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  Daily Earnings
                </span>
              </div>
              <p className="text-3xl font-bold text-[#2DD4AA]">
                {selected.dailyEarnings}
              </p>
              <p className="text-text-secondary text-sm">
                Paid directly to your mobile line.
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  Payment Method
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary">
                {selected.paymentMethod}
              </p>
              <p className="text-text-secondary text-sm">
                Network: {selected.network}
              </p>
            </div>
          </div>

          {/* Right — Requirements + Foreigners */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Country Banner */}
            <div className="bg-[#0F0A1E] rounded-2xl p-6 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                  You are viewing
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryFlags[selected.id]}</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold">
                      {selected.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Currency: {selected.currency}
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=254707569122&text=Hi+Sree+Am+interested+in+starhela+"
                className="hidden sm:block text-sm font-semibold text-white bg-[#6C3FC5] px-6 py-3 rounded-full hover:bg-[#4C2E8A] transition-all duration-200 shrink-0"
              >
                Join Now
              </a>
            </div>

            {/* Requirements */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h4 className="text-text-primary font-semibold text-base mb-4">
                Requirements to Join
              </h4>
              <div className="flex flex-col gap-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2DD4AA]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2DD4AA"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat With Foreigners From */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h4 className="text-text-primary font-semibold text-base mb-4">
                Chat with Lonely Foreigners From
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {foreigners.map((f) => (
                  <div
                    key={f.country}
                    className="flex items-center gap-2 bg-[#F8F7FF] border border-gray-100 rounded-xl px-3 py-2.5"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${f.code.toLowerCase()}.png`}
                      alt={f.country}
                      className="w-6 h-4 object-cover rounded-sm"
                    />
                    <span className="text-text-secondary text-xs font-medium">
                      {f.country}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Join Button */}
            <a
              href="https://api.whatsapp.com/send?phone=254707569122&text=Hi+Sree+Am+interested+in+starhela+"
              className="sm:hidden text-center text-sm font-semibold text-white bg-[#6C3FC5] py-3.5 rounded-full hover:bg-[#4C2E8A] transition-all duration-200"
            >
              Join {selected.name} Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}