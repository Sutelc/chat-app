// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyCuLSDJLbKVUxM7tQN4-bCA96HpazLgR9w",
  authDomain: "chat-app-sutelc.firebaseapp.com",
  projectId: "chat-app-sutelc",
  storageBucket: "chat-app-sutelc.firebasestorage.app",
  messagingSenderId: "297910150053",
  appId: "1:297910150053:web:1272296009085ea30fbe4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid),{
            id: user.uid,
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            name: "",
            avatar: "",
            bio: "Hey there, I am using chat app!",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatsData: []
        })
    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const login = async(email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        toast.success("Login successful!");
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}
const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logout successful!");
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}
const resetPassword = async(email) => {
    if (!email) {
        toast.error("Please enter your email address.");
        return null;
    }
    try {
        const userRef = collection(db, "users");
        const q= query(userRef, where("email", "==", email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
             await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent!");
        }else{
            toast.error("Email not found!");
            return null;
        }
       
    } catch (error) {
        console.error("Error resetting password:", error);
        toast.error(error.message);
        // toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

export { signup, login, logout, auth, db, resetPassword };