// src/hooks/useLikes.js
import { useEffect, useState, useCallback } from "react";

/* -------------------- tiny API wrapper -------------------- */
const api = {
  list:  (uid)                 =>
    fetch(`/api/users/${uid}/likes?ts=${Date.now()}`)        // bust cache
      .then(r => r.json()),

  toggle: (uid, slug, id)      =>
    fetch(`/api/users/${uid}/likes/${slug}/${id}`, { method: "POST" })
      .then(r => r.json()),
};
/* ---------------------------------------------------------- */

export default function useLikes(uid) {
  const [likes, setLikes] = useState([]);    // [{ countrySlug, _id }]

  /* ---- always fetch fresh list when uid appears ---- */
  useEffect(() => {
    if (!uid) return;
     api.list(uid)
    .then(data => {
      /* 🐞 DEBUG — see exactly what the server returns */
      console.log("SERVER LIST", data);

      /* normalise _id and store */
      setLikes(
           data
    .filter(l => l.countrySlug && l.activityId)             // already normalised
    .map(l => ({
      countrySlug: l.countrySlug,
      activityId : String(l.activityId)
    }))
);
    })
    .catch(console.error);
}, [uid]);

  /* ---- helper: is this activity liked? ---- */
  const isLiked = useCallback(
  (slug, id) =>
    likes.some(l => l.countrySlug === slug && l.activityId === String(id)),
  [likes]
);

  /* ---- toggle and THEN pull the authoritative list ---- */
  const toggle = async (slug, id) => {
    if (!uid) return;
    await api.toggle(uid, slug, id);                        // backend 200
    const fresh = await api.list(uid);                      // authoritative
    setLikes(fresh.map(l => ({ ...l, _id: String(l._id) })));
  };

  return { likes, isLiked, toggle };
}
