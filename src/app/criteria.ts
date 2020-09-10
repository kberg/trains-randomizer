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
  train : TypeCriterion;
}

export class TypeCriterion {
  min: number;
  max: number;
  maxEnabled: boolean;
  type: Type;

  constructor(type: Type, min ?: number) {
    this.type = type;
    this.min = min;
  }
}