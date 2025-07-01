import { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";

import { auth, storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import placeholder from "../../assets/images/avatar-placeholder.png";
import "./ProfileCard.css";

export default function ProfileCard() {
  const { user, setUser } = useContext(UserContext);

  /* ---- local UI state ---- */
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [editingName,  setEditingName]  = useState(false);
  const [username,     setUsername]     = useState(
    user?.username || user?.displayName || "" );
  const fileInputRef = useRef(null);

  if (!user) return null; // still loading

  /* ---- avatar upload ---- */
  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSavingAvatar(true);
    try {
      // 1. upload to /avatars/<uid>
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);

      // 2. get public URL
      const url = await getDownloadURL(storageRef);

      // 3. update Auth + Firestore
      await updateProfile(auth.currentUser, { photoURL: url });
      await setDoc(doc(db, "users", user.uid), { avatarUrl: url }, { merge: true });

      // 4. refresh local context
      setUser({ ...user, avatarUrl: url });

      // reset picker
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed – please try again.");
    } finally {
      setSavingAvatar(false);
    }
  };

  /* ---- username save ---- */
  const saveUsername = async () => {
    setEditingName(false);
    const newName = username.trim();
    if (!newName || newName === user.username) return;
    try {
      await setDoc(doc(db, "users", user.uid), { username: newName }, { merge: true });
      await updateProfile(auth.currentUser, { displayName: newName });
      setUser({ ...user, username: newName, displayName: newName });
    } catch (err) {
      console.error(err);
      alert("Couldn’t save username.");
    }
  };

  return (
    <div className="profile-card">
      
      <img
        className="avatar-lg"
        src={user.avatarUrl || user.photoURL || placeholder}
        alt="profile"
      />

      
      <h2 className="card-heading">
        {user.displayName || user.username || "My Profile"}
      </h2>

      
      <div className="info-table">
        
        <div className="row">
          <span className="label">Username</span>
          {editingName ? (
            <input
              className="username-input"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              onBlur={saveUsername}
              onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            />
          ) : (
            <span
              className="value editable"
              title="Click to edit"
              onClick={() => setEditingName(true)}
            >
              {user.username || user.displayName || "—"}
            </span>
          )}
        </div>

        
        <div className="row">
          <span className="label">Email</span>
          <span className="value">{user.email || "—"}</span>
        </div>
      </div>

      
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      
      <button onClick={openPicker} disabled={savingAvatar}>
        {savingAvatar ? "Uploading…" : "Upload photo"}
      </button>
    </div>
  );
}
