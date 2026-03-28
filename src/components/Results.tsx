const transformations = [
  {
    name: "Marcus T.",
    result: "Lost 45 lbs in 6 months",
    quote:
      "I tried every gym in town. Hardcore Fitness was the first place where the coaches actually cared about my progress — not just selling me a package.",
    stat: "-45 lbs",
    timeframe: "6 months",
  },
  {
    name: "Sarah K.",
    result: "First pull-up at 42",
    quote:
      "At 42, I did my first unassisted pull-up. My trainer said I could do it. I didn't believe her. She was right.",
    stat: "1st Pull-up",
    timeframe: "4 months",
  },
  {
    name: "James R.",
    result: "500 lb deadlift",
    quote:
      "The programming here is next level. I went from a 315 deadlift to 500 in under a year. The coaches know exactly how to push without breaking you.",
    stat: "500 lb DL",
    timeframe: "11 months",
  },
];

export default function Results() {
  return (
    <section id="results" className="py-20 sm:py-28 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Real Results
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Members Don&apos;t Just
            <br />
            <span className="text-brand-400">Show Up. They Show Out.</span>
          </h2>
          <p className="mt-4 text-lg text-brand-400 leading-relaxed">
            These aren&apos;t stock photos or paid actors. These are real people
            with real jobs and real lives who committed to the process.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {transformations.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300"
            >
              {/* Stat badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                <span className="text-accent font-bold text-sm">
                  {t.stat}
                </span>
                <span className="text-brand-400 text-xs">
                  in {t.timeframe}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-brand-200 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-brand-400 text-xs">{t.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof note */}
        <div className="mt-10 text-center">
          <p className="text-brand-500 text-sm">
            Join 500+ members who have transformed their lives at Hardcore
            Fitness 101
          </p>
        </div>
      </div>
    </section>
  );
}
