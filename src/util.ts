export function retrieveAccessToken() {
  const hash = window.location.href.slice(
    window.location.href.lastIndexOf("#")
  );
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get("access_token");
  return accessToken ?? undefined;
}

const API_BASE = "https://api.spotify.com/v1";
export async function makeApiRequest(
  endpoint: string,
  accessToken: string,
  args = {}
) {
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

export async function getTopTracks(
  accessToken: string,
  timeFrame = "short_term"
) {
  return await makeApiRequest("/me/top/tracks", accessToken, {
    limit: 50,
    time_range: timeFrame,
  });
}

export async function getTopArtists(
  accessToken: string,
  timeFrame = "short_term"
) {
  return await makeApiRequest("/me/top/artists", accessToken, {
    limit: 50,
    time_range: timeFrame,
  });
}
