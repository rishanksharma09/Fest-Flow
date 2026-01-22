type SelectProps = {
  label?: string;
  options: string[];
};

export default function Select({ label, options }: SelectProps) {
  return (
    <div className="relative">
      <select className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {label ? `${opt}` : opt}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        ▾
      </span>
    </div>
  );
}
