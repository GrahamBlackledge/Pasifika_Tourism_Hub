import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import "./PostFeed.css";

function PostFeed() {
  const { currentUser } = useAuth();
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [countryTag, setCountryTag] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [postDropdownId, setPostDropdownId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddPost = async () => {
    if (!countryTag || !postText.trim()) {
      alert("Please enter a post and select a country.");
      return;
    }
    try {
      let imageUrl = null;

      if (imageFile) {
        const storageRef = ref(
          storage,
          `images/${currentUser.uid}/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "posts"), {
        userId: currentUser.uid,
        email: currentUser.email,
        content: postText,
        country: countryTag,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      setPostText("");
      setImageFile(null);
      fetchPosts();
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      toggleDropdown();
      fetchPosts();
    } catch (err) {
      console.error("Error deleting posts: ", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditText(post.content);
  };

  const handleSaveEdit = async () => {
    try {
      await updateDoc(doc(db, "posts", editingPostId), {
        content: editText,
      });
      setEditingPostId(null);
      setEditText("");
      fetchPosts();
    } catch (err) {
      console.error("Error updating post: ", err);
    }
  };

  const toggleDropdown = (postId) => {
    setPostDropdownId((prev) => (prev === postId ? null : postId));
  };

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/countries");
        setCountryOptions(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (currentUser) fetchPosts();
  }, [currentUser]);

  return (
    <div className="post-feed-container">
      <div className="post-form">
        <select
          value={countryTag}
          onChange={(e) => setCountryTag(e.target.value)}
        >
          <option value="">Select a country</option>
          {countryOptions.map((c) => (
            <option key={c._id} value={c.countryName}>
              {c.countryName}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="post-image"
          />
        )}
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Share your travel experiences!"
        />

        <button onClick={handleAddPost}>Post</button>
      </div>

      <div className="post-feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">

            <div className="post-card-top">
              {post.country && (
                <p className="post-country">📍 {post.country}</p>
              )}
              <div className="dropdown-container">
                <button
                  className="post-dropdown-btn"
                  onClick={() => toggleDropdown(post.id)}
                >
                  <p>▼</p>
                </button>

                {postDropdownId === post.id && (
                  <div className="post-dropdown-menu">
                    <button onClick={() => handleEdit(post)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {editingPostId === post.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Post" className="post-image" />
                )}
                <p>{post.content}</p>
                <small>
                  {post.timestamp
                    ? new Date(post.timestamp.toDate()).toLocaleString()
                    : "Just now"}
                </small>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostFeed;
