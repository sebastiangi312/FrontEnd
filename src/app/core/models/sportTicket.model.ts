import { MatchBet } from './matchBet.model';

export interface SportTicket {
  userId: string;
  betValue: number;
  matchBets: MatchBet[];
}
