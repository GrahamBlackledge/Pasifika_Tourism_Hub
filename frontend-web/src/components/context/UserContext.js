import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";      // ✅ use the hook directly
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  /* 1️⃣  Get the Firebase user from AuthProvider */
  const { currentUser } = useAuth();          // ✅ NO useContext() here

  const [user, setUser] = useState(null);

  /* 2️⃣  Pull extra profile data (or reset) whenever auth changes */
  useEffect(() => {
    if (!currentUser) {
      setUser(null);
      return;
    }

    (async () => {
      const snap = await getDoc(doc(db, "users", currentUser.uid));
      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        avatarUrl: currentUser.photoURL,      // uploaded avatar
        ...snap.data(),                       // username, displayName, etc.
      });
    })();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
