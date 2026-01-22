import Container from "../ui/Container";
import Select from "../ui/Select";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
            <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />

            <Container>
                <div className="relative py-10 md:py-14">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                            Discover events, workshops & meetups
                        </p>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                            Some promotional message.
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                            Search events by name, category, or location — clean UI now, plug your
                            backend later.
                        </p>

                        <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative w-full ">
                                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        ⌕
                                    </span>
                                    <input
                                        placeholder="Search Events"
                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                    />
                                </div>

                                <button className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                                    Search
                                </button>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                    Hackathons
                                </span>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                    Concerts
                                </span>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                    Tech Talks
                                </span>
                                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                    Standups
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}