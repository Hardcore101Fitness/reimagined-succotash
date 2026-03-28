export default function TrustBar() {
  return (
    <section className="bg-brand-50 border-y border-brand-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 lg:gap-16">
          {/* Google Reviews */}
          <div className="flex items-center gap-3">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-brand-600">
              <span className="font-semibold text-brand-900">4.9/5</span> on
              Google Reviews
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-brand-300" />

          {/* Certified */}
          <div className="flex items-center gap-2 text-sm text-brand-600">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>
              <span className="font-semibold text-brand-900">
                Certified Coaches
              </span>{" "}
              &mdash; NSCA, CSCS, USAW
            </span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-brand-300" />

          {/* Locally owned */}
          <div className="flex items-center gap-2 text-sm text-brand-600">
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              <span className="font-semibold text-brand-900">
                Locally Owned
              </span>{" "}
              &amp; Operated
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
