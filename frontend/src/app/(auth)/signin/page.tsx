"use client"

import Link from "next/link";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { api } from "../../../../lib/axios"
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignInPage() {

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await api.post("/user/login", {
        email,
        password,
      });

      console.log("Login success:", res.data);

      await useAuthStore.getState().fetchUser();

      router.push("/");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className=" bg-white text-slate-900">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
          <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />

          <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">


              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-100 blur-2xl" />
                <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-emerald-100 blur-2xl" />
                <div className="relative">
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                      Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                      Sign in to continue exploring events.
                    </p>
                  </div>

                  <div className="mt-6">
                    {error && (
                      <div className="my-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50">
                      <span className="text-base">G</span>
                      Continue with Google
                    </button>



                    <div className="relative my-6 mt-8">
                      <div className="h-px w-full bg-slate-200" />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                        or sign in with email
                      </span>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Email
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            @
                          </span>
                          <input
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
                        <div className="mb-1.5 flex items-center justify-between">
                          <label className="block text-xs font-semibold text-slate-700">
                            Password
                          </label>
                          <a
                            href="#"
                            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                          >
                            Forgot?
                          </a>
                        </div>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>



                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 rounded-xl bg-slate-900 px-4 py-3 text-sm  font-semibold text-white shadow-sm transition hover:bg-slate-800"
                      >
                        {!loading ? "Sign in" : "Signing in..."}
                      </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                      New here?{" "}
                      <Link
                        href="/register"

                      >
                        <span className="font-semibold text-slate-900 hover:underline">Create an account</span>

                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-500">
                By continuing, you agree to our Terms & Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}