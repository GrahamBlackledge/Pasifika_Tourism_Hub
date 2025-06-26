export const getLikedActivities = async (uid) => {
  const res = await fetch(`/api/users/${uid}/likes`);
  if (!res.ok) throw new Error('Failed to fetch likes');
  return res.json();
};

export const toggleLike = async (uid, slug, id) => {
  const res = await fetch(`/api/users/${uid}/likes/${slug}/${id}`, { method: 'POST' });

  if (!res.ok) {
    const text = await res.text();          // <= show server message
    console.error(res.status, text);        // <= add this line
    throw new Error('Failed to toggle like');
  }
  return res.json();
};
