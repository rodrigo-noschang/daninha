"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IChooseFirstPlayerProps } from "../interfaces/props/ChooseFirstPlayerProps";
import { useState } from "react";
import { StandardButton } from "./StandardButton";
import { usePlayersContext } from "@/contexts/players-context";

export function ChooseFirstPlayer({
  children,
  players,
  closeBaseDialog,
}: IChooseFirstPlayerProps) {
  const { currentDealer, chooseDealer } = usePlayersContext();

  const [error, setError] = useState("");

  function returnHome() {
    if (currentDealer) {
      closeBaseDialog();
    } else {
      setError("Escolha alguém para começar dando as cartas!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent aria-describedby={undefined} className="bg-main-bg pt-10">
        <DialogTitle className="hidden"></DialogTitle>

        <div>
          <div>
            Quem será o primeiro a distribuir as cartas? Pobre bastardo...
          </div>

          {!!players?.length && (
            <div className="flex gap-5 items-center flex-wrap mt-6">
              {players.map((player) => (
                <div
                  onClick={() => chooseDealer(player)}
                  key={player.id}
                  className={`
                    px-5 py-1 rounded-lg border-2
                    ${
                      player.id === currentDealer?.id
                        ? "bg-selected-player-green border-button-green-hover"
                        : "bg-content-box-bg border-transparent"
                    }`}
                >
                  {player.name}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <StandardButton onClick={returnHome} className="w-full">
              Comecemos então
            </StandardButton>

            {error && !currentDealer && (
              <div className="text-error-red text-sm mt-1"> {error} </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
