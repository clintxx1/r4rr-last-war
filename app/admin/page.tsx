"use client"
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { Table } from "@/components/ui/table";
import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    ImageKitAbortError, ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError, upload
} from "@imagekit/next"


type Member = {
    _id: string;
    name: string;
    gender: string;
    level: number;
    alliancePosition: string;
    positionDescription: string;
    totalPower: number;
    powerUnit: string;
    enemyDefeated: number;
    defeatedUnit: string;
    likes: number;
    giftLevel: number;
    profile?: string;
};

const defaultForm: Partial<Member> = {
    name: "",
    gender: "Male",
    level: 1,
    alliancePosition: "R1",
    positionDescription: "Member",
    totalPower: 0,
    powerUnit: "M",
    enemyDefeated: 0,
    defeatedUnit: "M",
    likes: 0,
    giftLevel: 0,
    profile: "",
};

// Define Column type locally to match the table component
type Column<T> = {
    key: keyof T | "actions";
    header: string;
    render?: (value: T[keyof T] | null, row: T) => ReactNode;
};

export default function AdminPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editMember, setEditMember] = useState<Member | null>(null);
    const [form, setForm] = useState<Partial<Member>>(defaultForm);
    const [formLoading, setFormLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams({
            page: String(page),
            limit: "10",
        });
        if (debouncedSearch) params.append("name", debouncedSearch);
        fetch(`/api/members?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setMembers(data.members || []);
                setTotalPages(data.totalPages || 1);
            })
            .finally(() => setLoading(false));
    }, [page, debouncedSearch]);

    function openAddDialog() {
        setEditMember(null);
        setForm(defaultForm);
        setDialogOpen(true);
    }

    function openEditDialog(member: Member) {
        setEditMember(member);
        setForm(member);
        setDialogOpen(true);
    }

    function handleDialogClose() {
        // Clean up any preview URLs when dialog closes
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.value = '';
        }
        setDialogOpen(false);
        setEditMember(null);
        setForm(defaultForm);
    }

    function handleFormChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setFormLoading(true);

        try {
            // Check if there's a file to upload
            const fileInput = fileInputRef.current;
            let finalFormData = { ...form };

            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadedUrl = await handleUpload(file);
                if (uploadedUrl) {
                    // Update the form data with the uploaded URL
                    finalFormData = { ...finalFormData, profile: uploadedUrl };
                    // Also update the form state for UI consistency
                    setForm((f) => ({ ...f, profile: uploadedUrl }));
                } else {
                    // If upload failed, don't proceed with saving
                    setFormLoading(false);
                    return;
                }
            }

            const method = editMember ? "PUT" : "POST";
            const url = editMember ? `/api/members/${editMember._id}` : "/api/members";
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json", authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}` },
                body: JSON.stringify(finalFormData), // Use the updated form data with the uploaded URL
            });

            setDialogOpen(false);
            setEditMember(null);
            setForm(defaultForm);
            // Clear the file input
            if (fileInput) {
                fileInput.value = '';
            }
            // Refresh table
            setLoading(true);
            fetch(`/api/members?page=${page}&limit=10`)
                .then((res) => res.json())
                .then((data) => {
                    setMembers(data.members || []);
                    setTotalPages(data.totalPages || 1);
                })
                .finally(() => setLoading(false));
        } catch (error) {
            console.error("Error saving member:", error);
        } finally {
            setFormLoading(false);
        }
    }

    async function handleDelete(member: Member) {
        if (!window.confirm(`Delete member ${member.name}?`)) return;
        setLoading(true);
        console.log(process.env.NEXT_PUBLIC_API_SECRET_KEY, process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "hmmm")
        await fetch(`/api/members/${member._id}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}` },
        });
        fetch(`/api/members?page=${page}&limit=10`)
            .then((r) => r.json())
            .then((data) => {
                setMembers(data.members || []);
                setTotalPages(data.totalPages || 1);
            })
            .finally(() => setLoading(false));
    }

    const placeholderImg = "/placeholder.png";

    const columns: Column<Member>[] = [
        { key: "name", header: "Name" },
        { key: "gender", header: "Gender" },
        { key: "level", header: "Level" },
        { key: "alliancePosition", header: "Position" },
        { key: "positionDescription", header: "Position Description" },
        { key: "totalPower", header: "Power", render: (_v, row) => `${row.totalPower}${row.powerUnit}` },
        { key: "enemyDefeated", header: "Enemies Defeated", render: (_v, row) => `${row.enemyDefeated}${row.defeatedUnit}` },
        { key: "likes", header: "Likes" },
        { key: "giftLevel", header: "Gift Level" },
        {
            key: "actions",
            header: "Actions",
            render: (_v, row) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(row)}>
                        Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(row)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload", { method: "GET" });
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(
                    `Request failed with status ${response.status}: ${errorText}`
                );
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            console.log(data, ": data")
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async (file: File): Promise<string | null> => {
        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return null;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                folder: "/R4RR", // Specify your custom folder path
                abortSignal: abortController.signal,
            });
            return uploadResponse.url || null;
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
            return null;
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately without uploading
        const previewUrl = URL.createObjectURL(file);
        setForm((f) => ({ ...f, profile: previewUrl }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <SignedOut>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-xs">
                        <SignIn routing="hash" afterSignOutUrl="/" />
                    </div>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex flex-col items-center gap-4 w-full min-h-screen">
                    <div className="sticky top-0 z-20 w-full max-w-6xl bg-black/80 backdrop-blur border-b border-gray-800 flex justify-between items-center py-4 px-4" style={{ minHeight: '80px' }}>
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <UserButton />
                    </div>
                    <div className="w-full max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 px-4 pt-4">
                        <Dialog open={dialogOpen} onOpenChange={(open) => {
                            if (!open) {
                                handleDialogClose();
                            }
                        }}>
                            <DialogTrigger asChild>
                                <Button onClick={openAddDialog}>Add Member</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editMember ? "Edit Member" : "Add Member"}</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={handleFormSubmit}>
                                    <div className="flex flex-col items-center mb-4">
                                        <div
                                            className="relative cursor-pointer group"
                                            onClick={handleImageClick}
                                        >
                                            <Image
                                                src={form.profile || placeholderImg}
                                                alt="Profile Preview"
                                                width={96}
                                                height={96}
                                                className="w-24 h-24 object-cover rounded-full border border-gray-700 bg-gray-900 group-hover:border-gray-500 transition-colors"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-xs">Click to upload</span>
                                            </div>
                                            {formLoading && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-full">
                                                    <div className="text-white text-xs">Saving...</div>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block mb-1">Name</label>
                                            <input name="name" value={form.name || ""} onChange={handleFormChange} placeholder="Name" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Gender</label>
                                            <select name="gender" value={form.gender || "Male"} onChange={handleFormChange} className="w-full p-2 rounded bg-gray-800">
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="N/A">N/A</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Level</label>
                                            <input name="level" type="number" value={form.level || 1} onChange={handleFormChange} placeholder="Level" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Alliance Position</label>
                                            <select name="alliancePosition" value={form.alliancePosition || "R1"} onChange={handleFormChange} className="w-full p-2 rounded bg-gray-800">
                                                <option value="R5">R5</option>
                                                <option value="R4">R4</option>
                                                <option value="R3">R3</option>
                                                <option value="R2">R2</option>
                                                <option value="R1">R1</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Position Description</label>
                                            <input name="positionDescription" value={form.positionDescription || ""} onChange={handleFormChange} placeholder="Position Description" className="w-full p-2 rounded bg-gray-800" />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Total Power</label>
                                            <input name="totalPower" type="number" value={form.totalPower || 0} onChange={handleFormChange} placeholder="Total Power" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Power Unit</label>
                                            <select name="powerUnit" value={form.powerUnit || "M"} onChange={handleFormChange} className="w-full p-2 rounded bg-gray-800">
                                                <option value="M">M</option>
                                                <option value="K">K</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Enemies Defeated</label>
                                            <input name="enemyDefeated" type="number" value={form.enemyDefeated || 0} onChange={handleFormChange} placeholder="Enemies Defeated" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Defeated Unit</label>
                                            <select name="defeatedUnit" value={form.defeatedUnit || "M"} onChange={handleFormChange} className="w-full p-2 rounded bg-gray-800">
                                                <option value="M">M</option>
                                                <option value="K">K</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block mb-1">Likes</label>
                                            <input name="likes" type="number" value={form.likes || 0} onChange={handleFormChange} placeholder="Likes" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1">Gift Level</label>
                                            <input name="giftLevel" type="number" value={form.giftLevel || 0} onChange={handleFormChange} placeholder="Gift Level" className="w-full p-2 rounded bg-gray-800" required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={formLoading}>{formLoading ? "Saving..." : "Save"}</Button>
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <input
                            type="text"
                            placeholder="Search members by name..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            className="w-full sm:w-64 p-2 rounded bg-gray-800 text-white border border-gray-700"
                        />
                    </div>
                    <div className="w-full max-w-6xl flex-1 px-4" style={{ minHeight: '400px' }}>
                        {loading ? (
                            <div className="text-center py-8">Loading...</div>
                        ) : (
                            <Table
                                columns={columns}
                                data={members}
                                page={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        )}
                    </div>
                </div>
            </SignedIn>
        </div>
    );
}