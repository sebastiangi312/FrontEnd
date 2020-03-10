import { Match } from './match.model';

export interface Sport {

  sportBetId: string;
  matches: [Match];
}
