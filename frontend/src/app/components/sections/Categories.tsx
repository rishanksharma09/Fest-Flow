import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const categories = [
  "Music",
  "Technology",
  "Workshops",
  "Comedy",
  "Sports",
  "Networking",
];

export default function Categories() {
  return (
    <section className="py-10">
      <Container>
        <SectionHeader title="Explore Categories" subtitle="Pick what you feel like today" />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <button
              key={c}
              className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
            >
              <div className="relative mb-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-emerald-100">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-200" />
              </div>
              <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-950">
                {c}
              </p>
              <p className="mt-1 text-xs text-slate-500">Browse</p>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
