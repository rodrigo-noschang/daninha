"use client";

import { usePlayersContext } from "@/contexts/players-context";
import { Crown } from "lucide-react";

export function PlayersListWithLives() {
  const { players, currentDealer } = usePlayersContext();

  return (
    <div className="mt-10 border-1 border-main-border rounded-lg p-4 bg-main-bg">
      <div>Vida dos... fodelões 😩</div>

      <div className="mt-4 flex gap-6 flex-wrap">
        {players.map((player) => (
          <div
            key={player.id}
            className={`px-4 py-1 border-2 rounded-md relative ${
              player?.isLastWinner
                ? "border-winner-border"
                : currentDealer?.id === player.id
                ? "border-button-green-hover"
                : "border-main-border"
            }`}
          >
            {player.isLastWinner && (
              <Crown
                size={16}
                color="#ffd700"
                className="absolute top-[-18px] left-[50%] translate-x-[-50%]"
              />
            )}
            {player.name} - {player?.livesLost ?? 0}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm">
        Belos participantes. Essa fodinha está ficando deveras interessante hein
        😩
      </div>
    </div>
  );
}
