import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Chip from "../ui/Chip";
import EventCard, { type EventCardProps } from "../ui/EventCard";

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  chips?: string[];
};

const mockEvents: EventCardProps[] = Array.from({ length: 6 }).map((_, i) => ({
  title: "Event title that can go up to two lines",
  category: "Technology & Innovation",
  dateLabel: "NOV",
  day: "22",
  time: "08:00 AM - 04:00 PM",
  venue: i % 2 === 0 ? "Online" : "Mumbai",
  priceTag: i % 3 === 0 ? "Free" : "₹499",
  interestedCount: 18 + i * 7,
}));

export default function EventGridSection({ id, title, subtitle, chips }: Props) {
  return (
    <section id={id} className="py-10">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeader title={title} subtitle={subtitle} />

          {chips?.length ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Chip key={chip} label={chip} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((e, idx) => (
            <EventCard key={idx} {...e} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
            Load more
          </button>
        </div>
      </Container>
    </section>
  );
}