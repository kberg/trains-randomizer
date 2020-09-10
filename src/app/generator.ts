import { Criteria, TypeCriterion } from "./criteria";
import { CARDS, Set, Type, Card } from "./card";
import { RNG, Random2 } from "./random";

var ADDITIONAL_CARDS_SIZE = 8;

export function generate(criteria: Criteria) {
  var rng = criteria.seed ? Random2.seeded(criteria.seed) : Random2.seeded(Math.round(Random2.unseeded().next() * 10000000));
  if (!(criteria.includeTrains || criteria.includeRisingSun)) {
    throw new Error("Criteria must include at least one set with base cards.");
  }

  var criteriaMap: Map<Type, TypeCriterion> = new Map();
  criteriaMap.set(Type.Action, criteria.action);
  criteriaMap.set(Type.Attack, criteria.attack);
  criteriaMap.set(Type.RailLaying, criteria.railLaying);
  criteriaMap.set(Type.StationExpansion, criteria.stationExpansion);
  criteriaMap.set(Type.Train, criteria.train);
  criteriaMap.set(Type.VictoryPoints, criteria.vp);

  let totalMinimums: number = 0;
  criteriaMap.forEach(v => totalMinimums += v.min);

  if (totalMinimums > ADDITIONAL_CARDS_SIZE) {
    throw new Error("Too many card minimums: " + totalMinimums + " can't be more than " + ADDITIONAL_CARDS_SIZE);
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

  var shuffled = shuffle(candidateCards, rng);
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
  criteriaMap.forEach(v => choose(v));

  // limitByType counts down to zero for each available type. Once a count is zero, no more are added.
  // So if maxEnabled is false, the max is 100, effectively infinity.
  var limitByType: Map<Type, Number> = new Map();
  criteriaMap.forEach((v, k) => limitByType.set(k, v.maxEnabled ? v.max - v.min : 100));

  // Fill the rest of the deck with arbitrary cards, respecting maximums
  shuffled = shuffle(shuffled, rng);
  
  var cardIdx = 0;
  while (randomCards.length < ADDITIONAL_CARDS_SIZE && cardIdx < shuffled.length) {
    var card = shuffled[cardIdx];
    var type = card.type;
    if (limitByType[type] > 0) {
      randomCards.push(card);
      shuffled.splice(cardIdx, 1);
      limitByType[type]--;
    } else {
      cardIdx++;
    }
  }

  console.log("Pending total: " + randomCards.length);
  for (var idx = 0; randomCards.length < ADDITIONAL_CARDS_SIZE; idx++) {
     randomCards.push(shuffled[idx]);
  }

  return baseCards.concat(randomCards);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array, rng: RNG) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(rng.next() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}