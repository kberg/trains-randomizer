export enum Set {
  Trains,
  RisingSun
}

export enum Type {
  Action = "Action",
  RailLaying = "Rail Laying",
  StationExpansion = "Station Expansion",
  Train = "Train",
  VictoryPoints = "Victory Points",
  Waste = "Waste"
}

export class Card {
  name: string;
  type: Type;
  sets: Set[];
  base: boolean;

  constructor(name: string, type: Type, sets: Set[], base?: boolean) {
    this.name = name;
    this.type = type;
    this.sets = sets;
    this.base = base;
  }
}

export const CARDS: Card[] = [
  new Card("Amusement Park",       Type.Action,           [Set.Trains]),
  new Card("Apartment",            Type.VictoryPoints,    [Set.Trains], true),
  new Card("BioFuel Train",        Type.Train,            [Set.RisingSun]),
  new Card("Bullet Train",         Type.Train,            [Set.Trains]),
  new Card("Charitable Support",   Type.Action,           [Set.RisingSun]),
  new Card("Collaboration",        Type.RailLaying,       [Set.Trains]),
  new Card("Command Central",      Type.Action,           [Set.Trains]),
  new Card("Commuter Train",       Type.Train,            [Set.RisingSun]),
  new Card("Conductor’s Station",  Type.Action,           [Set.Trains]),
  new Card("Control Room",         Type.Action,           [Set.Trains]),
  new Card("Dispatcher",           Type.Action,           [Set.RisingSun]),
  new Card("Distant Partners",     Type.RailLaying,       [Set.RisingSun]),
  new Card("Distribution Center",  Type.VictoryPoints,    [Set.RisingSun], true),
  new Card("Dump Site",            Type.Action,           [Set.Trains]),
  new Card("Early Train",          Type.Train,            [Set.Trains]),
  new Card("Engineer",             Type.Action,           [Set.RisingSun]),
  new Card("Experimental Train",   Type.Train,            [Set.RisingSun]),
  new Card("Express Train",        Type.Train,            [Set.Trains, Set.RisingSun], true),
  new Card("Extra Laborers",       Type.Action,           [Set.RisingSun]),
  new Card("Freight Train",        Type.Train,            [Set.Trains]),
  new Card("Garage",               Type.Action,           [Set.Trains]),
  new Card("Government Subsidy",   Type.RailLaying,       [Set.RisingSun]),
  new Card("Holiday Timetable",    Type.Action,           [Set.Trains]),
  new Card("Incinerator",          Type.Action,           [Set.RisingSun]),
  new Card("Information Central",  Type.Action,           [Set.Trains]),
  new Card("Interchange",          Type.RailLaying,       [Set.RisingSun]),
  new Card("Ironworks",            Type.Action,           [Set.Trains]),
  new Card("Junkyard",             Type.Action,           [Set.RisingSun]),
  new Card("Landfill",             Type.Action,           [Set.Trains]),
  new Card("Lay Rails",            Type.RailLaying,       [Set.Trains, Set.RisingSun], true),
  new Card("Legal Counsel",        Type.Action,           [Set.RisingSun]),
  new Card("Limited Express Train",Type.Train,            [Set.Trains], true),
  new Card("Limited Partnership",  Type.Action,           [Set.RisingSun]),
  new Card("Mail Train",           Type.Train,            [Set.Trains]),
  new Card("Maintenance Factory",  Type.Action,           [Set.Trains]),
  new Card("Mining Train",         Type.Train,            [Set.RisingSun], true),
  new Card("Monorail",             Type.Train,            [Set.RisingSun], true),
  new Card("Normal Train",         Type.Train,            [Set.Trains, Set.RisingSun], true),
  new Card("Office Building",      Type.VictoryPoints,    [Set.RisingSun], true),
  new Card("Outdated Train",       Type.Train,            [Set.RisingSun], true),
  new Card("Passing Station",      Type.Action,           [Set.Trains]),
  new Card("Politician",           Type.Action,           [Set.RisingSun]),
  new Card("Protesters",           Type.Action,           [Set.RisingSun]),
  new Card("Pulling",              Type.Action,           [Set.Trains]),
  new Card("Reclamation Depot",    Type.Action,           [Set.RisingSun]),
  new Card("Recycling Center",     Type.Action,           [Set.RisingSun]),
  new Card("Regulations",          Type.Action,           [Set.RisingSun]),
  new Card("Roundhouse",           Type.Action,           [Set.RisingSun]),
  new Card("Signaling Area",       Type.Action,           [Set.Trains]),
  new Card("Signals",              Type.Action,           [Set.Trains]),
  new Card("Skyscraper",           Type.VictoryPoints,    [Set.Trains], true),
  new Card("Stadium",              Type.VictoryPoints,    [Set.RisingSun], true),
  new Card("Station Crew",         Type.Action,           [Set.Trains]),
  new Card("Station Expansion",    Type.StationExpansion, [Set.Trains, Set.RisingSun], true),
  new Card("Stationmaster Office", Type.Action,           [Set.Trains]),
  new Card("Steel Bridge",         Type.RailLaying,       [Set.Trains]),
  new Card("Strategy Meeting",     Type.Action,           [Set.RisingSun]),
  new Card("Subway Excavation",    Type.RailLaying,       [Set.Trains]),
  new Card("Surveyor",             Type.Action,           [Set.RisingSun]),
  new Card("Switchback",           Type.Action,           [Set.Trains]),
  new Card("Temporary Timetable",  Type.Action,           [Set.Trains]),
  new Card("Tourist Train",        Type.Train,            [Set.Trains]),
  new Card("Tower",                Type.VictoryPoints,    [Set.Trains], true),
  new Card("Trail Blazer",         Type.RailLaying,       [Set.RisingSun]),
  new Card("Tunnel",               Type.RailLaying,       [Set.Trains]),
  new Card("Unhappy Passengers",   Type.Action,           [Set.RisingSun]),
  new Card("Upgrade",              Type.Action,           [Set.RisingSun]),
  new Card("Viaduct",              Type.RailLaying,       [Set.Trains]),
  new Card("Wagon Factory",        Type.Action,           [Set.Trains]),
  new Card("Waste",                Type.Waste,            [Set.Trains, Set.RisingSun], true),
  new Card("Yardmaster",           Type.Action,           [Set.RisingSun]),
];

export function lookupCard(name: String) {
  return CARDS.filter(x => x.name === name)[0];
}
