import { Set, Type } from './card';

// https://boardgamegeek.com/thread/1373087/not-so-random-randomizer

export class Criteria {
  set : Set;
  includeTrains: boolean;
  includeRisingSun: boolean;
  includeCoastalTides: boolean;
  preset: string;

  action : TypeCriterion;
  attack : TypeCriterion;
  railLaying : TypeCriterion;
  stationExpansion: TypeCriterion;
  train : TypeCriterion;
  vp : TypeCriterion;

  // random number generator seed.
  // undefined for standard RNG.
  seed: number;
}

export class TypeCriterion {
  min: number;
  max: number;
  maxEnabled: boolean;
  type: Type;

  constructor(type: Type, min: number, max ?: number) {
    this.type = type;
    this.min = min;
    if (max) {
      this.max = max;
      this.maxEnabled = true;
    }
  }
}