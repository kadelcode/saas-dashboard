import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addUser = async (name: string, email: string) => {
  try {
    if (!name || !email) throw new Error("Name and email are required!");
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      createdAt: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred."
    return { success: false, error: errorMessage };
  }
};
