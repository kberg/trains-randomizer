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

    this.criteria.action = new TypeCriterion(Type.Action, 3);
    this.criteria.attack = new TypeCriterion(Type.Attack, 0);
    this.criteria.train = new TypeCriterion(Type.Train, 2);
    this.criteria.railLaying = new TypeCriterion(Type.RailLaying, 2);
    this.cards = [];
    this.cards = undefined;
  }

  submit() {
    this.cards = generate(this.criteria);
  }
}
