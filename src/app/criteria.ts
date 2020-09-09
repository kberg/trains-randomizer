import { Set } from './card';

// https://boardgamegeek.com/thread/1373087/not-so-random-randomizer

export class Criteria {
  set : Set;
  includeTrains: boolean;
  includeRisingSun: boolean;
  includeCoastalTides: boolean;
  includeAttackCards: boolean;
  preset: string;
  minTrain: number;
  minRailLaying: number;
  minAction: number;
}
