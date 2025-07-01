// components/context/AuthContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../../firebase";           // make sure db is exported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult,
  updateProfile,                                     // NEW
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";    // NEW

/* --------------------------------------------------- */
/* 1️⃣  RAW CONTEXT – export it in case anyone needs it */
export const AuthContext = createContext(null);
/* --------------------------------------------------- */

/* 2️⃣  Hook the rest of the app will call */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin]         = useState(false);

  /* ─────────── auth helpers ─────────── */

  /** Create a user, store username in both Auth (displayName)
   *  and a matching Firestore document.
   */
  const signUp = async (email, password, username) => {
    // create Auth account
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // save the display name on the auth user
    await updateProfile(cred.user, { displayName: username });

    // create the Firestore user doc (adjust fields to taste)
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      avatarUrl: "",          // empty for now; update after upload
      likedActivities: [],
    });
  };

  const login  = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  /* ─────────── watch login / logout ─────────── */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setIsAdmin(false);
        return;
      }

      // pull custom claims once per login
      const { claims } = await getIdTokenResult(user, true);
      setIsAdmin(claims.admin === true);
    });

    return () => unsubscribe();
  }, []);

  /* ─────────── provider value ─────────── */

  const value = {
    currentUser,
    isAdmin,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
