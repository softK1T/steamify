import React from "react";
import { IGame } from "../types/index";
import { Separator } from "@radix-ui/react-separator";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const GameCard = ({ userprofile, game }: { userprofile: any; game: IGame }) => {
  const openStatsPage = (userid: number, appid: number) => {
    window.open(`/stats/${userid}/${appid}`, "_blank");
  };

  return (
    <Card>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <img
            src={game.img_icon_url}
            alt={game.name}
            className="w-24 h-18 rounded"
          />
          <div>
            <p className="text-lg font-semibold text-primary">{game.name}</p>
            <p className="text-md text-gray-600">
              Playtime: {Math.round((game.playtime_forever / 60) * 10) / 10}{" "}
              hours
            </p>
            <p className="text-sm text-gray-600"> AppID: {game.appid}</p>
          </div>
        </div>
        <div>
          <p>Last played: {game.rtime_last_played}</p>
        </div>
        <div>
          {" "}
          <Button
            className="rounded"
            onClick={() => openStatsPage(userprofile.steamid, game.appid)}
          >
            See stats
          </Button>
        </div>
      </div>
      <Separator />
    </Card>
  );
};

export default GameCard;
