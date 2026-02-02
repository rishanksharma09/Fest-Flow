"use client"

import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
    title: string

    startDate: Date
    endDate: Date
    poster: {
    
        url: string
    }

    venue: string
    time: string

    societyName: string
    societyAvatar?: string
}

export default function EventCard({
    title,
    startDate,
    endDate,
    poster,
    venue,
    time,
    societyName,
    societyAvatar,
}: EventCardProps) {

    let statusText = ""

    const now = new Date()
    const start = new Date(startDate)


    if (now < startDate) {
        const diffMs = startDate.getTime() - now.getTime()
        const daysToGo = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

        statusText =
            daysToGo === 1
                ? "1 day to go"
                : `${daysToGo} days to go`

    } else if (now >= startDate && now <= endDate) {
        statusText = "In progress"

    } else {
        statusText = "Passed"
    }



    const sameDay =
        startDate.toDateString() === endDate.toDateString()

    let sameMonth = true;

    const month1 = startDate.toLocaleString("en-US", {
        month: "short",
    }).toUpperCase()

    const month2 = endDate.toLocaleString("en-US", {
        month: "short",
    }).toUpperCase()

    if (!sameDay && month1 !== month2) {
        sameMonth = false
    }

    const startDay = startDate.getDate()
    const endDay = endDate.getDate()

    return (
        <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-sm transition">

            {/* Poster */}
            <div className="relative h-44 bg-slate-200 flex items-center justify-center">

                {poster?.url ?
                    (<img src={poster?.url} className="w-full h-fill object-contain"></img>) :
                    <span className="text-slate-500">No poster</span>
                }


                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 rounded-full z-4"
                >
                    <Bookmark className="h-4 w-4" />
                </Button>
            </div>

            {/* Content */}
            <div className="p-4 flex gap-4">

                {/* Date */}
                <div className="min-w-[80px] rounded-xl h-fit bg-emerald-50 text-emerald-700 px-2 py-3 text-center">
                    <div className="text-xs font-medium uppercase leading-tight">
                        {month1} {startDay}
                        {!sameDay && (
                            <>
                                <span className="mx-1 text-slate-400">–</span>
                                {month2} {endDay}
                            </>
                        )}
                    </div>
                </div>


                {/* Details */}
                <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-slate-900 leading-snug line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-sm text-slate-600">
                        {venue}
                    </p>

                    <p className="text-sm text-slate-500">
                        {time}
                    </p>

                    <p className="text-xs text-emerald-600 font-medium pt-1">
                        {statusText}
                    </p>
                </div>
            </div>

            {/* Hosted By */}
            <div className="flex items-center gap-3 px-4 pb-4 pt-1">
                <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-xs font-medium text-slate-600">
                    {societyAvatar ? (
                        <img
                            src={societyAvatar}
                            alt={societyName}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        societyName.charAt(0)
                    )}
                </div>

                <p className="text-sm text-slate-600">
                    Hosted by{" "}
                    <span className="font-medium text-slate-800">
                        {societyName}
                    </span>
                </p>
            </div>
        </div>
    )
}
