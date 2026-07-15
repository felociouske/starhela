import { useState } from "react";
import { Link } from "react-router-dom";
import { countries } from "../../data/countries";

const steps = [
  "Create a free account",
  "Choose your country to set your local currency",
  "Deposit using your local payment method",
  "Browse verified profiles and start chatting",
];

const countryFlags = {
  UG: "🇺🇬",
  KE: "🇰🇪",
  TZ: "🇹🇿",
  NG: "🇳🇬",
  GH: "🇬🇭",
  OTHER: "🌍",
};

export default function Summaries() {
  const [activeCountry, setActiveCountry] = useState(countries[0].code);

  const selected = countries.find((c) => c.code === activeCountry);

  return (
    <section id="summaries" className="py-20 bg-[#F8F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#2DD4AA] mb-3">
            Country Breakdown
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Starhela in Your Country
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto leading-relaxed">
            Select your country to see your local currency and how deposits work
            where you are.
          </p>
          <div className="mt-6 w-12 h-1 bg-[#2DD4AA] rounded-full mx-auto" />
        </div>

        {/* Country Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setActiveCountry(country.code)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCountry === country.code
                  ? "bg-[#6C3FC5] text-white border-[#6C3FC5] shadow-md shadow-[#6C3FC5]/20"
                  : "bg-white text-text-secondary border-gray-200 hover:border-[#6C3FC5] hover:text-[#6C3FC5]"
              }`}
            >
              <span className="text-base">{countryFlags[country.code]}</span>
              {country.name}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Currency Card */}
          <div className="lg:col-span-1 flex flex-col gap-4">
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
                  Local Currency
                </span>
              </div>
              <p className="text-3xl font-bold text-[#6C3FC5]">{selected.currency}</p>
              <p className="text-text-secondary text-sm">
                Your wallet and profile rates display in this currency.
              </p>
            </div>

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
                  Deposits
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary">Manual, local methods</p>
              <p className="text-text-secondary text-sm">
                Mobile money instructions specific to {selected.name} are shown after
                you sign up.
              </p>
            </div>
          </div>

          {/* Right — Banner + Steps */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Country Banner */}
            <div className="bg-[#0F0A1E] rounded-2xl p-6 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                  You are viewing
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{countryFlags[selected.code]}</span>
                  <div>
                    <h3 className="text-white text-2xl font-bold">{selected.name}</h3>
                    <p className="text-gray-400 text-sm">Currency: {selected.currency}</p>
                  </div>
                </div>
              </div>
              <Link
                to="/register"
                className="hidden sm:block text-sm font-semibold text-white bg-[#6C3FC5] px-6 py-3 rounded-full hover:bg-[#4C2E8A] transition-all duration-200 shrink-0"
              >
                Create Account
              </Link>
            </div>

            {/* Steps */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h4 className="text-text-primary font-semibold text-base mb-4">
                How It Works
              </h4>
              <div className="flex flex-col gap-3">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2DD4AA]/15 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-[#2DD4AA]">
                      {index + 1}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <Link
              to="/register"
              className="sm:hidden text-center text-sm font-semibold text-white bg-[#6C3FC5] py-3.5 rounded-full hover:bg-[#4C2E8A] transition-all duration-200"
            >
              Join {selected.name} Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}