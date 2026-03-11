export enum Set {
  Trains = "tr",
  RisingSun = "rs",
  CoastalTides = "ct"
}

export const Types = ["Train", "Action", "Attack", "Rail Laying", "Station Expansion", "Victory Points", "Waste"] as const;
export type Type = typeof Types[number];

export class Card {
  name: string;
  type: Type;
  sets: Set[];
  // When true, this is one of the base cards included in all sets.
  base?: boolean;

  constructor(name: string, type: Type, sets: Set[], base?: boolean) {
    this.name = name;
    this.type = type;
    this.sets = sets;
    this.base = base;
  }

  withBase() {
    return new Card(this.name, this.type, this.sets, true);
  }
}

export const CARDS: Card[] = [
  new Card("Amusement Park",       "Action",           [Set.Trains]),
  new Card("Apartment",            "Victory Points",    [Set.Trains]).withBase(),
  new Card("Banker",               "Action",           [Set.CoastalTides]),
  new Card("Barge Terminal",       "Victory Points",    [Set.CoastalTides]),
  new Card("BioFuel Train",        "Train",            [Set.RisingSun]),
  new Card("Building Boom",        "Station Expansion", [Set.CoastalTides]),
  new Card("Bullet Train",         "Train",            [Set.Trains]),
  new Card("Charitable Support",   "Action",           [Set.RisingSun]),
  new Card("Collaboration",        "Rail Laying",       [Set.Trains]),
  new Card("Command Central",      "Action",           [Set.Trains]),
  new Card("Commuter Train",       "Train",            [Set.RisingSun]),
  new Card("Conductor’s Station",  "Action",           [Set.Trains]),
  new Card("Consolidation",        "Action",           [Set.CoastalTides]),
  new Card("Control Room",         "Action",           [Set.Trains]),
  new Card("Corporate Rate",       "Action",           [Set.CoastalTides]),
  new Card("Dispatcher",           "Action",           [Set.RisingSun]),
  new Card("Distant Partners",     "Rail Laying",       [Set.RisingSun]),
  new Card("Distribution Center",  "Victory Points",    [Set.RisingSun]).withBase(),
  new Card("Dump Site",            "Action",           [Set.Trains]),
  new Card("Early Train",          "Train",            [Set.Trains]),
  new Card("Effective Plan",       "Action",           [Set.CoastalTides]),
  new Card("Engine Terminal",      "Victory Points",    [Set.CoastalTides]),
  new Card("Engineer",             "Action",           [Set.RisingSun]),
  new Card("Experimental Train",   "Train",            [Set.RisingSun]),
  new Card("Express Train",        "Train",            [Set.Trains, Set.RisingSun]).withBase(),
  new Card("Extra Laborers",       "Action",           [Set.RisingSun]),
  new Card("Freight Train",        "Train",            [Set.Trains]),
  new Card("Garage",               "Action",           [Set.Trains]),
  new Card("Government Subsidy",   "Rail Laying",       [Set.RisingSun]),
  new Card("High Demand",          "Action",           [Set.CoastalTides]),
  new Card("Holiday Timetable",    "Action",           [Set.Trains]),
  new Card("Incinerator",          "Action",           [Set.RisingSun]),
  new Card("Information Central",  "Action",           [Set.Trains]),
  new Card("Interchange",          "Rail Laying",       [Set.RisingSun]),
  new Card("Inter-City Train",     "Train",            [Set.CoastalTides]),
  new Card("Ironworks",            "Action",           [Set.Trains]),
  new Card("Junkyard",             "Action",           [Set.RisingSun]),
  new Card("Landfill",             "Action",           [Set.Trains]),
  new Card("Lay Rails",            "Rail Laying",       [Set.Trains, Set.RisingSun]).withBase(),
  new Card("Legal Counsel",        "Attack",           [Set.RisingSun]),
  new Card("Limited Express Train","Train",            [Set.Trains]).withBase(),
  new Card("Limited Partnership",  "Action",           [Set.RisingSun]),
  new Card("Maglev Train",         "Train",            [Set.CoastalTides]),
  new Card("Mail Train",           "Train",            [Set.Trains]),
  new Card("Maintenance Factory",  "Action",           [Set.Trains]),
  new Card("Mining Train",         "Train",            [Set.RisingSun]).withBase(),
  new Card("Monorail",             "Train",            [Set.RisingSun]).withBase(),
  new Card("Multi-Unit Train",     "Train",            [Set.CoastalTides]),
  new Card("Normal Train",         "Train",            [Set.Trains, Set.RisingSun]).withBase(),
  new Card("Novelty Train",        "Train",            [Set.CoastalTides]),
  new Card("Office Building",      "Victory Points",    [Set.RisingSun]).withBase(),
  new Card("Outdated Train",       "Train",            [Set.RisingSun]).withBase(),
  new Card("Overbuilding",         "Station Expansion", [Set.CoastalTides]),
  new Card("Passing Station",      "Action",           [Set.Trains]),
  new Card("Politician",           "Attack",           [Set.RisingSun]),
  new Card("Productivity",         "Action",           [Set.CoastalTides]),
  new Card("Protesters",           "Attack",           [Set.RisingSun]),
  new Card("Pulling",              "Action",           [Set.Trains]),
  new Card("Reclamation Depot",    "Action",           [Set.RisingSun]),
  new Card("Recycling Center",     "Action",           [Set.RisingSun]),
  new Card("Regulations",          "Attack",           [Set.RisingSun]),
  new Card("Return Train",         "Train",            [Set.CoastalTides]),
  new Card("Roundhouse",           "Attack",           [Set.RisingSun]),
  new Card("Ruralization",         "Station Expansion", [Set.CoastalTides]),
  new Card("Scenic Route",         "Rail Laying",       [Set.CoastalTides]),
  new Card("Sea Bridge",           "Rail Laying",       [Set.CoastalTides]),
  new Card("Signaling Area",       "Action",           [Set.Trains]),
  new Card("Signals",              "Action",           [Set.Trains]),
  new Card("Skyscraper",           "Victory Points",    [Set.Trains]).withBase(),
  new Card("Stadium",              "Victory Points",    [Set.RisingSun]).withBase(),
  new Card("Station Crew",         "Action",           [Set.Trains]),
  new Card("Station Expansion",    "Station Expansion", [Set.Trains, Set.RisingSun]).withBase(),
  new Card("Stationmaster Office", "Action",           [Set.Trains]),
  new Card("Steel Bridge",         "Rail Laying",       [Set.Trains]),
  new Card("Strategy Meeting",     "Action",           [Set.RisingSun]),
  new Card("Streetcar",            "Train",            [Set.CoastalTides]),
  new Card("Subway Excavation",    "Rail Laying",       [Set.Trains]),
  new Card("Surveyor",             "Action",           [Set.RisingSun]),
  new Card("Switchback",           "Action",           [Set.Trains]),
  new Card("Temporary Timetable",  "Action",           [Set.Trains]),
  new Card("Tourist Train",        "Train",            [Set.Trains]),
  new Card("Tower",                "Victory Points",    [Set.Trains]).withBase(),
  new Card("Trail Blazer",         "Rail Laying",       [Set.RisingSun]),
  new Card("Tunnel",               "Rail Laying",       [Set.Trains]),
  new Card("Unhappy Passengers",   "Attack",           [Set.RisingSun]),
  new Card("Union Contract",       "Station Expansion", [Set.CoastalTides]),
  new Card("Upgrade",              "Action",           [Set.RisingSun]),
  new Card("Viaduct",              "Rail Laying",       [Set.Trains]),
  new Card("Vice President",       "Action",           [Set.CoastalTides]),
  new Card("Wagon Factory",        "Action",           [Set.Trains]),
  new Card("Waste",                "Waste",            [Set.Trains, Set.RisingSun]).withBase(),
  new Card("Yardmaster",           "Action",           [Set.RisingSun]),
];

export function lookupCard(name: String): Card | undefined {
  return CARDS.find(x => x.name === name);
}

export function lookupCardOrThrow(name: String): Card {
  const card = lookupCard(name);
  if (card) {
    return card;
  }
  throw new Error(`Card ${name} not found`);
}

