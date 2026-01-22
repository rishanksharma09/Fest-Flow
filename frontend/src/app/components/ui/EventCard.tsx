import Badge from "./Badge";

export type EventCardProps = {
  title: string;
  category: string;
  dateLabel: string;
  day: string;
  time: string;
  venue: string;
  priceTag: string;
  interestedCount: number;
};

export default function EventCard({
  title,
  category,
  dateLabel,
  day,
  time,
  venue,
  priceTag,
  interestedCount,
}: EventCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="relative h-40 w-full bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="absolute left-4 top-4">
          <Badge>{priceTag}</Badge>
        </div>
        <button
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
          aria-label="Bookmark"
        >
          ★
        </button>

        <div className="absolute inset-x-4 bottom-4">
          <span className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
            {category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[64px_1fr] gap-4 p-4">
        <div className="relative">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
            <p className="text-[11px] font-bold tracking-wide text-slate-600">
              {dateLabel}
            </p>
            <p className="text-xl font-extrabold leading-6 text-slate-900">
              {day}
            </p>
          </div>
        </div>

        <div>
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
            {title}
          </h3>

          <div className="mt-2 space-y-1 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
              {time}
            </p>
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {venue}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {interestedCount}+ interested
            </p>
            <button className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">
              View
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </article>
  );
}