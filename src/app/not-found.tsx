import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-base text-text-off-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-accent-emerald font-mono text-xs border border-border-flat/20">
          Error 404
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-pure tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-text-off-white/70 leading-relaxed">
          The page or operational resource you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-accent-emerald text-navy-base font-semibold text-sm hover:bg-accent-emerald/90 transition-colors shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="px-6 py-2.5 rounded-lg border border-border-flat text-text-off-white font-semibold text-sm hover:bg-navy-light transition-colors"
          >
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
