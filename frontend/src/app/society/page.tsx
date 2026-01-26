import Link from "next/link";
import SocietyCardUI from "./components/SocietyCard";

type SocietyCard = {
  name: string;
  nickname: string;
  category: string;
  followers: string;
  events: number;
  tagline: string;
  location: string;
};

const societies: SocietyCard[] = [
  {
    name: "Tech Innovators Club",
    nickname: "techclub",
    category: "Technology",
    followers: "2.3k",
    events: 18,
    tagline: "Hackathons, workshops & community meetups.",
    location: "Mumbai",
  },
  {
    name: "Design & Creators Guild",
    nickname: "designguild",
    category: "Design",
    followers: "1.1k",
    events: 9,
    tagline: "UI/UX jams, design talks & portfolio reviews.",
    location: "Delhi",
  },
  {
    name: "Cultural & Arts Society",
    nickname: "culturehub",
    category: "Culture",
    followers: "3.9k",
    events: 24,
    tagline: "Performances, fests, and creative showcases.",
    location: "Pune",
  },
  {
    name: "Sports & Fitness Club",
    nickname: "fitcrew",
    category: "Sports",
    followers: "980",
    events: 12,
    tagline: "Tournaments, training camps & challenges.",
    location: "Bengaluru",
  },
  {
    name: "Entrepreneurship Cell",
    nickname: "ecell",
    category: "Business",
    followers: "4.7k",
    events: 16,
    tagline: "Pitch nights, startup talks, and mentorship.",
    location: "Mumbai",
  },
  {
    name: "Comedy & Open Mic",
    nickname: "micnight",
    category: "Comedy",
    followers: "740",
    events: 7,
    tagline: "Standups, open mics and fun nights.",
    location: "Online",
  },
];




export default function SocietiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600">Societies</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Explore Societies
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                Discover clubs and communities — follow societies and stay updated
                with upcoming events.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/society/request"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Request Society
              </Link>

              <button className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                Create Society
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px_160px]">
              {/* Search */}
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>
                <input
                  placeholder="Search societies by name, category, nickname..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <select className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100">
                  <option>All categories</option>
                  <option>Technology</option>
                  <option>Design</option>
                  <option>Culture</option>
                  <option>Sports</option>
                  <option>Business</option>
                  <option>Comedy</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▾
                </span>
              </div>

              {/* Sort */}
              <div className="relative">
                <select className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100">
                  <option>Trending</option>
                  <option>Most followed</option>
                  <option>Newest</option>
                  <option>Most events</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ▾
                </span>
              </div>
            </div>

            {/* Chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["All", "Technology", "Design", "Culture", "Sports", "Business"].map(
                (chip) => (
                  <button
                    key={chip}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    {chip}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {societies.map((s) => (
              <SocietyCardUI key={s.nickname} society={s} />
            ))}
          </div>

          {/* Pagination / load more */}
          <div className="mt-10 flex justify-center">
            <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
              Load more
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-500">
            Showing a preview list. Plug your backend later.
          </p>
        </div>
      </section>
    </div>
  );
}
