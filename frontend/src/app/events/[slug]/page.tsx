"use client"

import { api } from "@/lib/axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"


type EventListItem = {
    _id: string
    name: string
    startAt: string,
    description: string
    endAt: string,
    slug: string,
    location: string,

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


export default function EventDetails() {

    const [event, setEvent] = useState<EventListItem | null>(null)
    const params = useParams()
    const slug = params.slug as string

    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!slug) return

        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${slug}`)
                setEvent(response.data.data[0])
            } catch (error: any) {
                setError(error?.response?.data?.message || "Something went wrong")
            }
        }

        fetchEvent()
    }, [slug])



    if (!event) {
        return (
            <div className="relative flex h-[calc(100vh-110px)] items-center justify-center px-6">

                {/* 🌈 BACKGROUND */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                    <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
                </div>

                {/* CARD */}
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                    {/* ICON */}
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        ❌
                    </div>

                    {/* TEXT */}
                    <h1 className="text-xl font-semibold text-slate-900">
                        Event not found
                    </h1>

                    <p className="mt-2 text-sm text-slate-600">
                        The event you’re looking for doesn’t exist or may have been removed.
                    </p>

                    {/* ACTIONS */}
                    <div className="mt-6 flex justify-center gap-3">
                        <Link
                            href="/events"
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Browse events
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        )
    }



    const start = new Date(event.startAt)
    const end = new Date(event.endAt)

    const date = start.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    })

    const startTime = start.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    })

    const endTime = end.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    })
    console.log(event)

    return (
        <div className="relative min-h-screen px-4 py-10 sm:px-6 lg:px-10">

            {/* 🌈 BACKGROUND */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
            </div>

            {/* MAIN CONTAINER */}
            <div className="mx-auto max-w-4xl space-y-8">

                {/* EVENT IMAGE */}
                <div className="h-64 w-full rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 rounded-2xl overflow-hidden">
                    {event?.poster?.url ? (
                        <img
                            src={event.poster.url}
                            alt="poster"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200" />
                    )}
                </div>

                

                {/* HEADER */}
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {event?.name}
                    </h1>

                    <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
                        🎟 Buy Tickets
                    </button>
                </div>

                 <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Event Description
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-600">
                        {event?.description}
                    </p>
                </div>

                {/* DATE & TIME */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Date and Time
                    </h3>

                    <p className="text-sm text-slate-600">
                        📅 {date}
                    </p>

                    <p className="text-sm text-slate-600">
                        ⏰ {startTime} – {endTime}
                    </p>

                    <button className="text-xs font-medium text-emerald-600 hover:underline">
                        + Add to Calendar
                    </button>
                </div>

                {/* LOCATION */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Location
                    </h3>

                    <p className="text-sm text-slate-600">
                        📍 {event?.location}
                    </p>

                    <div className="h-48 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                        Map Placeholder
                    </div>
                </div>

                {/* HOST */}
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Hosted by
                    </h3>

                    <div className="flex items-center gap-3">
                        <img
                            src={event?.hostedBy?.avatar?.url}
                            alt={event?.hostedBy?.name}
                            className="h-10 w-10 rounded-full bg-slate-200 object-cover"
                        />

                        <div>
                            <p className="text-sm font-medium text-slate-900">
                                {event?.hostedBy?.name}
                            </p>

                            <div className="flex gap-2">
                                <button className="rounded-md border px-2 py-1 text-xs">
                                    Contact
                                </button>
                                <button className="rounded-md bg-slate-900 px-2 py-1 text-xs text-white">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESCRIPTION */}
               
            </div>
        </div>
    )
}
