const BASE_URL = "https://pixabay.com/api/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

// Fetches from the images endpoint, or the videos endpoint when isVideo is true.
// Returns the full response ({ total, totalHits, hits }) so pagination can use it later.
export const fetchPixabay = async ({
  isVideo = false,
  params = {},
  signal,
}) => {
  const url = new URL(isVideo ? "videos/" : "", BASE_URL);
  url.search = new URLSearchParams({ key: API_KEY, ...params }).toString();

  const response = await fetch(url, { signal });

  if (!response.ok) {
    // Pixabay answers 429 when the rate limit is reached.
    throw new Error(
      response.status === 429
        ? "Too many requests. Please wait a moment and try again."
        : "Could not load results from Pixabay.",
    );
  }

  return response.json();
};
