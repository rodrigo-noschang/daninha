"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IRegisterPlayersFormProps } from "../interfaces/props/RegisterPlayersFormProps";

import { v4 as uuidv4 } from "uuid";
import { IPlayerDTO } from "../interfaces/entities/PlayersDTO";
import { useRef, useState } from "react";
import { ChooseFirstPlayer } from "./ChooseFirstPlayer";
import { StandardButton } from "./StandardButton";
import { usePlayersContext } from "@/contexts/players-context";
import { IRankingDTO } from "../interfaces/entities/RankingDTO";
import { readFromCookies, writeInCookies } from "@/utils/cookiesStorage";

export function RegisterPlayersForm({ children }: IRegisterPlayersFormProps) {
  const { players, currentDealer, addPlayer } = usePlayersContext();

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const playerInputRef = useRef<HTMLInputElement>(null);

  function closeBaseModal() {
    setIsDialogOpen(false);
  }

  function handleAddPlayer() {
    setError("");

    if (!playerInputRef.current?.value) return;

    const inputValue = playerInputRef.current?.value.trim().toUpperCase();

    if (!inputValue || inputValue.length > 3) {
      setError("Nome invalido, querido");
      return;
    }

    const playerId = uuidv4() as string;
    const rankingId = uuidv4() as string;

    const newPlayerData: IPlayerDTO = {
      id: playerId,
      name: inputValue,
      livesLost: 0,
      currentGuess: 0,
      isLastWinner: false,
      isLeading: false,
    };

    const newRanking: IRankingDTO = {
      id: rankingId,
      defeats: 0,
      victories: 0,
      totalLivesLost: 0,
      playerId,
      player: newPlayerData,
      lastWinner: false,
    };

    addPlayer(newPlayerData);

    const currentRanking = readFromCookies("LOCAL_STORAGE_RANKING") ?? [];
    writeInCookies("LOCAL_STORAGE_RANKING", [...currentRanking, newRanking]);

    playerInputRef.current.value = "";
    playerInputRef.current.focus();
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        forceMount
        aria-describedby={undefined}
        className="bg-main-bg pt-10 overflow-y-auto"
      >
        <DialogTitle className="hidden"></DialogTitle>

        <div>
          Para uma boa fodância, é essencial saber o nome dos... fodácios 😩😩:
        </div>

        {!!players?.length && (
          <div className="flex gap-5 items-center flex-wrap">
            {players.map((player) => (
              <div
                key={player.id}
                className={`px-5 py-1 rounded-lg ${
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

        <div className="mt-5">
          <label htmlFor="player-name">Nome do fodelão/fodelona</label>

          <div className="mt-2 flex">
            <Input
              id="player-name"
              ref={playerInputRef}
              placeholder="Fodelente"
              autoFocus={false}
              className="rounded-none flex-1 outline-0 border-none bg-input-bg placeholder:text-placeholder"
            />
            <StandardButton onClick={handleAddPlayer} className="rounded-none">
              Botar na roda
            </StandardButton>
          </div>

          {error && (
            <div className="text-error-red text-sm mt-1"> {error} </div>
          )}
        </div>

        <div className="pt-3 mt-5 border-t-1">
          Esses são os fodestinos?
          <ChooseFirstPlayer players={players} closeBaseDialog={closeBaseModal}>
            <StandardButton className="w-full mt-2">
              Começar o titubeio
            </StandardButton>
          </ChooseFirstPlayer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
