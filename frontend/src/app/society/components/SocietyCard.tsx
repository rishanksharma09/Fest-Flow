"use client";

import Link from "next/link";
type SocietyCard = {
  name: string;
  nickname: string;
  category: string;
  followers: string;
  events: number;
  tagline: string;
  location: string;
};
function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
}

function SocietyCardUI({ society }: { society: SocietyCard }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      {/* Top banner */}
      <div className="relative h-28 w-full bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-100 blur-2xl" />

        <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {society.category}
        </div>

        <button
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
          aria-label="Follow"
        >
          +
        </button>

        {/* Avatar */}
        <div className="absolute left-4 bottom-[-22px]">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="absolute inset-0 grid place-items-center text-sm font-bold text-slate-800">
              {society.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {society.name}
            </h3>
            <p className="truncate text-xs text-slate-500">@{society.nickname}</p>
          </div>

          <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {society.location}
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {society.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatPill label="Followers" value={society.followers} />
          <StatPill label="Events" value={society.events} />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link
            href="#"
            className="text-sm font-semibold text-slate-900 hover:underline"
          >
            View Society →
          </Link>

          <button className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800">
            Follow
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </article>
  );
}

export default SocietyCardUI
