"use client";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";

type permissions = {
  manageEvents: boolean;
  manageMembers: boolean;
  manageContent: boolean;
  manageSettings: boolean;

}

export default function AddAdminPage() {

  const [role, setRole] = useState("CORE");
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState<permissions>({
    manageEvents: false,
    manageMembers: false,
    manageContent: false,
    manageSettings: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { slug } = useParams();

  const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Functionality to add admin will go here
    console.log("Adding admin:", { email, role, permissions });
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await api.post(`/society/${slug}/add-admin`, {
        email,
        role,
        permissions
      });
      setSuccess(true);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add admin");
    }
    finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Background accents */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -top-20 right-[-120px] h-[360px] w-[360px] rounded-full bg-emerald-100 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="mx-auto max-w-xl">

            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Add Admin
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Assign admin roles and permissions to trusted members.
              </p>
            </div>

            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100 blur-2xl" />
              <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-emerald-100 blur-2xl" />

              <form className="relative space-y-6" onSubmit={handleAddAdmin}>
                {success && <p className="text-green-500">Admin added successfully!</p>}
                {error && <p className="text-red-500">{error}</p>}
                {/* User Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    User Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    Enter the email of the user you want to make admin.
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                  >
                    <option>EB</option>
                    <option>CORE</option>
                  </select>
                </div>

                {/* Permissions */}
                <div className="flex flex-col gap-3">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Permissions
                  </p>

                  <div className="space-y-3">

                    <label
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <span>Manage Content</span>
                      <input

                        type="checkbox"
                        checked={permissions.manageContent}
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            manageContent: !prev.manageContent
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-900"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">

                    <label
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <span>Manage Members</span>
                      <input

                        type="checkbox"
                        checked={permissions.manageMembers}
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            manageMembers: !prev.manageMembers
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-900"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">

                    <label
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <span>Manage Events</span>
                      <input

                        type="checkbox"
                        checked={permissions.manageEvents}
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            manageEvents: !prev.manageEvents
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-900"
                      />
                    </label>
                  </div>

                  <div className="space-y-3">

                    <label
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <span>Manage Settings</span>
                      <input

                        type="checkbox"
                        checked={permissions.manageSettings}
                        onChange={() =>
                          setPermissions((prev) => ({
                            ...prev,
                            manageSettings: !prev.manageSettings
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-900"
                      />
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    {loading ? "Adding..." : "Add Admin"}
                  </button>

                  <Link
                    href="./"
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            {/* Footer hint */}
            <p className="mt-6 text-center text-xs text-slate-500">
              Only owners can assign or remove admins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
