"use client";

import { IPlayerDTO } from "@/app/interfaces/entities/PlayersDTO";
import { readFromCookies, writeInCookies } from "@/utils/cookiesStorage";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextValues {
  players: IPlayerDTO[];
  currentDealer: IPlayerDTO | null;
  currentCardsCount: number;

  addPlayer: (player: IPlayerDTO) => void;
  chooseDealer: (player: IPlayerDTO) => void;
  defineCardsCount: (count: number) => void;
}

const PlayersContext = createContext<ContextValues>({
  players: [],
  currentDealer: null,
  currentCardsCount: 1,
  addPlayer: () => {},
  chooseDealer: () => {},
  defineCardsCount: () => {},
});

interface IProps {
  children: ReactNode;
}

export function PlayersContextProvider({ children }: IProps) {
  const storedPlayers: IPlayerDTO[] =
    readFromCookies("LOCAL_STORAGE_PLAYERS_KEY") ?? [];
  const storedChosenPlayer: IPlayerDTO | null =
    readFromCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY") || null;
  const storedCardsCount: number =
    readFromCookies("LOCAL_STORAGE_CURRENT_CARDS") ?? 1;

  const [players, setPlayers] = useState<IPlayerDTO[]>(storedPlayers);
  const [currentDealer, setCurrentDealer] = useState<IPlayerDTO | null>(
    storedChosenPlayer
  );
  const [currentCardsCount, setCurrentCardsCount] =
    useState<number>(storedCardsCount);

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

  function defineCardsCount(count: number) {
    setCurrentCardsCount(count);

    writeInCookies("LOCAL_STORAGE_CURRENT_CARDS", count);
  }

  return (
    <PlayersContext.Provider
      value={{
        players,
        currentDealer,
        currentCardsCount,
        addPlayer,
        chooseDealer,
        defineCardsCount,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayersContext = () => useContext(PlayersContext);
