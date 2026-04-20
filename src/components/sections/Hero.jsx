import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 80;
    const MAX_DISTANCE = 140;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 170, 0.7)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            const opacity = 1 - dist / MAX_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108, 63, 197, ${opacity * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0F0A1E]"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Subtle radial glow behind content */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — Text */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#6C3FC5]/20 border border-[#6C3FC5]/40 text-[#c4a8ff] text-xs font-semibold px-4 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-[#2DD4AA] animate-pulse" />
            Now Live in 5 African Countries
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Chat with{" "}
            <span className="text-[#2DD4AA]">Lonely Foreigners</span>
            <br />
            and Earn{" "}
            <span className="text-[#8B5CF6]">Daily Income</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Join Starhela and get paid every day directly to your mobile
            money account — M-Pesa, Airtel, MTN, or Vodafone. All you need
            is a smartphone and 30 minutes a day.
          </p>

          {/* Earnings Pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { country: "Kenya", amount: "KSH 1K–2K/day" },
              { country: "Zambia", amount: "ZK 150/day" },
              { country: "Uganda", amount: "UGX 50K–70K/day" },
              { country: "Botswana", amount: "BWP 250/day" },
              { country: "Ghana", amount: "GHC 150/day" },
            ].map((item) => (
              <div
                key={item.country}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4AA]" />
                <span className="font-medium text-white">{item.country}</span>
                <span>{item.amount}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#register"
              className="text-sm font-semibold text-white bg-[#2DD4AA] px-8 py-3.5 rounded-full hover:bg-[#1A9E80] transition-all duration-200 shadow-lg shadow-[#2DD4AA]/20"
            >
              Register Now
            </a>
            <a
              href="#login"
              className="text-sm font-semibold text-white border border-white/30 px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Login
            </a>
          </div>

          {/* Trust Line */}
          <p className="text-gray-500 text-xs">
            One-time activation fee only. No monthly charges. Paid directly
            to your mobile money line.
          </p>
        </div>

        {/* Right — Stats Card */}
        <div className="hidden lg:flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-6">

            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">
              Platform Overview
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Active Countries", value: "5" },
                { label: "Foreign Partners", value: "7+" },
                { label: "Daily Earners", value: "1,200+" },
                { label: "Services Offered", value: "6+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl p-4 flex flex-col gap-1"
                >
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-gray-400 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
              <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                Chat with foreigners from
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "British",
                  "UK",
                  "USA",
                  "Australia",
                  "Qatar",
                  "Malaysia",
                  "Canada",
                ].map((country) => (
                  <span
                    key={country}
                    className="text-xs text-[#c4a8ff] bg-[#6C3FC5]/20 border border-[#6C3FC5]/30 px-3 py-1 rounded-full"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
                <a
            
              href="#register"
              className="text-center text-sm font-semibold text-white bg-[#6C3FC5] py-3 rounded-full hover:bg-[#4C2E8A] transition-all duration-200"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F7FF] to-transparent" />
    </section>
  );
}