import { Component, OnInit } from '@angular/core';
import { Type, Card} from '../card';
import { Criteria, TypeCriterion } from '../criteria';
import { generate } from '../generator';
import { Random2 } from '../random';
import { Parameters } from './parameters';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  criteria: Criteria;
  cards: Card[];
  repeatable_param: string

  constructor() {
  }

  // https://boardgamegeek.com/thread/1373087/not-so-random-randomizer

  static defaultCriteria() : Criteria {
    var c = new Criteria();
    c.includeTrains = true;

    c.action = new TypeCriterion(Type.Action, 3, 4);
    c.attack = new TypeCriterion(Type.Attack, 0);
    c.railLaying = new TypeCriterion(Type.RailLaying, 2, 3);
    c.stationExpansion = new TypeCriterion(Type.StationExpansion, 0, 1);
    c.train = new TypeCriterion(Type.Train, 2, 3);
    c.vp = new TypeCriterion(Type.VictoryPoints, 0);

    return c;
  }

  ngOnInit() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
  
    var criteria = CriteriaComponent.defaultCriteria();
    if (params.has("c")) {
      criteria = Parameters.toCriteria(params);   
    }

    criteria.seed = parseInt(params.get("seed"));
    this.criteria = criteria;

    this.cards = [];
    this.cards = undefined;
  }

  submit() {
    var criteria = this.criteria;
    var seed = criteria.seed ? criteria.seed : Math.round(Math.random() * 10000000);
    var rng = Random2.seeded(seed)

    this.cards = generate(this.criteria, rng);
    this.repeatable_param = Parameters.fromCriteria(this.criteria, seed).toString();
  }
}
