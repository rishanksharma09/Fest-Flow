"use client";

import { useEffect, useState } from "react";
import { Mail, Pencil, Trash2, Eye } from "lucide-react";
import { api } from "@/lib/axios";
import { getFirstLastInitials } from "../../utils/getInitials";

export default function RequestedSocietiesPage() {

    type Society = {
        _id: string;
        name: string;
        nickname: string;
        email: string;
        about: string;
        avatar: {
            url: string;
            publicId: string;
        };
        poster: {
            url: string;
            publicId: string;
        };
        status: "PENDING" | "APPROVED" | "REJECTED";
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");


    const [societies, setSocieties] = useState<Society[]>([]);

    useEffect(() => {
        // Fetch requested societies from API
        setLoading(true);
        async function fetchRequestedSocieties() {
            try {

                const response = await api.get('/user/get-requested-societies');
                setSocieties(response.data.data);
                console.log("Requested societies:", response.data);

            } catch (error: any) {
                setError(error.response?.data?.message || "Failed to load requested societies.");
            } finally {
                setLoading(false);
            }
        }
        fetchRequestedSocieties();

    }, [societies]);

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement>,
        societyId: string
    ) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this requested society?"
        );

        if (!confirmed) return;

        try {
            const res = await api.delete(
                `/user/delete-requested-society/${societyId}`
            );

            console.log("Deleted requested society:", res.data);


            setSocieties((prev) =>
                prev.filter((society) => society._id !== societyId)
            );
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to delete requested society."
            );
        }
    };



    return (
        <section className="min-h-screen relative overflow-hidden">
            {/* ===== Background ===== */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
            </div>

            {/* ===== Content ===== */}

            <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
                <h1 className="text-2xl font-bold text-slate-900">
                    Requested Societies
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Review, edit, or manage requested societies.
                </p>

                {error && (
                    <div className="  max-w-6xl py-4">
                        <div className="rounded-lg bg-red-100 p-4 text-sm text-red-800">{error}</div>
                    </div>
                )}


                <div className="mt-8 flex flex-col gap-6">

                    {societies.map((society) => (
                        <div
                            key={society._id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm"
                        >
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

                            {/* Card Body */}
                            <div className="flex flex-col  gap-5 p-6 sm:flex-row">
                                {/* Avatar */}
                                <div className="h-20 w-20 rounded-3xl overflow-hidden border border-white bg-slate-100 shadow-sm">


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

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-900">
                                                {society.name}
                                            </h2>
                                            <p className="text-sm text-slate-500">
                                                @{society.nickname}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${society.status === "APPROVED"
                                                    ? "bg-green-100 text-green-800"
                                                    : society.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {society.status}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-slate-600">
                                        {society.about}
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                                        <Mail className="h-4 w-4" />
                                        {society.email}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 sm:flex-col sm:items-end">
                                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                                        <Eye className="h-4 w-4" />
                                        View
                                    </button>

                                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </button>

                                    <button onClick={(e) => handleDelete(e, society._id)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
