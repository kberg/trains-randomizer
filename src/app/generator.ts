import { Criteria } from "./criteria";
import { CARDS, Set, Type, Card } from "./card";

export function generate(criteria: Criteria) {
  if (!(criteria.includeTrains || criteria.includeRisingSun)) {
    throw new Error("Criteria must include at least one set.");
  }
  if (criteria.minAction + criteria.minRailLaying + criteria.minTrain > 8) {
    throw new Error("Too many card minimums");
  }

  function setPredicate(set: Set) {
    return function(c) { return c.sets.includes(set); }
  }
  
  var trainsPredicate = setPredicate(Set.Trains);
  var risingSunPredicate = setPredicate(Set.RisingSun);
  // Assume Trains base for now.
  var baseCards = CARDS.filter(c => trainsPredicate(c) && c.base);
  var candidateCards =
      CARDS
        .filter(c => !c.base)
        .filter(c => (criteria.includeTrains && trainsPredicate(c)) ||
             (criteria.includeRisingSun && risingSunPredicate(c)));

  // Finding cards works like this: for each minimum, deal from the top, and deal out
  // that many cards.
  // Afterwards, shuffle once more, and deal out to fill the deck.

  var shuffled = shuffle(candidateCards);
  var randomCards: Card[] = [];

  function choose(count: number, type: Type) {
    var cardIdx = 0;
    var selectedCount = 0;
    while (selectedCount < count && cardIdx < shuffled.length) {
      var card = shuffled[cardIdx];
      if (card.type == type) {
        randomCards.push(card);
        shuffled.splice(cardIdx, 1);
        selectedCount++;
      } else {
        cardIdx++;
      }
    }  
  }

  choose(criteria.minAction, Type.Action);
  choose(criteria.minRailLaying, Type.RailLaying);
  choose(criteria.minTrain, Type.Train);

  shuffled = shuffle(shuffled);
  for (var idx = randomCards.length; idx < 8; idx++) {
     randomCards.push(shuffled[idx]);
  }
  return baseCards.concat(randomCards);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}