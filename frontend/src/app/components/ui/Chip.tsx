export default function Chip({ label }: { label: string }) {
  return (
    <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
      {label}
    </button>
  );
}