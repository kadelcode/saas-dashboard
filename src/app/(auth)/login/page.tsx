/* This directive indicates that the component should be rendered on the client side. */
"use client";

/* Import the `useState` hook from React, which allows you to add
state to functional components
*/
import { useState } from "react";

/* Import functions from local module `@/lib/auth` */
import { signInWithGoogle, signInWithEmail } from "@/lib/auth";

/* Imports the `useRouter` hook from Next.js, which provides
navigation capabilities.
*/
import { useRouter } from "next/navigation";


// Defines a functional component
const Login = () => {
  // Initializes a state variable `email` with an empty string and
  // a function `setEmail` to update it
  const [email, setEmail] = useState("");

  // Initializes a state variable `password` with an empty string
  // and a function `setPassword` to update it
  const [password, setPassword] = useState("");

  // Initalizes the `router object using the `useRouter` hook,
  // allowing navigation between pages.
  const router = useRouter();

  const handleGoogleSignIn = async () => { // Asynchronous function to handle Google sign-in
    await signInWithGoogle();
    router.push("/")
  };

  const handleEmailSignIn = async (e: React.FormEvent) => { // Asynchronous function to handle email sign-in
    e.preventDefault(); // Prevents the default form submission behavior
    await signInWithEmail(email, password);
    router.push("/");
  };

  return ( // Returns JSX for the component
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

/* Exports the `Login` components as the default export,
making it available for import in other files.
*/
export default Login;
  