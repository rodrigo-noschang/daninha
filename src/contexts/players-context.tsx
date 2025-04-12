"use client";

import { IPlayerDTO } from "@/app/interfaces/entities/PlayersDTO";
import { readFromCookies, writeInCookies } from "@/utils/cookiesStorage";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextValues {
  players: IPlayerDTO[];
  currentDealer: IPlayerDTO | null;

  addPlayer: (player: IPlayerDTO) => void;
  chooseDealer: (player: IPlayerDTO) => void;
}

const PlayersContext = createContext<ContextValues>({
  players: [],
  currentDealer: null,
  addPlayer: () => {},
  chooseDealer: () => {},
});

interface IProps {
  children: ReactNode;
}

export function PlayersContextProvider({ children }: IProps) {
  const storedPlayers: IPlayerDTO[] =
    readFromCookies("LOCAL_STORAGE_PLAYERS_KEY") ?? [];
  const chosenPlayer: IPlayerDTO | null =
    readFromCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY") || null;
  const [players, setPlayers] = useState<IPlayerDTO[]>(storedPlayers);
  const [currentDealer, setCurrentDealer] = useState<IPlayerDTO | null>(
    chosenPlayer
  );

  function addPlayer(player: IPlayerDTO) {
    const withNewPlayer = [...players, player];
    setPlayers(withNewPlayer);

    writeInCookies("LOCAL_STORAGE_PLAYERS_KEY", withNewPlayer);
  }

  function chooseDealer(player: IPlayerDTO) {
    let newDealer: IPlayerDTO | null = player;

    if (player.id === currentDealer?.id) {
      newDealer = null;
    }

    setCurrentDealer(newDealer);
    writeInCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY", newDealer);
  }

  return (
    <PlayersContext.Provider
      value={{ players, currentDealer, addPlayer, chooseDealer }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayersContext = () => useContext(PlayersContext);
