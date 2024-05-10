import { IUserProfile, IGame, IData, IGameStatsData } from "../../types";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

async function fetchId(url: string): Promise<string | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetchId`, {
      params: { url: url },
    });
    console.log("ID: " + response.data);
    return response.data; // Handle the data as needed for your frontend
  } catch (error) {
    console.error("Failed to fetch Steam ID:", error);
    throw error;
  }
}

async function fetchProfile(id: string): Promise<IUserProfile> {
  const { data } = await axios.get(`${API_BASE_URL}/fetchProfile`, {
    params: { id: id },
  });
  console.log("Profile Data: ");
  console.log(data);
  const profileData: IUserProfile = data;
  return profileData;
}

async function fetchGames(id: string): Promise<IGame[]> {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/fetchGames`, {
      params: { id: id },
    });
    if (!data) {
      console.error("Games data is missing from the response");
      return [];
    }
    const games: IGame[] = data;

    const sortedGamesDesc: IGame[] = games.sort(
      (a, b) => b.playtime_forever - a.playtime_forever
    );
    return sortedGamesDesc;
  } catch (error) {
    console.error("Failed to fetch games: ", error);
    return [];
  }
}

export async function fetchData(url: string): Promise<IData | null> {
  let id;
  if (url.includes("/profiles/")) {
    const match = /\/profiles\/(\d+)/.exec(url);
    if (match) {
      id = match[1];
    }
  } else {
    id = await fetchId(url);
  }

  if (!id) {
    console.log("Steam ID could not be fetched.");
    return null;
  }

  const profileData = await fetchProfile(id);
  console.log(profileData);
  const gameData = await fetchGames(id);
  const resultData: IData = { profileData, gameData };

  console.log(resultData);
  return resultData;
}

export async function fetchGameStats(
  steamid: number,
  appid: number
): Promise<IGameStatsData | null> {
  if (!steamid || !appid) {
    console.log("Steam ID could not be fetched.");
    return null;
  }
  const { data } = await axios.get(`${API_BASE_URL}/fetchGameStats`, {
    params: { steamid: steamid, appid: appid },
  });
  console.log("Game Stats: ");
  console.log(data);
  const gameStats: IGameStatsData = data;

  console.log(gameStats);
  return gameStats;
}
