"use client"; /* This directive indicates that the component should be rendered on the client side. */


/* Import the `useState` hook from React, which allows you to add
state to functional components
*/
import { useState } from "react";

/* Import functions from local module `@/lib/auth` */
import { signInWithGoogle } from "@/lib/auth";

/* Imports the `useRouter` hook from Next.js, which provides
navigation capabilities.
*/
import { useRouter } from "next/navigation";

import { ClipLoader } from "react-spinners";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// Defines a functional component
const Login = () => {
  // Initializes a state variable `email` with an empty string and
  // a function `setEmail` to update it
  const [email, setEmail] = useState("");

  // Initializes a state variable `password` with an empty string
  // and a function `setPassword` to update it
  const [password, setPassword] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Initializes a state variable `errors` with an empty string
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?:string}>({});

  // Initalizes the `router object using the `useRouter` hook,
  // allowing navigation between pages.
  const router = useRouter();

  const [error, setError] = useState<string | null>(null); // Local error state

  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => { // Asynchronous function to handle Google sign-in
    await signInWithGoogle();
    router.push("/")
  };

  const handleEmailSignIn = async (e: React.FormEvent) => { // Asynchronous function to handle email sign-in
    e.preventDefault(); // Prevents the default form submission behavior

    setErrors({}); // Reset previous errors
    setError(null); // Clear previous errors

    setLoading(true); // Start loading

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      toast.error("Email is required!")
      setLoading(false);
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
      toast.success("Login Successful!")
    } catch (err: any) {
      console.error("Authentication Error:", err.code, err.message);
      setError(mapFirebaseError(err.code)); // Use helper function to map errors
      return;
    } finally {
      setLoading(false); // Stop loading after request
    }
    
  };

  return ( // Returns JSX for the component
    <Card className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
          <div className="relative">
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading} // Disable button when loading
          >
            { loading ? (
              <span className="flex items-center justify-center">
                <ClipLoader size={18} color="white" />
                <span className="ml-2">Logging in...</span>
              </span>
            ) : (
              "Login"
            )} 
          </button>
            
        </form>
      </div>
    </Card>
  );
};

/** Helper function to map Firebase error codes to user-friendly messages */
const mapFirebaseError = (code: string) => {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/internal-error": "Something went wrong. Try again later.",
  };
  return errorMessages[code] || "Authentication failed. Please try again.";
};

/* Exports the `Login` components as the default export,
making it available for import in other files.
*/
export default Login;
  