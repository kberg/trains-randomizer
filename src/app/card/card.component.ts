import { Component, OnInit, Input } from '@angular/core';
import { Card, Set, Type } from '../card';
import { CARDS } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public card: Card;

  constructor() { }

  ngOnInit() {
  }

  cardColor() {
    var c = this.card.type.toString().toLowerCase().replace(/\s/g, "");
    return [ c ];
  }
}
