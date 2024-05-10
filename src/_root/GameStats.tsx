import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IGameStatsData, IGameStatsError } from "@/types";
import { fetchGameStats } from "@/lib/steamutils/api";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

const GameStats = () => {
  const { steamid, appid } = useParams<{ steamid: any; appid: any }>();
  const [stats, setStats] = useState<IGameStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchGameStats(steamid, appid);
        console.log(data);
        if (data) {
          setStats(data);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError((err.response.data as IGameStatsError).error);
        } else {
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [appid, steamid]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  if (error)
    return <div className="text-red-600 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {stats && stats.currentonline && (
        <h1 className="text-3xl">
          {" "}
          Current online: {stats.currentonline} players
        </h1>
      )}
      <h1 className="text-xl font-bold text-center mb-4">
        Game Stats and Achievements for AppID: {appid}
      </h1>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h1 className="text-3xl">Stats</h1>
          <CollapsibleTrigger asChild>
            <Button size="sm" className="w-9 p-0 rounded">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats &&
              stats.playerstats.stats &&
              stats.playerstats.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="p-4 bg-gray-800 text-white rounded shadow"
                >
                  <h2 className="font-semibold">{stat.name}</h2>
                  <p>{stat.value}</p>
                </div>
              ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <h2 className="text-lg font-bold text-center mt-6 mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats &&
          stats.playerstats.achievements &&
          stats.playerstats.achievements.map((ach) => (
            <div
              key={ach.name}
              className="p-4 bg-blue-700 text-white rounded shadow"
            >
              <h2 className="font-semibold">{ach.name}</h2>
              <p>Achieved: {ach.achieved ? "Yes" : "No"}</p>
              {/* {ach.achieved ? (
                <p>
                  Unlock Time:{" "}
                  {new Date(ach.unlocktime * 1000).toLocaleDateString()}
                </p>
              ) : null} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameStats;
