"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import { getFirstLastInitials } from "../../utils/getInitials";
import {
  CalendarDays,
  ChevronLeft,
  Crown,
  Globe,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

export type Society = {
  _id: string;

  name: string;
  email: string;
  activeMembers: number;
  isApproved: boolean;

  admins: string[]; // ObjectId → string

  avatar?: {
    publicId: string;
    url: string;
  } | null;

  poster?: {
    publicId: string;
    url: string;
  } | null;

  nickname?: string | null;
  website?: string | null;
  slug?: string | null;

  createdBy?: string | null;

  description?: string | null;
  about?: string | null;

  createdAt?: string;
  updatedAt?: string;
};


function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SocietyProfilePage() {
  // UI-only demo data
  // "const society ={
  //     name: "Coding Club",
  //     nickname: "CC",
  //     description:
  //       "A community of builders who love web dev, DSA, hackathons, and open-source. We conduct weekly sessions, contests and collaborate on real projects.",
  //     email: "codingclub@college.edu",
  //     location: "Main Campus",
  //     website: "https://example.com",
  //     membersCount: 420,
  //     admins: ["Rishank Sharma", "Aman Verma", "Priya Singh"],
  //     tags: ["Web", "DSA", "Hackathons", "Open Source"],
  //     avatarUrl: "",
  //     posterUrl: "/poster.jpg",
  //   }"
   
  const { slug } = useParams();
  const [society, setSociety] = useState<Society | null>(null);

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        const response = await api.get(`/society/get-society-info/${slug}`);
        setSociety(response.data.data);
      } catch (error) {
        console.error("Error fetching society:", error);
      }}

      fetchSociety();
  }, []);

  const [joined, setJoined] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/societies"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ChevronLeft size={18} />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <button
              className={cn(
                "rounded-2xl px-4 py-2.5 text-sm font-semibold shadow-sm transition",
                joined
                  ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              )}
              onClick={() => setJoined((p) => !p)}
              type="button"
            >
              {joined ? "Joined" : "Join Society"}
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Share
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Poster */}
          <div className="relative h-44 w-full">
            {society?.poster?.url ? (
              <img
                src={society.poster.url}
                alt="poster"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}

          </div>

          {/* Header content */}
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  {society?.avatar?.url ? (
                    <img
                      src={society.avatar.url}
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-900 text-xl font-bold text-white">
                      {getFirstLastInitials(society?.name || "")}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {society?.name}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {society?.nickname}
                  </p>
                </div>
              </div>

        
              
            </div>

            {/* Description */}
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              {society?.description}
            </p>

            {/* Tags */}
            {/* <div className="mt-4 flex flex-wrap gap-2">
              {society.tags.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div> */}
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Left: About + Contact */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">About</h2>
              <p className="mt-2 text-sm text-slate-600">
                {society?.about || "No additional information provided."}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <Users size={16} className="text-slate-500" />
                    Members
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {society?.activeMembers} active members
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CalendarDays size={16} className="text-slate-500" />
                    Meetings
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Weekly (demo info)
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Updates (UI only) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Recent Updates
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Hackathon Prep Session",
                    meta: "Tomorrow • 5:00 PM • Seminar Hall",
                  },
                  {
                    title: "Open Source Sprint",
                    meta: "This Weekend • Online",
                  },
                  {
                    title: "DSA Contest Practice",
                    meta: "Friday • 6:30 PM • Lab 2",
                  },
                ].map((x) => (
                  <div
                    key={x.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {x.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{x.meta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact + Admins */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="rounded-3xl border border-emerald-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h2 className="text-base font-semibold text-slate-900">
                Contact
              </h2>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <Mail size={16} className="text-slate-500" />
                  <span className="truncate">{society?.email}</span>
                </div>

                  {/* <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <MapPin size={16} className="text-slate-500" />
                    <span className="truncate">{society?.location}</span>
                  </div> */}

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <Globe size={16} className="text-slate-500" />
                  <span className="truncate">{society?.website}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Send Message
              </button>
            </div>

            {/* Admins */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">
                  Admins
                </h2>
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100">
                  <Crown size={16} className="text-slate-700" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {/* {society?.admins.map((a) => (
                  <div
                    key={a}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                        {getfrInitials(a)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {a}
                        </p>
                        <p className="text-xs text-slate-500">Admin</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </button>
                  </div>
                ))} */}
              </div>
            </div>

            {/* Join Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">
                Interested?
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Join this society to get updates and participate in events.
              </p>

              <button
                type="button"
                onClick={() => setJoined(true)}
                className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
