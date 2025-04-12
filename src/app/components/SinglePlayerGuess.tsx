"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import { ISinglePlayerGuessProps } from "../interfaces/props/SinglePlayerGuessProps";
import { useState } from "react";
import { usePlayersContext } from "@/contexts/players-context";

export function SinglePlayerGuess({ player }: ISinglePlayerGuessProps) {
  const { currentCardsCount, setPlayerCurrentGuest } = usePlayersContext();

  const [guessCounter, setGuessCounter] = useState(player.currentGuess);

  function increaseGuess() {
    if (guessCounter < currentCardsCount) {
      setGuessCounter(guessCounter + 1);
      setPlayerCurrentGuest(player.id, guessCounter + 1);
    }
  }

  function decreaseGuess() {
    if (guessCounter > 0) {
      setGuessCounter(guessCounter - 1);
      setPlayerCurrentGuest(player.id, guessCounter - 1);
    }
  }

  return (
    <div className="px-3 py-1 rounded-lg bg-content-box-bg flex items-center justify-between w-[160px] mt-3">
      <div>
        <div className="mr-4 text-lg"> {player.name} </div>
      </div>

      <div className="flex gap-2 items-center">
        <div onClick={decreaseGuess}>
          <CircleMinus size={22} />
        </div>
        <div className="bg-input-bg rounded-md px-3 py-1 mx-1">
          {guessCounter}
        </div>
        <div onClick={increaseGuess}>
          <CirclePlus size={22} />
        </div>
      </div>
    </div>
  );
}
