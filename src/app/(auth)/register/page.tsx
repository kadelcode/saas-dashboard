"use client"

import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Checks for matching password
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        }
        await registerUser(email, password, name);
        router.push("/")
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4 max-w-96">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
            </form>
          </div>
        </div>
    );
};

export default Register;