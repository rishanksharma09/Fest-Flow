"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { z } from "zod";
import { useForm, Resolver, Controller } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react"
import path from "path"
import { api } from "@/lib/axios"

const EventSchema = z.object({
    name: z.string().min(3, "Event name must be at least 3 characters long").regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    location: z.string().min(3, "Location must be at least 3 characters long"),

    startAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date" }),
    endAt: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date" }),

    capacity: z
        .coerce
        .number("Capacity is required")
        .refine((v) => !Number.isNaN(v), "Capacity is required")
        .min(1, "Capacity must be at least 1"),

    fee: z.coerce.number("Fee is required").refine((v) => !Number.isNaN(v), "Fee is required").min(0, "Fee cannot be negative"),
    registrationLink: z.string().optional(),
    registrationDeadline: z.string().optional().refine((date) => !date || !isNaN(Date.parse(date)), { message: "Invalid registration deadline" }),
    poster: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= 2 * 1024 * 1024,
            { message: "Max file size is 2MB" }
        )
        .refine(
            (file) =>
                !file ||
                ["image/png", "image/jpeg", "image/webp"].includes(file.type),
            { message: "Only PNG, JPEG, or WEBP allowed" }
        ),

}).refine(
    (data) => {
        const start = new Date(data.startAt)
        const end = new Date(data.endAt)
        return start < end
    },
    {
        message: "End date & time must be after start date & time",
        path: ["endAt"]
    })
    ;
type EventFormData = z.infer<typeof EventSchema>;

export default function AddEventPage() {

    const [success,setSuccess] = useState(false);

    const [posterPreview, setPosterPreview] = useState("")
    const { slug } = useParams()

    const posterRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors, isSubmitting }, control } = useForm<EventFormData>({ resolver: zodResolver(EventSchema) as Resolver<EventFormData> });

    const onSubmit = async (data: EventFormData) => {
        console.log("Form Data:", data);
        const formData = new FormData();
        setSuccess(false)

        if (data.poster) {
            formData.append("poster", data.poster); // ✅ File
        }

        formData.append("name", data.name);
        formData.append("startAt", data.startAt);
        formData.append("endAt", data.endAt);
        formData.append("capacity", String(data.capacity));
        formData.append("fee", String(data.fee));
        formData.append("description", data.description);
        formData.append("location", data.location);


        // Here you can handle form submission, e.g., send data to your API
        try {
            const res = await api.post(`/society/${slug}/add-event`, formData)
            setSuccess(true)
        } catch (error: any) {
            setError("root", {
                type: "server",
                message: error.response.data.message || "Something went wrong",
            });
        }
    }

    const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        const poster = e.target?.files?.[0]

        if (!poster) return

        setPosterPreview(URL.createObjectURL(poster))

    }


    return (
        <div className="min-h-screen realtive overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
                <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
                <div className="absolute -top-24 right-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-100 blur-3xl" />
            </div>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold text-slate-900">
                        Create Event
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Add details about your event — this will be visible to everyone.
                    </p>
                </div>

                {/* Form Card */}
                <form className="bg-white rounded-2xl border border-slate-200 p-8 space-y-10" onSubmit={handleSubmit(onSubmit)}>
                    {/* Basic Info */}
                    {success && <p className="text-green-600 text-sm">Event added succesfully</p>}
                    {errors.root && <p className="text-red-600 text-sm">{errors.root.message}</p>}
                    <section className="space-y-4">
                        <div className="space-y-2">
                            <Label>Event Name</Label>
                            <Input placeholder="Tech Symposium 2026" {...register("name")} />
                            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="What is this event about?"
                                className="min-h-[120px]"
                                {...register("description")}
                            />
                            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
                        </div>


                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input placeholder="Main Auditorium" {...register("location")} />
                            {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
                        </div>




                    </section>

                    {/* Date & Time */}
                    <section className="space-y-4">
                        <h3 className="font-medium text-slate-900">
                            Date & Time
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start At</Label>
                                <Input type="datetime-local"  {...register("startAt")} min={new Date().toISOString().slice(0, 16)} />
                                {errors.startAt && <p className="text-red-600 text-sm">{errors.startAt.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>End At</Label>
                                <Input type="datetime-local" {...register("endAt")} min={new Date().toISOString().slice(0, 16)} />
                                {errors.endAt && <p className="text-red-600 text-sm">{errors.endAt.message}</p>}
                            </div>
                        </div>


                    </section>

                    {/* Registration */}
                    <section className="space-y-4">
                        <h3 className="font-medium text-slate-900">
                            Registration
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Capacity</Label>
                                <Input type="number" min={1} placeholder="200" {...register("capacity", { valueAsNumber: true })} />
                                {errors.capacity && <p className="text-red-600 text-sm">{errors.capacity.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Fee (₹)</Label>
                                <Input type="number" min={0} placeholder="0" {...register("fee", { valueAsNumber: true })} />
                                {errors.fee && <p className="text-red-600 text-sm">{errors.fee.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Registration Link</Label>
                                <Input placeholder="https://forms.google.com/..." {...register("registrationLink")} />
                                {errors.registrationLink && <p className="text-red-600 text-sm">{errors.registrationLink.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Registration Deadline</Label>
                                <Input type="datetime-local" {...register("registrationDeadline")} />
                                {errors.registrationDeadline && <p className="text-red-600 text-sm">{errors.registrationDeadline.message}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Poster */}
                    <section className="space-y-3">
                        <Label>Event Poster</Label>
                        {errors.poster?.message && <p className="text-red-600 text-sm">{errors.poster.message}</p>}

                        <div
                            onClick={() => posterRef.current?.click()}
                            className="border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-500 hover:border-slate-400 transition cursor-pointer"
                        >
                            Click to upload the poster

                            <Controller
                                name="poster"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={posterRef}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            field.onChange(file);
                                            handlePosterUpload(e)// 🔑 RHF now stores File
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* Poster preview */}
                        {posterPreview && (
                            <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-slate-200">
                                <img
                                    src={posterPreview}
                                    alt="Poster preview"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}
                    </section>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button className="rounded-full px-6" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Event"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
