"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usePlayersContext } from "@/contexts/players-context";
import { StandardButton } from "./StandardButton";
import { useState } from "react";

export function FinalOfMatchSummary() {
  const { players, losers, getWinners, startNewGame } = usePlayersContext();

  const [choseToRestart, setChoseToRestart] = useState(false);

  const winners = getWinners();

  const losersIds = losers.map((loser) => loser.id);
  const winnersIds = winners.map((winners) => winners.id);
  const losersAndWinnersIds = [...losersIds, ...winnersIds];

  const restPlayers = players
    .filter((player) => !losersAndWinnersIds.includes(player.id))
    .sort((a, b) => (a?.livesLost ?? 0) - (b?.livesLost ?? 0));

  function handleRestartGame() {
    startNewGame();
    setChoseToRestart(true);
  }

  return (
    <Dialog open={!!losers.length && !choseToRestart}>
      <DialogContent className="bg-main-bg pt-10 overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>

        <div className="text-lg"> Acabou o jogo negrada </div>

        {!!losers.length && (
          <div>
            <div> Perdero </div>
            <div className="flex gap-2">
              {losers.map((loser) => (
                <div
                  key={loser.id}
                  className={"px-4 py-1 border-2 rounded-md  bg-error-red"}
                >
                  {loser.name} - {loser?.livesLost ?? 0}
                </div>
              ))}
            </div>
          </div>
        )}

        {!!winners.length && (
          <div>
            <div> Ganharo </div>
            <div className="flex gap-2">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className={"px-4 py-1 border-2 rounded-md  bg-button-green"}
                >
                  {winner.name} - {winner?.livesLost ?? 0}
                </div>
              ))}
            </div>
          </div>
        )}

        {!!restPlayers.length && (
          <div>
            <div> Restoio </div>
            <div className="flex gap-2">
              {restPlayers.map((player) => (
                <div
                  key={player.id}
                  className={"px-4 py-1 border-2 rounded-md  bg-content-box-bg"}
                >
                  {player.name} - {player.livesLost}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <StandardButton className="w-full" onClick={handleRestartGame}>
            Começar nova partida
          </StandardButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
