"use client";

import { usePlayersContext } from "@/contexts/players-context";
import { StandardButton } from "./StandardButton";
import { RegisterGuessesForm } from "./RegisterGuessesForm";

export function PlayersGuesses() {
  const {
    currentDealer,
    currentCardsCount,
    everybodyGuessed,
    losers,
    sortPlayersAccordingToRound,
  } = usePlayersContext();

  const sortedPlayers = sortPlayersAccordingToRound();

  return (
    <div className="mt-8 pt-5 border-t-2 border-main-border">
      <div>Palpites da... rodada 😩😩</div>

      <div className="mt-5 bg-main-bg p-2 border-2 border-main-border rounded-lg">
        <span>{currentDealer?.name} dá as cartas - </span>
        <span>{currentCardsCount}, por gentileza</span>
      </div>

      <div className="mt-5">
        <RegisterGuessesForm>
          <StandardButton className="w-full" disabled={!!losers.length}>
            Registrar os palpites 🤔
          </StandardButton>
        </RegisterGuessesForm>
      </div>

      {everybodyGuessed && (
        <div className="flex flex-wrap gap-3 mt-6">
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              className="px-3 py-1 rounded-lg bg-content-box-bg flex items-center justify-between w-[100px]"
            >
              <div>
                <div className="mr-4 text-lg"> {player.name} </div>
              </div>

              <div className="bg-input-bg rounded-md px-3 py-1 mx-1">
                {player.currentGuess}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
