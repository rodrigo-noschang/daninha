import { CircleMinus, CirclePlus } from "lucide-react";
import { IPlayerLifeLostProps } from "../interfaces/props/PlayerLifeLostProps";
import { useState } from "react";

export function PlayerLifeLost({ player }: IPlayerLifeLostProps) {
  const [playerLifeLost, setPlayerLifeLost] = useState(0);

  function increaseLifeLost() {
    setPlayerLifeLost(playerLifeLost + 1);
    player.livesLost = player.livesLost + 1;
  }

  function decreaseLifeLost() {
    if (playerLifeLost <= 0) return;

    setPlayerLifeLost(playerLifeLost - 1);
    player.livesLost = player.livesLost - 1;
  }

  return (
    <div className="px-3 py-1 rounded-lg bg-content-box-bg flex items-center justify-between mt-3">
      <div>
        <div className="mr-4 text-lg"> {player.name} </div>
      </div>

      <div className="flex gap-2 items-center">
        <div>
          <CircleMinus size={22} onClick={decreaseLifeLost} />
        </div>
        <div className="bg-input-bg rounded-md px-3 py-1 mx-1">
          {playerLifeLost}
        </div>
        <div onClick={increaseLifeLost}>
          <CirclePlus size={22} />
        </div>
      </div>

      <div className="text-placeholder">(fazia {player.currentGuess ?? 0})</div>
    </div>
  );
}
