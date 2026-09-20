import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-origin-base text-origin-text flex flex-col items-center justify-center p-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-origin-accent/15 border border-origin-accent/30 flex items-center justify-center text-origin-accent mb-4">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold font-sans mb-2">Provenance Receipt Not Found</h1>
      <p className="text-xs font-mono text-origin-muted max-w-sm mb-6">
        The requested meme fingerprint or route does not exist on this network layer.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-origin-accent hover:bg-origin-accentHover text-white text-xs font-semibold flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Origin</span>
      </Link>
    </div>
  );
}
