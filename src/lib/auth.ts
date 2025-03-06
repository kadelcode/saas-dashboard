/* Import Firebase authentication instance,
Firestore database instance and Google
authentication provider, respectively
*/
import { auth, db, provider } from "./firebase";

/* Import Firebase authentication methods used for signing in with a popup,
signing out, signing in with eamil and password, and creating a new user with
email and password, respectively.
*/
import { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

/*Import Firestore methods used for referencing a document, setting data in a
document, and getting data from a document, respectively.
*/
import { doc, setDoc, getDoc } from "firebase/firestore";


// Sign in with Google
export const signInWithGoogle = async () => {
    try {
        // Opens a popup for Google sign-in
        const result = await signInWithPopup(auth, provider)

        // Extracts the user information from the sign-in result
        const user = result.user;

        // Store user info in Firestore (if new user)
        /* Creates a reference to the user's document in Firestore using their unique ID */
        const userRef = doc(db, "users", user.uid);

        // Retrives the user's document from Firestore
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) { // Checks if the user document does not already exist.
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName,
                role: "user", // Default role
                createdAt: new Date(),
            }); // Sets the user's information in Firestore if the document does not exist.
        }

        return user; // Returns the user object if sign-in is successful
    } catch (error) { // Catches and logs any errors that occur during the sign-in process.
        console.error("Google Sign-In Error:", error);
    }
};


// Sign in with Email & Password
/* An asynchronous function that handles email and password sign-in */
export const signInWithEmail = async (email: string, password: string) => {
    try {
        // Signs in the user with the provided email and password
        const result = await signInWithEmailAndPassword(auth, email, password);

        // Returns the user object if sign-in is successful
        return result.user;
    } catch (error) { // Catches and logs any errors that occur during the sign-in process.
        console.error("Email Sign-In Error:", error);
    }
};