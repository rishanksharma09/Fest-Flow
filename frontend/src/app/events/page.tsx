"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState, useRef } from "react"
import EventCard from "./components/EventCard"
import { api } from "@/lib/axios"
import EventCardSkeleton from "./components/EventCardSkeleton"


export type EventListItem = {
    _id: string
    name: string
    startAt: string
    endAt: string,
    slug:string,
    location: string
    poster: {
        url: string
    }

    hostedBy: {
        _id: string
        name: string
        slug: string
        avatar?: {
            url?: string
        }
    }
}


export default function EventsPage() {

    const [events, setEvents] = useState<EventListItem[]>([])
    const [error, setError] = useState("")
    const [page, setPage] = useState(1)
    const pageRef = useRef(1)

    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const loaderRef = useRef<HTMLDivElement | null>(null)



    const fetchEvents = async () => {
        if (loading || !hasMore) return

        setLoading(true);
        const LIMIT = 6

        try {
            const res = await api.get("/events/get-all-events", {
                params: { page:pageRef.current, limit: LIMIT },
            })
            setEvents((prev) => [...prev, ...res.data.data]);
            console.log(page)
            if (res.data.data.length < LIMIT) {
                setHasMore(false);
            }else {
      setPage(prev => {
        pageRef.current = prev + 1
        return prev + 1
      })
    }
            console.log(res.data.data)
        } catch (error: any) {
            setError(error.response.data.message)
            console.log(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        if (!loaderRef.current || !hasMore) return

        const observer = new IntersectionObserver(
            ([entry]) => {
               

                if (entry.isIntersecting) {
                    fetchEvents()
                     setPage(prev => prev + 1)
                }
            },
            { threshold: 1 }
        )

        observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [hasMore])



    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden py-12">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Events
                    </h1>
                    <p className="text-slate-600 mt-1">
                        Discover and manage all FestFlow events in one place
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="Search events..."
                        className="sm:max-w-sm"
                    />

                    <Select>
                        <SelectTrigger className="sm:w-44">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                {/* Events Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Event Card */}
                    {events.map((event: EventListItem) => (
                        <EventCard
                            key={event._id}
                            title={event.name}
                            startDate={new Date(event.startAt)}
                            poster={event.poster}
                            endDate={new Date(event.endAt)}
                            venue={event.location}
                            societyName={event.hostedBy?.name ?? "Unknown Society"}
                            societyAvatar={event.hostedBy?.avatar?.url}
                        />
                    ))}
                    {loading &&
                        Array.from({ length: 3 }).map((_, i) => (
                            <EventCardSkeleton key={`skeleton-${i}`} />
                        ))}

                </div>


                {hasMore && <div ref={loaderRef} className="h-10" />}


            </div>
        </div>
    )
}
