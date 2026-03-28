const features = [
  {
    title: "10,000+ sq ft Training Floor",
    description:
      "Open layout with dedicated zones for strength, conditioning, and functional training.",
  },
  {
    title: "Competition-Grade Equipment",
    description:
      "Eleiko bars, Rogue rigs, calibrated plates, and specialty bars for every lift.",
  },
  {
    title: "Recovery Suite",
    description:
      "Foam rolling area, stretching zone, and recovery tools to keep you training pain-free.",
  },
  {
    title: "Climate Controlled",
    description:
      "Year-round comfort with industrial HVAC so you can focus on the work, not the weather.",
  },
];

export default function Facility() {
  return (
    <section id="facility" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">
              The Facility
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight">
              Where Iron Meets
              <br />
              <span className="text-brand-500">Intention.</span>
            </h2>
            <p className="mt-4 text-lg text-brand-500 leading-relaxed">
              Our space is built for training — not posing. Every piece of
              equipment, every square foot, every detail is designed to help you
              perform at your best.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title}>
                  <h3 className="text-base font-semibold text-brand-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual placeholder — premium facility image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-brand-100 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-brand-100 flex items-center justify-center">
                <div className="text-center px-8">
                  <svg
                    className="w-16 h-16 mx-auto text-brand-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                  <p className="text-brand-500 text-sm font-medium">
                    Facility Photo
                  </p>
                  <p className="text-brand-400 text-xs mt-1">
                    Replace with high-quality gym interior
                  </p>
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-brand-900 text-white rounded-xl p-6 shadow-2xl">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-brand-400 text-sm mt-1">
                Square Feet of
                <br />
                Training Space
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
