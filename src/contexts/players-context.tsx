"use client";

import { IPlayerDTO } from "@/app/interfaces/entities/PlayersDTO";
import {
  clearCookies,
  readFromCookies,
  writeInCookies,
} from "@/utils/cookiesStorage";
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
  saveLivesLostInRound: (players: IPlayerDTO[]) => void;
  nextRound: () => void;
  fullReset: () => void;
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
  saveLivesLostInRound: () => {},
  nextRound: () => {},
  fullReset: () => {},
});

interface IProps {
  children: ReactNode;
}

const TOTAL_CARDS = 40;

export function PlayersContextProvider({ children }: IProps) {
  const storedPlayers: IPlayerDTO[] =
    readFromCookies("LOCAL_STORAGE_PLAYERS_KEY") ?? [];
  const storedChosenPlayer: IPlayerDTO | null =
    readFromCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY") || null;
  const storedCardsCount: number =
    readFromCookies("LOCAL_STORAGE_CURRENT_CARDS") ?? 1;
  const storedGuessesStatus =
    readFromCookies("LOCAL_STORAGE_GUESSES_DONE") ?? false;
  const storedIncreasingCards =
    readFromCookies("LOCAL_STORAGE_INCREASING_CARDS") ?? true;

  const [players, setPlayers] = useState<IPlayerDTO[]>(storedPlayers);
  const [currentDealer, setCurrentDealer] = useState<IPlayerDTO | null>(
    storedChosenPlayer
  );
  const [currentCardsCount, setCurrentCardsCount] =
    useState<number>(storedCardsCount);
  const [everybodyGuessed, setEverybodyGuessed] = useState(storedGuessesStatus);
  const [isIncreasingCards, setIsIncreasingCards] = useState(
    storedIncreasingCards
  );

  const MAX_CARDS_ALLOWED = Math.floor(TOTAL_CARDS / players.length - 1);

  function addPlayer(player: IPlayerDTO) {
    const withNewPlayer = [...players, player];
    setPlayers(withNewPlayer);

    writeInCookies("LOCAL_STORAGE_PLAYERS_KEY", withNewPlayer);
  }

  function chooseDealer(player: IPlayerDTO) {
    setCurrentDealer(player);
    writeInCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY", player);
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

  function saveLivesLostInRound(lostLives: IPlayerDTO[]) {
    setPlayers(lostLives);
  }

  function nextRound() {
    setEverybodyGuessed(false);

    // update dealer
    const currentDealerIndex = players.findIndex((player) => {
      return player.id === currentDealer?.id;
    });
    console.log(
      "🚀 ~ currentDealerIndex ~ currentDealerIndex:",
      currentDealerIndex
    );

    const nextDealerIndex =
      currentDealerIndex >= players.length - 1 ? 0 : currentDealerIndex + 1;

    console.log("next dealer inder - ", nextDealerIndex);
    const nextDealer = players[nextDealerIndex];

    console.log("next dealer - ", nextDealer);

    setCurrentDealer(nextDealer);

    // reset guesses
    const restartedGuesses = players.map((player) => {
      return {
        ...player,
        currentGuess: 0,
      };
    });

    setPlayers(restartedGuesses);

    // update cards amount
    let nextRoundCardsCount;
    let newIsIncreasingCards = isIncreasingCards;

    if (isIncreasingCards) {
      if (currentCardsCount < MAX_CARDS_ALLOWED) {
        setCurrentCardsCount(currentCardsCount + 1);
        nextRoundCardsCount = currentCardsCount + 1;
      } else {
        setCurrentCardsCount(currentCardsCount - 1);
        setIsIncreasingCards(false);
        nextRoundCardsCount = currentCardsCount - 1;
        newIsIncreasingCards = false;
      }
    } else {
      if (currentCardsCount > 1) {
        setCurrentCardsCount(currentCardsCount - 1);
        nextRoundCardsCount = currentCardsCount - 1;
      } else {
        setCurrentCardsCount(currentCardsCount + 1);
        setIsIncreasingCards(true);
        newIsIncreasingCards = true;
        nextRoundCardsCount = currentCardsCount + 1;
      }
    }

    writeInCookies("LOCAL_STORAGE_CURRENT_CARDS", nextRoundCardsCount);
    writeInCookies("LOCAL_STORAGE_GUESSES_DONE", false);
    writeInCookies("LOCAL_STORAGE_CURRENT_DEALER_KEY", nextDealer);
    writeInCookies("LOCAL_STORAGE_PLAYERS_KEY", restartedGuesses);
    writeInCookies("LOCAL_STORAGE_INCREASING_CARDS", newIsIncreasingCards);
  }

  function fullReset() {
    setEverybodyGuessed(false);
    setCurrentDealer(null);
    setPlayers([]);
    setCurrentCardsCount(1);

    clearCookies();
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
        saveLivesLostInRound,
        nextRound,
        fullReset,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayersContext = () => useContext(PlayersContext);
