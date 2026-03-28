const programs = [
  {
    title: "Strength & Conditioning",
    description:
      "Periodized programming designed to build raw strength, power, and athletic performance. Small group classes with individualized coaching.",
    features: ["Progressive overload system", "Olympic lifting technique", "Mobility & recovery"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Personal Training",
    description:
      "One-on-one sessions with expert coaches who build custom programs around your goals, schedule, and body. Maximum results, minimum guesswork.",
    features: ["Custom program design", "Nutrition guidance", "Progress tracking"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Athletic Performance",
    description:
      "Sport-specific training for competitive athletes. Speed, agility, explosive power, and game-ready conditioning built on science.",
    features: ["Sport-specific protocols", "Speed & agility drills", "Competition prep"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.27.79v.032a6 6 0 01-2.27-.79" />
      </svg>
    ),
  },
  {
    title: "Nutrition Coaching",
    description:
      "Sustainable nutrition strategies that fuel your training and transform your physique. No fads, no restrictions — just results that stick.",
    features: ["Macro-based approach", "Meal planning support", "Body composition analysis"],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Our Programs
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight">
            Built for Every Level.
            <br />
            <span className="text-brand-500">Coached to Perfection.</span>
          </h2>
          <p className="mt-4 text-lg text-brand-500 leading-relaxed">
            Whether you&apos;re just starting out or training for competition,
            our programs are designed to meet you where you are and take you
            where you want to go.
          </p>
        </div>

        {/* Program cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group relative bg-brand-50 hover:bg-brand-900 border border-brand-200 hover:border-brand-700 rounded-2xl p-8 sm:p-10 transition-all duration-300"
            >
              <div className="text-accent group-hover:text-accent-light transition-colors duration-300">
                {program.icon}
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-bold text-brand-900 group-hover:text-white transition-colors duration-300">
                {program.title}
              </h3>
              <p className="mt-3 text-brand-500 group-hover:text-brand-300 leading-relaxed transition-colors duration-300">
                {program.description}
              </p>
              <ul className="mt-5 space-y-2">
                {program.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-brand-600 group-hover:text-brand-300 transition-colors duration-300"
                  >
                    <svg
                      className="w-4 h-4 text-accent shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#cta"
                  className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-light tracking-wide uppercase transition-colors duration-300"
                >
                  Learn More
                  <svg
                    className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
