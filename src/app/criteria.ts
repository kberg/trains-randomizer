import { Set, Type } from './card';

// https://boardgamegeek.com/thread/1373087/not-so-random-randomizer

export type Criteria = {
  set?: Set;
  includeTrains: boolean;
  includeRisingSun: boolean;
  includeCoastalTides: boolean;
  preset: string;

  action: TypeCriterion;
  attack: TypeCriterion;
  railLaying: TypeCriterion;
  stationExpansion: TypeCriterion;
  train: TypeCriterion;
  vp: TypeCriterion;

  // Card IDs (e.g. "TR05", "RS12") to exclude from random draws.
  // The UI enforces that base cards never appear here, and that VP
  // cards never appear here when only one expansion is selected.
  bannedCards: string[];

  // random number generator seed.
  // undefined for standard RNG.
  seed: number;
}

export type TypeCriterion = {
  type: Type;
  min: number;
  max: number | undefined;
}
