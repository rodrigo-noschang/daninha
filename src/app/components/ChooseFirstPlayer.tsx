import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IChooseFirstPlayerProps } from "../interfaces/props/ChooseFirstPlayerProps";
import { useState } from "react";
import { IPlayerDTO } from "../interfaces/entities/PlayersDTO";
import { StandardButton } from "./StandardButton";
import { writeInLocalStorage } from "@/utils/localStorageShorthands";

export function ChooseFirstPlayer({
  children,
  players,
  closeBaseDialog,
}: IChooseFirstPlayerProps) {
  const [chosenPlayer, setChosenPlayer] = useState<IPlayerDTO | null>(null);
  const [error, setError] = useState("");

  function selectCurrentDealer(player: IPlayerDTO) {
    if (!player) return;

    setChosenPlayer(player);

    writeInLocalStorage("LOCAL_STORAGE_CURRENT_DEALER_KEY", player);
  }

  function returnHome() {
    if (chosenPlayer) {
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
                  onClick={() => selectCurrentDealer(player)}
                  key={player.id}
                  className={`
                    px-5 py-1 rounded-lg border-2
                    ${
                      player.id === chosenPlayer?.id
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

            {error && !chosenPlayer && (
              <div className="text-error-red text-sm mt-1"> {error} </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
