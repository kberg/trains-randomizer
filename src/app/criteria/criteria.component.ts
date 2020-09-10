import { Component, OnInit } from '@angular/core';
import { Set, Type, Card} from '../card';
import { Criteria, TypeCriterion } from '../criteria';
import { generate } from '../generator';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  criteria: Criteria;
  cards: Card[];

  constructor() { }

  // https://boardgamegeek.com/thread/1373087/not-so-random-randomizer

  ngOnInit() {
    this.criteria = new Criteria();
    this.criteria.includeTrains = true;

    this.criteria.action = new TypeCriterion(Type.Action, 3, 4);
    this.criteria.attack = new TypeCriterion(Type.Attack, 0);
    this.criteria.railLaying = new TypeCriterion(Type.RailLaying, 2, 3);
    this.criteria.stationExpansion = new TypeCriterion(Type.StationExpansion, 0, 1);
    this.criteria.train = new TypeCriterion(Type.Train, 2, 3);
    this.criteria.vp = new TypeCriterion(Type.VictoryPoints, 0);
    this.cards = [];
    this.cards = undefined;
  }

  submit() {
    this.cards = generate(this.criteria);
  }
}
