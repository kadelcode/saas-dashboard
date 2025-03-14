"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) router.push("/login");
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  return user ? (
    <div>
      <p className="text-lg font-bold">Welcome, {user.displayName || user.email}</p>
    </div>
  ) : null;
};

export default Dashboard;
