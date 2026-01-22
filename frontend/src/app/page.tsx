import Navbar from "./components/navbar/Navbar";
import Hero from "./components/sections/Hero";
import Categories from "./components/sections/Categories";
import EventGridSection from "./components/sections/EventGridSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <Hero />
        <Categories />

        <EventGridSection
          id="popular"
          title="Popular Events in Mumbai"
          subtitle="Handpicked events people are loving this week"
          chips={["All", "Today", "Tomorrow", "This Weekend", "Free"]}
        />

        <EventGridSection
          id="discover"
          title="Discover Best of Online Events"
          subtitle="Join live sessions, workshops, and community meetups"
          chips={["Trending", "Workshops", "Tech", "Design", "Business"]}
        />

        <section className="py-14">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-100 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-100 blur-3xl" />

              <div className="relative">
                <p className="text-sm font-medium text-slate-600">
                  Events specially curated for you
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Find your next favorite experience ✨
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Explore categories, filter by location, and save events you love.
                  This UI is clean, modern, and ready for your API.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#popular"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Get Started
                  </a>
                  <a
                    href="#discover"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Browse Online Events
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EventGridSection
          id="trending"
          title="Trending Events around the World"
          subtitle="What people are bookmarking globally"
          chips={["Global", "Hackathons", "Conferences", "Meetups"]}
        />

        <footer className="border-t border-slate-200 py-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-900">FestFlow</p>
                <p className="mt-1 text-sm text-slate-600">
                  A modern events UI — plug your backend and ship.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <a className="hover:text-slate-900" href="#">
                  Privacy
                </a>
                <a className="hover:text-slate-900" href="#">
                  Terms
                </a>
                <a className="hover:text-slate-900" href="#">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}