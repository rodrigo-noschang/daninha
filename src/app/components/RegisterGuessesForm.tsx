"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IRegisterGuessesFormProps } from "../interfaces/props/RegisterGuessesFormProps";
import { usePlayersContext } from "@/contexts/players-context";
import { StandardButton } from "./StandardButton";
import { SinglePlayerGuess } from "./SinglePlayerGuess";

export function RegisterGuessesForm({ children }: IRegisterGuessesFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    finishGuesses,
    sortPlayersAccordingToRound,
    players,
    currentCardsCount,
  } = usePlayersContext();

  const sortedPlayers = sortPlayersAccordingToRound();
  const totalGuesses = players.reduce((acc, player) => {
    return acc + (player.currentGuess ?? 0);
  }, 0);

  function handleFinishGuesses() {
    if (totalGuesses === currentCardsCount) {
      setError("Não posso permitir isso 😔");
      return;
    }

    finishGuesses();
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-main-bg pt-10 overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>

        <div>
          <div>Digam-me, fodigários, quantas creem que fazem?</div>

          <div className="mt-5 flex flex-col">
            {sortedPlayers.map((player) => (
              <SinglePlayerGuess key={player.id} player={player} />
            ))}
          </div>

          <div className="mt-5">
            Os fodeníceos fazem <b>{totalGuesses}</b> de {currentCardsCount}
          </div>

          <StandardButton className="w-full mt-2" onClick={handleFinishGuesses}>
            A sorte está lançada
          </StandardButton>

          {error && (
            <div className="mt-1 text-sm text-error-red"> {error} </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
