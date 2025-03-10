"use client"

import { useState } from "react";
// import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    interface FirebaseError {
      code: string;
      message: string;
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        setError(null); // Clear previous errors

        // Checks for matching password
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());

          // Set display name after successful registration
          await updateProfile(userCredential.user, userCredential.user)
          toast.success("Registration successful!")
          router.push("/");
        } catch (err: unknown) {
          if (typeof err == 'object' && err != null && 'code' in err && 'message' in err) {
            const firebaseError = err as FirebaseError;
            console.error("Authentication Error:", firebaseError.code, firebaseError.message);
            setError(mapFirebaseError(firebaseError.code));
            return;
          } else {
            // Handle the case where 'err' is no a FirebaseError
            console.error("Unknown Authentication Error:", err);
            setError("unknown-error") // Or some default error
            return;
          }
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold">Register</h2>

            {/* Error Message */}
            {error && <p className="text-red-500 bg-red-100 p-2 rounded text-center">{error}</p>}

            <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4 max-w-96">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name} // Retains input value
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email} // Retains input value
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password} // Retains input value
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword} // Retains input value
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white p-2 rounded">
                    { loading ? (
                    <span className="flex items-center justify-center">
                      <ClipLoader size={18} color="white" />
                      <span className="ml-2">Registering...</span>
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>
            </form>
          </div>
        </div>
    );
};

/* Improved Error Handling */
const mapFirebaseError = (code: string) => {
  const errorMessages: { [key: string]: string } = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Invalid email format. Please check your email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/internal-error": "Something went wrong. Try again later.",
  };
  return errorMessages[code] || "Registration failed. Please try again.";
};

export default Register;