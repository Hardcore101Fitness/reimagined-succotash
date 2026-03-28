export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-900 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent)_0%,_transparent_50%)] opacity-10" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-brand-300 text-xs sm:text-sm tracking-wide">
              Now accepting new members
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Where Serious
            <br />
            Athletes Are
            <br />
            <span className="text-accent">Built.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-brand-300 leading-relaxed max-w-xl">
            Expert coaching. Proven programming. A community that pushes you
            beyond what you thought possible. This is where transformation
            happens.
          </p>

          {/* CTA group */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#cta"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded text-base font-semibold tracking-wide uppercase transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            >
              Start Your Free Trial
              <svg
                className="ml-2 w-5 h-5"
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
            <a
              href="#programs"
              className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded text-base tracking-wide uppercase transition-all duration-200"
            >
              Explore Programs
            </a>
          </div>

          {/* Social proof bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 sm:gap-12 max-w-md">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                500+
              </div>
              <div className="text-xs sm:text-sm text-brand-400 mt-1">
                Members Strong
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                12+
              </div>
              <div className="text-xs sm:text-sm text-brand-400 mt-1">
                Years of Results
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                4.9
              </div>
              <div className="text-xs sm:text-sm text-brand-400 mt-1">
                Star Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-500">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-500 to-transparent" />
      </div>
    </section>
  );
}
