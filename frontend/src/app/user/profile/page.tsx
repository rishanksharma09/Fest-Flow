"use client"
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { getFirstLastInitials } from "../../utils/getInitials";
import Image from "next/image";
import { useRef, useState } from "react";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {

    const fetchUser = useAuthStore((state) => state.fetchUser);
    const currentUser = useAuthStore((state) => state.user)
    const loading = useAuthStore((state) => state.loading);
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();
    let avatar = currentUser?.avatar?.url;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [avatarLoading, setAvatarLoading] = useState<boolean>(false);

    const [name, setName] = useState<string>(currentUser?.name || "");
    const [email, setEmail] = useState<string>(currentUser?.email || "");
    const [username, setUsername] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setName(currentUser?.name || "");
        setEmail(currentUser?.email || "");
        setPhone("");
        setBio("");
    }

    const handleChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/user/change-password");
    }

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || "");
            setEmail(currentUser.email || "");
        }
    }, [currentUser]);





    const handleAvatarChangeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        fileInputRef.current?.click();
    }

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAvatarLoading(true);
        const file = e.target.files?.[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('avatar', file);
                const res = await api.patch("/user/update-user-avatar", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await fetchUser();
                console.log("Upload response:", res);
            } catch (error) {
                console.error("Error uploading avatar:", error);
            }
            finally {
                setAvatarLoading(false);
            }
        }


    }

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await logout();
        router.push("/");

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
                                <button onClick={handleCancel} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
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
                                        <a href={avatar} target="_blank"><div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                                            <div className="absolute inset-0 grid place-items-center text-lg font-bold text-slate-700">
                                                {avatar ? (avatarLoading ? (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <div className="animate-spin rounded-full border-4 border-slate-400 border-t-transparent h-6 w-6"></div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={avatar}
                                                        alt="Avatar"
                                                        className="h-full w-full object-cover"
                                                    />
                                                )) : (
                                                    getFirstLastInitials(currentUser?.name)
                                                )}
                                            </div>
                                        </div>
                                        </a>

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
                                        <button onClick={(e) => handleAvatarChangeClick(e)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                                            Edit profile photo
                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarChange(e)} />
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
                                    </div>

                                    <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Full name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Full name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="@username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+91 987XXX0028"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                            />
                                        </div>
                                    </form>

                                    <div className="mt-4">
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Bio
                                        </label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Tell people what kind of events you love..."
                                            className="min-h-[110px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                                        />
                                    </div>
                                </section>

                                {/* Preferences */}
                                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Options
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Customize how you discover events.
                                    </p>

                                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Link href="/user/request-society">
                                        <div  className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Request a new society
                                            </p>
                                            <p className="mt-1 text-xs text-slate-600">
                                                Add a new society.
                                            </p>

                                            <div className="mt-4 flex items-center justify-end">
                    
                                                <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                                                    request
                                                </button>
                                            </div>
                                            
                                        </div>
                                        </Link>
                                        

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Requested Societies
                                            </p>
                                            <p className="mt-1 text-xs text-slate-600">
                                                View your requested societies.
                                            </p>

                                            <div className="mt-4 flex items-center justify-end">
                                               
                                                <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                                                    view
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
                                        <button onClick={handleChangePassword} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
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
