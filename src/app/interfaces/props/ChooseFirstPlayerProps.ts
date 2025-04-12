import { ReactNode } from "react";
import { IPlayerDTO } from "../entities/PlayersDTO";

export interface IChooseFirstPlayerProps {
  children: ReactNode;
  players: IPlayerDTO[];

  closeBaseDialog: () => void;
} 