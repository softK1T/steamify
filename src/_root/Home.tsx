import React, { useEffect, useState } from "react";
import { IData, IGame, IUserProfile } from "../types/index";
import { fetchData } from "@/lib/steamutils/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import GameCard from "@/components/GameCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortGames } from "@/lib/utils/sorting";

const UserProfileAndGames = () => {
  const [url, setUrl] = useState<string>("");
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [games, setGames] = useState<IGame[]>([]);
  const [displayedGames, setDisplayedGames] = useState<IGame[]>([]); // Holds sorted/displayed games
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [sortCriterion, setSortCriterion] = useState<string>("lastPlayed"); // Default sort criterion
  const [ascending, setAscending] = useState(false);

  const handleSort = () => {
    console.log("Sorting by:", sortCriterion, ascending ? "asc" : "desc");
    const sortedGames = sortGames([...games], sortCriterion, ascending);
    console.log("Sorted games:", sortedGames);
    setDisplayedGames(sortedGames);
  };

  useEffect(() => {
    handleSort();
  }, [sortCriterion, ascending]);

  const handleFetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchData(url);
      if (data) {
        setUserProfile(data.profileData);
        setGames(data.gameData);
        setDisplayedGames(data.gameData);
      } else {
        setError("No data returned from the API.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex-1 justify-center">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Steam profile URL"
          disabled={loading}
          className="mb-2 rounded-full"
        />
        <div className="flex justify-center">
          <Button
            className="rounded-full w-full px-4"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Data"}
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {userProfile && (
        <Card className="mb-2 p-2 rounded">
          <img
            src={userProfile.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <div className="text-center">
            <h3 className="text-lg font-bold">{userProfile.nickname}</h3>
            <p className="text-sm">Steam ID: {userProfile.steamid}</p>
            {userProfile.locstatecode && (
              <p className="text-sm">State: {userProfile.locstatecode}</p>
            )}
            {userProfile.name && (
              <p className="text-sm">Name: {userProfile.name}</p>
            )}
            <a
              href={userProfile.profileurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              Visit Profile
            </a>
          </div>
        </Card>
      )}

      {userProfile && games.length > 0 && (
        <div>
          <div className="flex pb-2 rounded-full">
            <Select
              onValueChange={(e) => setSortCriterion(e)}
              value={sortCriterion}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sorting options" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Option</SelectLabel>
                  <SelectItem value="hoursPlayed">Time played</SelectItem>
                  <SelectItem value="lastPlayed">Last played</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="mx-2 rounded"
              onClick={() => setAscending(!ascending)}
            >
              Toggle Order: {ascending ? "Asc" : "Desc"}
            </Button>
          </div>
          <Card className="bg-card shadow-md rounded-lg px-6 pt-2">
            <h2 className="text-primary font-bold text-lg mb-2">Games List</h2>
            <div className="space-y-2">
              {displayedGames.map((game, index) => (
                <React.Fragment key={index}>
                  <GameCard userprofile={userProfile} game={game}></GameCard>
                </React.Fragment>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserProfileAndGames;
