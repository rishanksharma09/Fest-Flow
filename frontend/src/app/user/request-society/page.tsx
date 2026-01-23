"use client";

import { useRef, useState } from "react";
import { ImageIcon, UploadCloud } from "lucide-react";
import { api } from "@/lib/axios";

export default function RequestSocietyPage() {
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const posterRef = useRef<HTMLInputElement | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  const [societyName, setSocietyName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();

    formData.append("name", societyName);
    formData.append("nickname", nickname);
    formData.append("email", email);
    formData.append("description", description);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    if (posterFile) {
      formData.append("poster", posterFile);
    }

    try {
      
      const res = await api.post("/society/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong.");
    }
    finally {
      setLoading(false);}
  }


    return (
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
          <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Request Society
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Fill the details below to request a society creation.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Form Card */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              
              <form className="space-y-5">
                {/* Inputs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Society Name
                    </label>
                    <input
                      value={societyName}
                      onChange={(e) => setSocietyName(e.target.value)}
                      placeholder="e.g. Coding Club"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Nickname
                    </label>
                    <input
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="e.g. CC"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="e.g. society@gmail.com"
                    type="email"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what your society is about..."
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>

                {/* Uploads */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Avatar */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Avatar</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Square image recommended.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => avatarRef.current?.click()}
                        className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Upload Avatar
                      </button>

                      <input
                        ref={avatarRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setAvatarFile(file);
                          setAvatarPreview(URL.createObjectURL(file));
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </div>

                  {/* Poster */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Poster</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Wide image recommended.
                    </p>

                    <div className="mt-4 space-y-3">
                      <div className="h-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        {posterPreview ? (
                          <img
                            src={posterPreview}
                            alt="poster"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <UploadCloud size={18} />
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => posterRef.current?.click()}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Upload Poster
                      </button>

                      <input
                        ref={posterRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setPosterFile(file);
                          setPosterPreview(URL.createObjectURL(file));
                          e.target.value = "";
                        }}
                      />
                    </div>
                  </div>
                </div>
                {success && (
                <div className="mb-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
                  Society request submitted successfully!
                </div>
              )}
              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                  {error}
                </div>
              )}

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    type="button"
                    className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    {loading ? "Submitting..." : "Submit Request"}
                   
                  </button>
                </div>
              </form>
            </div>

            {/* Right Tips */}
            <div className="rounded-3xl border border-emerald-200 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-sm font-semibold text-slate-900">
                Quick Guidelines
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Make sure your request looks professional.
              </p>

              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  ✅ Use a real email address
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  ✅ Add a clear description
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  ✅ Upload good quality images
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
