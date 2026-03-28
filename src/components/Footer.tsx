export default function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-white text-lg">
                HF
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wider uppercase">
                  Hardcore Fitness 101
                </div>
                <div className="text-gold text-[10px] tracking-[0.25em] uppercase">
                  Est. Since Day One
                </div>
              </div>
            </div>
            <p className="mt-4 text-brand-400 text-sm leading-relaxed max-w-sm">
              A premium strength and conditioning facility dedicated to
              delivering real results through expert coaching, proven
              programming, and an unmatched training environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Programs", href: "#programs" },
                { label: "Results", href: "#results" },
                { label: "Facility", href: "#facility" },
                { label: "Coaches", href: "#coaches" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-brand-400">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  123 Iron Way
                  <br />
                  Your City, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>info@hardcorefitness101.com</span>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <h5 className="text-white text-xs font-semibold tracking-wider uppercase mb-2">
                Hours
              </h5>
              <div className="text-sm text-brand-400 space-y-1">
                <div>Mon-Fri: 5:30 AM - 7:30 PM</div>
                <div>Saturday: 8:00 AM - 12:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-500 text-xs">
            &copy; {new Date().getFullYear()} Hardcore Fitness 101. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-brand-500 hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-brand-500 hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
