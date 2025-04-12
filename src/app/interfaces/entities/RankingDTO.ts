import { IPlayerDTO } from "./PlayersDTO";

export interface IRankingDTO {
  id: string;
  playerId: string;
  victories: number;
  defeats: number;
  totalLivesLost: number;
  lastWinner: boolean;
  player: IPlayerDTO;
}