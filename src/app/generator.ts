import { Criteria, TypeCriterion } from "./criteria";
import { CARDS, Set, Type, Card } from "./card";

export function generate(criteria: Criteria) {
  if (!(criteria.includeTrains || criteria.includeRisingSun)) {
    throw new Error("Criteria must include at least one set with base cards.");
  }
  if (criteria.action.min + criteria.railLaying.min + criteria.train.min + criteria.attack.min > 8) {
    throw new Error("Too many card minimums");
  }

  function setPredicate(set: Set) {
    return function(c) { return c.sets.includes(set); }
  }
  
  var falsePredicate = function(c) { return false; };
  
  var trainsPredicate = criteria.includeTrains ? setPredicate(Set.Trains) : falsePredicate;
  var risingSunPredicate = criteria.includeRisingSun ? setPredicate(Set.RisingSun) : falsePredicate;
  var coastalTidesPredicate = criteria.includeCoastalTides ? setPredicate(Set.CoastalTides) : falsePredicate;

  // Start by collecting the base cards. At least one of trains and rising sun sets have to be
  // included. It only prefers the Rising Sun base cards when Trains is not a selected card set.
  // TODO: add criterion that selects the base cards from Rising Sun even when Trains is selected.
  var baseCardsPredicate = criteria.includeTrains ? trainsPredicate : risingSunPredicate;
  var baseCards = CARDS.filter(c => baseCardsPredicate(c) && c.base);

  // candidateCards represent non-base cards, filtered by predicate.
  var candidateCards =
      CARDS
        .filter(c => !c.base)
        .filter(c => (trainsPredicate(c) || risingSunPredicate(c) || coastalTidesPredicate(c)))

  // Finding cards works like this: for each minimum, deal from the top, and deal out
  // that many cards.
  // Afterwards, shuffle once more, and deal out to fill the deck.

  var shuffled = shuffle(candidateCards);
  var randomCards: Card[] = [];

  function choose(c: TypeCriterion) {
    var cardIdx = 0;
    var selectedCount = 0;
    while (selectedCount < c.min && cardIdx < shuffled.length) {
      var card = shuffled[cardIdx];
      if (card.type == c.type) {
        randomCards.push(card);
        shuffled.splice(cardIdx, 1);
        selectedCount++;
      } else {
        cardIdx++;
      }
    }
  }

  // Fill the deck with minimums.
  choose(criteria.action);
  choose(criteria.attack);
  choose(criteria.railLaying);
  choose(criteria.train);

  // roomByType counts down to zero for each available type. Once a count is zero, no more are added.
  var roomByType: Map<Type, Number> = new Map();
  // roomByType[Type.Action] = criteria.maxAction - criteria.minAction;
  // roomByType[Type.Attack] = criteria.attack.max - criteria.attack.min;
  // roomByType[Type.RailLaying] = criteria.maxRailLaying - criteria.minRailLaying;
  // roomByType[Type.Train] = criteria.maxTrain - criteria.minTrain;

  // Fill the rest of the deck with arbitrary cards, respecting maximums
  shuffled = shuffle(shuffled);
  
  // for (var card in shuffled) {
  //   var type = card.type;
  // }
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