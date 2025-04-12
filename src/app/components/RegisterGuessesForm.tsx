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

  const { finishGuesses, sortPlayersAccordingToRound } = usePlayersContext();

  function handleFinishGuesses() {
    finishGuesses();
    setDialogOpen(false);
  }

  const sortedPlayers = sortPlayersAccordingToRound();

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

          <div className="mt-5">Os fodeníceos fazem 2 de 3</div>

          <StandardButton className="w-full mt-2" onClick={handleFinishGuesses}>
            A sorte está lançada
          </StandardButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
