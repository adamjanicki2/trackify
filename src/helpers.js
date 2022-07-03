export function retrieveAccessToken() {
  const hash = window.location.href.slice(
    window.location.href.lastIndexOf("#")
  );
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  return accessToken ?? undefined;
}

const API_BASE = "https://api.spotify.com/v1";
export async function makeApiRequest(endpoint, accessToken, args = {}) {
  const res = await fetch(
    `${API_BASE}${endpoint}?${new URLSearchParams(args)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await res.json();
}

/**
 *
 * @param {string} accessToken
 * @param {"short_term" | "medium_term" | "long_term"} timeFrame
 * @returns
 */
export async function getTopTracks(accessToken, timeFrame = "short_term") {
  return await makeApiRequest("/me/top/tracks", accessToken, {
    limit: 50,
    time_range: timeFrame,
  });
}

/**
 *
 * @param {string} accessToken
 * @param {"short_term" | "medium_term" | "long_term"} timeFrame
 * @returns
 */
export async function getTopArtists(accessToken, timeFrame = "short_term") {
  return await makeApiRequest("/me/top/artists", accessToken, {
    limit: 50,
    time_range: timeFrame,
  });
}
