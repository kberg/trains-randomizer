import { Component, OnInit } from '@angular/core';
import { Type, Card} from '../card';
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

  static parseCriteria(params : URLSearchParams): Criteria {
    var c = new Criteria();
    var decks = params.get("decks");
    if (decks.indexOf("tr") > 0) {
      c.includeTrains = true;
    }
    if (decks.indexOf("rs") > 0) {
      c.includeRisingSun = true;
    }
    if (decks.indexOf("ct") > 0) {
      c.includeCoastalTides = true;
    }    

    function toTC(t: Type, input: String) {
      input = input || "";
      var inputs = input.split(",");
      var c = s => { var i = parseInt(s); return isNaN(i) ? undefined : i;};

      if (inputs.length > 1) {
        return new TypeCriterion(t, c(inputs[0]), c(inputs[1]));
      } else if (inputs.length == 1) {
        return new TypeCriterion(t, c(inputs[0]));
      } else {
        return new TypeCriterion(t, 0);
      }
    }

    c.action = toTC(Type.Action, params.get("a"));
    c.attack = toTC(Type.Attack, params.get("k"));
    c.railLaying = toTC(Type.RailLaying, params.get("r"));
    c.stationExpansion = toTC(Type.StationExpansion, params.get("s"));
    c.train = toTC(Type.Train, params.get("t"));
    c.vp = toTC(Type.VictoryPoints, params.get("v"));

    return c;
  }

  ngOnInit() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
  
    var criteria = CriteriaComponent.defaultCriteria();
    if (params.has("c")) {
      criteria = CriteriaComponent.parseCriteria(params)      
    }

    criteria.seed = parseInt(params.get("seed"));
    this.criteria = criteria;

    this.cards = [];
    this.cards = undefined;
  }

  submit() {
    this.cards = generate(this.criteria);
  }
}
