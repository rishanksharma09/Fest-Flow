"use client"

import Link from "next/link";
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react";
import { api } from "../../../../lib/axios";


export default function SignUpPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!terms) {
            setError("Please accept the Terms & Privacy Policy.");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/user/register", {
                name,
                username,
                email,
                password,
            });

            setSuccess(res.data?.message || "Account created successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setTerms(false);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="min-h-screen bg-white text-slate-900">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                    <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />

                    <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
                        <div className="w-full max-w-md">


                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100 blur-2xl" />
                                <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-emerald-100 blur-2xl" />
                                <div className="relative">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                            Create your account
                                        </h1>
                                        <p className="mt-2 text-sm text-slate-600">
                                            Join FestFlow and never miss an event.
                                        </p>
                                    </div>
                                    {error && (
                                        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                            {success}
                                        </div>
                                    )}

                                    <div className="mt-6">

                                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            <span className="text-base">G</span>
                                            Continue with Google
                                        </button>



                                        <div className=" mt-8 relative my-6">
                                            <div className="h-px w-full bg-slate-200" />
                                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                                                or sign up with email
                                            </span>
                                        </div>

                                        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)} >

                                            <div>
                                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    Name
                                                </label>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Rishank Sharma"
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    Username
                                                </label>
                                                <input
                                                    name="username"
                                                    type="text"
                                                    required
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    placeholder="rishanksharma09"
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    Email
                                                </label>
                                                <div className="relative">
                                                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        @
                                                    </span>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    Password
                                                </label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Minimum 8 characters"
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                                />
                                                <p className="mt-2 text-xs text-slate-500">
                                                    Use a mix of letters, numbers & symbols.
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <input
                                                    required
                                                    id="terms"
                                                    type="checkbox"
                                                    checked={terms}
                                                    onChange={(e) => setTerms(e.target.checked)}
                                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900"
                                                />
                                                <label htmlFor="terms" className="text-sm text-slate-600">
                                                    I agree to the{" "}
                                                    <a
                                                        href="#"
                                                        className="font-semibold text-slate-900 hover:underline"
                                                    >
                                                        Terms
                                                    </a>
                                                    {" "}and{" "}
                                                    <a
                                                        href="#"
                                                        className="font-semibold text-slate-900 hover:underline"
                                                    >
                                                        Privacy Policy
                                                    </a>
                                                    .
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="cursor-pointer w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                                            >
                                                {loading ? "Creating..." : "Create account"}
                                            </button>
                                        </form>

                                        <p className="mt-6 text-center text-sm text-slate-600">
                                            Already have an account?{" "}
                                            <Link
                                                href="/signin"
                                                className="font-semibold text-slate-900 hover:underline"
                                            >
                                                Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-center text-xs text-slate-500">
                                Protected by modern security best practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}