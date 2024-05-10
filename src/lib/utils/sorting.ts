import { IGame } from "@/types";

export const sortGames = (
  games: IGame[],
  criterion: string,
  ascending = true
): IGame[] => {
  switch (criterion) {
    case "lastPlayed":
      games.sort((a, b) =>
        ascending
          ? new Date(a.rtime_last_played.replace(" at", "")).getTime() -
            new Date(b.rtime_last_played.replace(" at", "")).getTime()
          : new Date(b.rtime_last_played.replace(" at", "")).getTime() -
            new Date(a.rtime_last_played.replace(" at", "")).getTime()
      );
      break;
    case "hoursPlayed":
      games.sort((a, b) =>
        ascending
          ? a.playtime_forever - b.playtime_forever
          : b.playtime_forever - a.playtime_forever
      );
      break;
    case "name":
      games.sort((a, b) =>
        ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      break;
  }
  return games;
};
