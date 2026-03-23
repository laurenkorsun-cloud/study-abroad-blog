import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      <h1 className="font-title text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-600">
        The page you’re looking for doesn’t exist or couldn’t be loaded.
      </p>
      <Link
        href="/"
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
      >
        Go home
      </Link>
    </div>
  );
}
