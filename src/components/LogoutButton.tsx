"use client";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const [ loading, setLoading ] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      toast.success("User signed out successfully.");
      //router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Sign-out error:", error);
      toast.error(`Sign out error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={loading} className="bg-gray-700 text-white p-2 rounded">
      {loading ? (<ClipLoader size={18} color="white" />) : "Sign Out"}
    </Button>
  );
};

export default LogoutButton;
