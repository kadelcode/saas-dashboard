"use client";

import { useState } from "react";
import { addUser } from "@/lib/utils";
import toast from "react-hot-toast";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await addUser(name, email);

    if (response.success) {
      setName("");
      setEmail("");
      toast.success("User successfully added");
    } else {
      setError(response.error || "An unknown error occurred"); // Ensure a string
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col h-screen">
      <h1 className="text-4xl font-bold">Welcome to My SaaS Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}