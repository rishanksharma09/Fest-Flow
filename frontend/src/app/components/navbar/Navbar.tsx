"use client";
import Link from "next/link";

import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user)
  const loading = useAuthStore((s) => s.loading);
  console.log("navbar",currentUser)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white shadow-sm">
            <span className="text-sm font-bold">F</span>
          </div>
          <h1 className=" font-bold text-lg">FestFlow</h1>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href="#popular">
            Events
          </Link>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href="#">
            About
          </Link>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href="#">
            Contact
          </Link>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" href="#">
            Create Event
          </Link>
        </nav>

        {!currentUser && <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Sign up
          </Link>
        </div>}

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "#" },
                { label: "Events", href: "#popular" },
                { label: "Online", href: "#discover" },
                { label: "Trending", href: "#trending" },
                { label: "Create Event", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {!currentUser && <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="#"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="#"
                  className="rounded-xl bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Sign up
                </Link>
              </div>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}