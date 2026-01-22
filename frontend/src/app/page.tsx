import Navbar from "./components/navbar/Navbar";
import Hero from "./components/sections/Hero";
import Categories from "./components/sections/Categories";
import EventGridSection from "./components/sections/EventGridSection";
import Footer from "./components/footer/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <main>
        <Hero />
        <Categories />

       

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
          id="popular"
          title="Popular Events in Mumbai"
          subtitle="Handpicked events people are loving this week"
          chips={["All", "Today", "Tomorrow", "This Weekend", "Free"]}
        />

        <Footer/>
      </main>
    </div>
  );
}