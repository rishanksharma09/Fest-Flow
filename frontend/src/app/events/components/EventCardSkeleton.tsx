"use client"

export default function EventCardSkeleton() {
  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 bg-white animate-pulse">
      
      {/* Poster skeleton */}
      <div className="h-44 bg-slate-200" />

      {/* Content */}
      <div className="p-4 flex gap-4">
        
        {/* Date block */}
        <div className="min-w-[60px] h-16 rounded-xl bg-slate-200" />

        {/* Text lines */}
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-1/3" />
        </div>
      </div>

      {/* Hosted by */}
      <div className="flex items-center gap-3 px-4 pb-4">
        <div className="h-8 w-8 rounded-full bg-slate-200" />
        <div className="h-3 bg-slate-200 rounded w-32" />
      </div>
    </div>
  )
}
