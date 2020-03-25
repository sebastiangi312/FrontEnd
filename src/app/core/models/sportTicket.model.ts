export interface SportTicket {
  id: string;
  userId: string;
  betValue: number;
  matchBets: { match: string, scoreBoard: string }[];
  isWinner: boolean;
  profit: number;
  closingDate: Date;
}
