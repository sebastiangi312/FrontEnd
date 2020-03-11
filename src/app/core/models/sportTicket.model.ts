import { Match } from './match.model';

export interface SportTicket {
  userId: string;
  sportId: string;
  matches: Match[];
  betMoney: number;
}
