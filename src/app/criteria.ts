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

  // random number generator seed.
  // undefined for standard RNG.
  seed: number;
}

export class TypeCriterion {
  min: number;
  max: number | undefined;
  type: Type;

  constructor(type: Type, min: number, max?: number | undefined) {
    this.type = type;
    this.min = min;
    this.max = max;
  }
}
