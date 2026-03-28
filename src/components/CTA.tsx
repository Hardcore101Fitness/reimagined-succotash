"use client";

export default function CTA() {
  return (
    <section id="cta" className="py-20 sm:py-28 bg-brand-900 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_60%)] opacity-5" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-accent text-sm font-semibold tracking-wider uppercase">
          Start Today
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Your First Session Is Free.
          <br />
          <span className="text-brand-400">No Commitment. No Catch.</span>
        </h2>
        <p className="mt-6 text-lg text-brand-300 leading-relaxed max-w-xl mx-auto">
          Book a free trial session and experience what real coaching feels like.
          Tour the facility, meet the team, and see why 500+ members call
          Hardcore Fitness home.
        </p>

        {/* CTA Form */}
        <form
          className="mt-10 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-brand-500 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-brand-500 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-brand-500 rounded-lg px-4 py-3.5 text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              required
            />
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg text-base font-semibold tracking-wide uppercase transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            >
              Book My Free Trial
            </button>
          </div>
          <p className="mt-4 text-brand-500 text-xs">
            No spam. No obligations. Just a conversation about your goals.
          </p>
        </form>

        {/* Trust elements */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-brand-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            No contracts required
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            Results guaranteed
          </div>
        </div>
      </div>
    </section>
  );
}
