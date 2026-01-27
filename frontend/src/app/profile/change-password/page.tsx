"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { api } from "@/lib/axios";

export default function ChangePasswordSection() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            return setError("All fields are required.");
        }

        if (newPassword !== confirmPassword) {
            return setError("New password and confirm password must match.");
        }

        try {
            setLoading(true);

            await api.patch("/user/change-password", { oldPass:currentPassword, newPass:newPassword });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="relative pt-10 min-h-[calc(100vh-80px)] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
            </div>

            <div className="mx-auto max-w-5xl">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-zinc-900">
                        Change Password
                    </h1>
                    <p className="mt-1 text-sm text-zinc-600">
                        Update your password to keep your account secure.
                    </p>
                </div>

                {/* Layout */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Form Card */}
                    <div className="lg:col-span-2 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Password Details
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Enter your current password and set a new one.
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100">
                                <Lock size={18} className="text-zinc-900" />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <PasswordInput
                                label="Current Password"
                                value={currentPassword}
                                setValue={setCurrentPassword}
                                placeholder="Enter current password"
                                show={showCurrent}
                                setShow={setShowCurrent}
                            />

                            <PasswordInput
                                label="New Password"
                                value={newPassword}
                                setValue={setNewPassword}
                                placeholder="Enter new password"
                                show={showNew}
                                setShow={setShowNew}
                            />

                            <PasswordInput
                                label="Confirm New Password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                placeholder="Re-enter new password"
                                show={showConfirm}
                                setShow={setShowConfirm}
                            />

                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            )
                            }
                            {success && (
                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                    Password updated successfully.
                                </div>
                            )
                            }

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentPassword("");
                                        setNewPassword("");
                                        setConfirmPassword("");
                                        setError("");
                                    }}
                                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-2xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Tips Card */}
                    <div className="rounded-3xl border border-emerald-200 bg-white/70 p-6 shadow-sm backdrop-blur">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                <ShieldCheck size={18} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-zinc-900">
                                    Security Tips
                                </p>
                                <p className="text-xs text-zinc-600">
                                    Recommended password rules
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-zinc-700">
                            <div className="rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
                                ✅ Use 8+ characters
                            </div>
                            <div className="rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
                                ✅ Add numbers & symbols
                            </div>
                            <div className="rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-100">
                                ✅ Don’t reuse old passwords
                            </div>
                        </div>

                        <p className="mt-5 text-xs text-zinc-500">
                            Tip: Avoid common passwords like <b>123456</b> or <b>password</b>.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
