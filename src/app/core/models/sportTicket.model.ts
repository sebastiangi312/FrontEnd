export interface SportTicket {
  userId: string;
  betValue: number;
  matchBets: {match: string, scoreBoard: string}[];
}
