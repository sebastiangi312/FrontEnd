export interface Lottery {
  id: string;
  fare: number;
  closingDate: Date;
  firstPrize: number;
  secondPrize: number;
  thirdPrize: number;
  creationDate: number;
  open: boolean;
  firstPrizeWinners: string[];
  secondPrizeWinners: string[];
  thirdPrizeWinners: string[];
  winningNumbers: number[];
}
