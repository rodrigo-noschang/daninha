"use client";

import { usePlayersContext } from "@/contexts/players-context";

export function PlayersListWithLives() {
  const { players, currentDealer } = usePlayersContext();

  return (
    <div className="mt-10 border-1 border-main-border rounded-lg p-4 bg-main-bg">
      <div>Vida dos... fodelões 😩</div>

      <div className="mt-4 flex gap-6 flex-wrap">
        {players.map((player) => (
          <div
            key={player.id}
            className={`px-4 py-1 border-2 rounded-md ${
              currentDealer?.id === player.id
                ? "border-button-green-hover"
                : "border-main-border"
            }`}
          >
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
