"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IResultsFormProps } from "../interfaces/props/ResultsFormProps";
import { usePlayersContext } from "@/contexts/players-context";
import { IPlayerDTO } from "../interfaces/entities/PlayersDTO";
import { PlayerLifeLost } from "./PlayerLifeLost";
import { StandardButton } from "./StandardButton";
import { useState } from "react";

export function ResultsForm({ children }: IResultsFormProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const { sortPlayersAccordingToRound, saveLivesLostInRound, nextRound } =
    usePlayersContext();

  const sortedPlayers = [...sortPlayersAccordingToRound()];

  const playersLivesLost: IPlayerDTO[] = sortedPlayers;

  function finishRound() {
    saveLivesLostInRound(playersLivesLost);
    nextRound();

    setOpenDialog(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-main-bg pt-10 overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>
        <div> Quantas vidas as fodatários perderam? </div>

        <div>
          {sortedPlayers.map((player) => (
            <PlayerLifeLost key={player.id} player={player} />
          ))}
        </div>

        <div>
          <StandardButton onClick={finishRound}>Vida que segue</StandardButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
