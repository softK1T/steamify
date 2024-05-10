export type IGame = {
  name: string;
  appid: number;
  img_icon_url: string;
  playtime_forever: number;
  rtime_last_played: string;
  has_community_visible_stats: boolean;
};

export type IUserProfile = {
  nickname: string;
  avatar: string;
  name: string;
  locstatecode?: string;
  profileurl: string;
  steamid: number;
  timecreated: number;
};

export interface IData {
  profileData: IUserProfile;
  gameData: IGame[];
}

export interface IGameStatsData {
  playerstats: {
    stats: { name: string; value: number }[];
    achievements: { name: string; achieved: number }[];
  };
  currentonline: number;
}

export interface IGameStatsError {
  error: string;
}
