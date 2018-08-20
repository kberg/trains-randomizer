import { Set, Card, lookupCard } from "./card";

// Recommended presets at https://boardgamegeek.com/thread/1042058/starting-card-setups-official-and-unofficial-list

export class Preset {
  set: Set;
  name: string;
  cards: Card[]
  constructor(
    set: Set,
    name: string,
    cardNames: string[]) {
    this.set = set;
    this.name = name;
    this.cards = cardNames.map(lookupCard);
  }
}

export const PRESETS = [
  new Preset(Set.Trains, "Beginner / Tokyo", [
    "Landfill",
    "Conductor's Station",
    "Holiday Timetable",
    "Passing station",
    "Amusement Park",
    "Steel Bridge",
    "Dump Site",
    "Maintenance Factory"
  ]),
  new Preset(Set.Trains, "Beginner / Osaka", [
    "Landfill",
    "Bullet Train",
    "Garage",
    "Tourist Train",
    "Ironworks",
    "Stationmaster's Office",
    "Tunnel",
    "Temporary Timetable"
  ]),
  new Preset(Set.Trains, "Reforming and Tunneling", [
    "Signals",
    "Pulling",
    "Information Central",
    "Freight Train",
    "Wagon Factory",
    "Early train",
    "Signaling Area",
    "Subway Excavation"
  ]),
  new Preset(Set.Trains, "Holiday Pass", [
    "Landfill",
    "Station Crew",
    "Holiday Timetable",
    "Tourist Train",
    "Mail train",
    "Viaduct",
    "Maintenance Factory",
    "Control Room"
  ]),
  new Preset(Set.Trains, "Sample Book Setup", [
    /* Holiday Pass? */
    "Landfill",
    "Station Crew",
    "Holiday Timetable",
    "Tourist Train",
    "Mail train",
    "Viaduct",
    "Maintenance Factory",
    "Control Room"
  ]),
  new Preset(Set.RisingSun, "Beginner", [
    "Biofuel Train",
    "Outdated Train",
    "Distant Partners",
    "Engineer",
    "Junk Yard",
    "Limited Partnership",
    "Strategy Meeting",
    "Upgrade"]),
  new Preset(Set.RisingSun, "Experienced", [
    "Experimental Train",
    "Outdated Train",
    "Government Subsidy",
    "Legal Counsel",
    "Recycling Center",
    "Regulations",
    "Roundhouse",
    "Yardmaster"
  ])
];
