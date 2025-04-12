"use client";

import { usePlayersContext } from "@/contexts/players-context";
import { StandardButton } from "./StandardButton";

export function PlayersGuesses() {
  const { currentDealer, currentCardsCount } = usePlayersContext();

  return (
    <div className="mt-8 pt-5 border-t-2 border-main-border">
      <div>Palpites da... rodada 😩😩</div>

      <div className="mt-5 bg-main-bg p-2 border-2 border-main-border rounded-lg">
        <span>{currentDealer?.name} dá as cartas - </span>
        <span>{currentCardsCount}, por gentileza</span>
      </div>

      <div className="mt-5">
        <StandardButton className="w-full">
          Registrar os palpites 🤔
        </StandardButton>
      </div>
    </div>
  );
}
