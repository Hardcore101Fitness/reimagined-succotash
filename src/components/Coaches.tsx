const coaches = [
  {
    name: "Coach Mike",
    title: "Owner & Head Coach",
    credentials: "CSCS, USAW-L2",
    bio: "15+ years in strength & conditioning. Former D1 athlete. Built Hardcore Fitness from the ground up with one mission: make world-class coaching accessible to everyone.",
    initials: "CM",
  },
  {
    name: "Coach Jen",
    title: "Lead Performance Coach",
    credentials: "NSCA-CPT, FMS-L2",
    bio: "Specializes in movement quality and injury prevention. Known for her ability to help clients move pain-free while still training hard.",
    initials: "CJ",
  },
  {
    name: "Coach D",
    title: "Strength Coach",
    credentials: "CSCS, SFG-II",
    bio: "Competitive powerlifter and former collegiate football player. If you want to get seriously strong, Coach D is your guy.",
    initials: "CD",
  },
];

export default function Coaches() {
  return (
    <section id="coaches" className="py-20 sm:py-28 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Meet the Team
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 tracking-tight">
            Coached by the Best.
            <br />
            <span className="text-brand-500">Not by an App.</span>
          </h2>
          <p className="mt-4 text-lg text-brand-500 leading-relaxed">
            Our coaches don&apos;t just count reps. They study movement, program
            intelligently, and invest in your success like it&apos;s their own.
          </p>
        </div>

        {/* Coach cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <div
              key={coach.name}
              className="bg-white rounded-2xl p-8 border border-brand-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300 text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 mx-auto bg-brand-900 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {coach.initials}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-brand-900">
                {coach.name}
              </h3>
              <p className="text-accent text-sm font-semibold mt-1">
                {coach.title}
              </p>
              <p className="text-brand-400 text-xs tracking-wide mt-1">
                {coach.credentials}
              </p>
              <p className="mt-4 text-brand-500 text-sm leading-relaxed">
                {coach.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
