"use client";

import { IPlayerDTO } from "@/app/interfaces/entities/PlayersDTO";
import { readFromCookies, writeInCookies } from "@/utils/cookiesStorage";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextValues {
  players: IPlayerDTO[];
  currentDealer: IPlayerDTO | null;
  currentCardsCount: number;
  everybodyGuessed: boolean;

  addPlayer: (player: IPlayerDTO) => void;
  chooseDealer: (player: IPlayerDTO) => void;
  defineCardsCount: (count: number) => void;
  setPlayerCurrentGuest: (playerId: string, guess: number) => void;
  finishGuesses: () => void;
  sortPlayersAccordingToRound: () => IPlayerDTO[];
}

const PlayersContext = createContext<ContextValues>({
  players: [],
  currentDealer: null,
  currentCardsCount: 1,
  everybodyGuessed: false,
  addPlayer: () => {},
  chooseDealer: () => {},
  defineCardsCount: () => {},
  setPlayerCurrentGuest: () => {},
  finishGuesses: () => {},
  sortPlayersAccordingToRound: () => [],
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
  const storedGuessesStatus =
    readFromCookies("LOCAL_STORAGE_GUESSES_DONE") ?? false;

  const [players, setPlayers] = useState<IPlayerDTO[]>(storedPlayers);
  const [currentDealer, setCurrentDealer] = useState<IPlayerDTO | null>(
    storedChosenPlayer
  );
  const [currentCardsCount, setCurrentCardsCount] =
    useState<number>(storedCardsCount);
  const [everybodyGuessed, setEverybodyGuessed] = useState(storedGuessesStatus);

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

  function setPlayerCurrentGuest(playerId: string, guess: number) {
    const playerGuessing = players.find((player) => player.id === playerId);

    if (!playerGuessing) return;

    playerGuessing.currentGuess = guess;

    setPlayers([...players]);
    writeInCookies("LOCAL_STORAGE_PLAYERS_KEY", players);
  }

  function finishGuesses() {
    writeInCookies("LOCAL_STORAGE_GUESSES_DONE", true);

    setEverybodyGuessed(true);
  }

  function sortPlayersAccordingToRound(): IPlayerDTO[] {
    const currentDealerIndex = players.findIndex(
      (player) => player.id === currentDealer?.id
    );

    const firstPlayerIndex =
      currentDealerIndex >= players.length ? 0 : currentDealerIndex + 1;

    const firstPlayers = players.slice(firstPlayerIndex);
    const restOfLine = players.slice(0, firstPlayerIndex);

    const sortedPlayers = [...firstPlayers, ...restOfLine];
    return sortedPlayers;
  }

  return (
    <PlayersContext.Provider
      value={{
        players,
        currentDealer,
        currentCardsCount,
        everybodyGuessed,
        addPlayer,
        chooseDealer,
        defineCardsCount,
        setPlayerCurrentGuest,
        finishGuesses,
        sortPlayersAccordingToRound,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayersContext = () => useContext(PlayersContext);
