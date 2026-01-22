"use client"
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePage() {

    const currentUser = useAuthStore((state) => state.user)
    const loading = useAuthStore((state) => state.loading);

    const logout = useAuthStore((s) => s.logout);



    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logout();
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-white grid place-items-center">
                <p className="text-sm font-semibold text-slate-600">Loading...</p>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-white grid place-items-center">
                <p className="text-sm font-semibold text-slate-700">
                    Login please 🙂
                </p>
            </div>
        );
    }
    return (
        <>

            <div className="min-h-screen bg-white text-slate-900">
                <section className="relative overflow-hidden">
                    {/* Soft background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                    <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />

                    <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
                        {/* Header */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-600">Account</p>
                                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                    Your Profile
                                </h1>
                                <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                                    Manage your personal info, preferences, and security settings.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                    Cancel
                                </button>
                                <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                                    Save changes
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
                            {/* Left Card */}
                            <aside className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                                <div className="relative">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                                            <div className="absolute inset-0 grid place-items-center text-lg font-bold text-slate-700">
                                                RS
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-lg font-semibold text-slate-900">
                                                {currentUser?.name}
                                            </p>
                                            <p className="truncate text-sm text-slate-600">
                                                {currentUser?.email}
                                            </p>

                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold text-slate-600">
                                                Events Saved
                                            </p>
                                            <p className="mt-1 text-2xl font-bold text-slate-900">18</p>
                                        </div>
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold text-slate-600">
                                                Events Created
                                            </p>
                                            <p className="mt-1 text-2xl font-bold text-slate-900">4</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <button className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            Edit profile photo
                                        </button>
                                        <button className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            View public profile
                                        </button>
                                        <button onClick={(e) => handleLogout(e)} className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700 shadow-sm transition hover:bg-red-100">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </aside>

                            {/* Right Side */}
                            <div className="space-y-6">
                                {/* Personal Info */}
                                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900">
                                                Personal information
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-600">
                                                Update your name and contact details.
                                            </p>
                                        </div>

                                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                                            Last updated: Today
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Full name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Rishank Sharma"
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="@rishank"
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="rishank@example.com"
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Bio
                                        </label>
                                        <textarea
                                            placeholder="Tell people what kind of events you love..."
                                            className="min-h-[110px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                        />
                                    </div>
                                </section>

                                {/* Preferences */}
                                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Preferences
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Customize how you discover events.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Notifications
                                            </p>
                                            <p className="mt-1 text-xs text-slate-600">
                                                Get updates for saved events.
                                            </p>

                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Email alerts
                                                </span>
                                                <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                                                    Enabled
                                                </button>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Location
                                            </p>
                                            <p className="mt-1 text-xs text-slate-600">
                                                Used to recommend nearby events.
                                            </p>

                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-sm text-slate-600">
                                                    Default city
                                                </span>
                                                <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                                                    Mumbai
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Security */}
                                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Manage password and account safety.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            Change password
                                            <p className="mt-1 text-xs font-medium text-slate-600">
                                                Update your password regularly.
                                            </p>
                                        </button>

                                        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            Manage sessions
                                            <p className="mt-1 text-xs font-medium text-slate-600">
                                                View devices logged into your account.
                                            </p>
                                        </button>
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                        <p className="text-sm font-semibold text-amber-900">
                                            Tip: Use strong passwords
                                        </p>
                                        <p className="mt-1 text-sm text-amber-800">
                                            A strong password protects your account from unauthorized
                                            access.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </>

    );
}
