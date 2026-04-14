import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-light text-neutral-900 mb-4">404</h1>
      <p className="text-lg text-neutral-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded hover:bg-neutral-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}