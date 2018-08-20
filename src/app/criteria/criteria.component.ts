import { Component, OnInit } from '@angular/core';
import { Set, Type, Card} from '../card';
import { Criteria } from '../criteria';
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
    this.criteria.minAction = 3;
    this.criteria.minRailLaying = 2;
    this.criteria.minTrain = 2;
    this.criteria.includeTrains = true;
    this.cards = [];
  }

  submit() {
    this.cards = generate(this.criteria);
  }
}
