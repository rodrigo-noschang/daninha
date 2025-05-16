export interface IPlayerDTO {
  id: string
  name: string;
  livesLost: number;
  currentGuess: number;
  isLastWinner: boolean;
  isLeading?: boolean;
}