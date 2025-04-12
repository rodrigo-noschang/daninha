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
import {
  readFromLocalStorage,
  writeInLocalStorage,
} from "@/utils/localStorageShorthands";

export function RegisterPlayersForm({ children }: IRegisterPlayersFormProps) {
  const storedPlayers = readFromLocalStorage("LOCAL_STORAGE_PLAYERS_KEY");

  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [players, setPlayers] = useState<IPlayerDTO[]>(storedPlayers);

  const playerInputRef = useRef<HTMLInputElement>(null);

  function closeBaseModal() {
    setIsDialogOpen(false);
  }

  function addPlayer() {
    setError("");

    if (!playerInputRef.current?.value) return;

    const inputValue = playerInputRef.current?.value.trim().toUpperCase();

    if (!inputValue || inputValue.length > 3) {
      setError("Nome invalido, querido");
      return;
    }

    const id = uuidv4() as string;
    const newPlayerData: IPlayerDTO = {
      id,
      name: inputValue,
    };

    const allPlayers = [...players, newPlayerData];

    writeInLocalStorage("LOCAL_STORAGE_PLAYERS_KEY", players);

    setPlayers(allPlayers);

    playerInputRef.current.value = "";
    playerInputRef.current.focus();
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent aria-describedby={undefined} className="bg-main-bg pt-10">
        <DialogTitle className="hidden"></DialogTitle>

        <div>
          Para uma boa fodância, é essencial saber o nome dos... fodácios 😩😩:
        </div>

        {!!players?.length && (
          <div className="flex gap-5 items-center flex-wrap">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-content-box-bg px-5 py-1 rounded-lg"
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
            <StandardButton onClick={addPlayer} className="rounded-none">
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
