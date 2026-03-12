import { Set, Card, lookupCard, lookupCardOrThrow } from "./card";

// Recommended presets at https://boardgamegeek.com/thread/1042058/starting-card-setups-official-and-unofficial-list

export type Preset = {
  set: Set;
  name: string;
  cards: Card[];
}

function toCards(...names: Array<string>): Array<Card> {
  return names.map(lookupCardOrThrow);
}

export const PRESETS = [
  {
    set: 'tr',
    name: "Beginner / Tokyo",
    cards: toCards(
      "Landfill",
      "Conductor's Station",
      "Holiday Timetable",
      "Passing station",
      "Amusement Park",
      "Steel Bridge",
      "Dump Site",
      "Maintenance Factory"
    )
  },
  {
    set: 'tr',
    name: "Beginner / Osaka",
    cards: toCards(
      "Landfill",
      "Bullet Train",
      "Garage",
      "Tourist Train",
      "Ironworks",
      "Stationmaster's Office",
      "Tunnel",
      "Temporary Timetable"
    )
  },
  {
    set: 'tr',
    name: "Reforming and Tunneling",
    cards: toCards(
      "Signals",
      "Pulling",
      "Information Central",
      "Freight Train",
      "Wagon Factory",
      "Early train",
      "Signaling Area",
      "Subway Excavation"
    )
  },
  {
    set: 'tr',
    name: "Holiday Pass",
    cards: toCards(
      "Landfill",
      "Station Crew",
      "Holiday Timetable",
      "Tourist Train",
      "Mail train",
      "Viaduct",
      "Maintenance Factory",
      "Control Room"
    )
  },
  {
    set: 'tr',
    name: "Sample Book Setup",
    cards: toCards(
      /* Holiday Pass? */
      "Landfill",
      "Station Crew",
      "Holiday Timetable",
      "Tourist Train",
      "Mail train",
      "Viaduct",
      "Maintenance Factory",
      "Control Room"
    )
  },
  {
    set: 'rs',
    name: "Beginner",
    cards: toCards(
      "Biofuel Train",
      "Outdated Train",
      "Distant Partners",
      "Engineer",
      "Junk Yard",
      "Limited Partnership",
      "Strategy Meeting",
      "Upgrade"
    )
  },
  {
    set: 'rs',
    name: "Experienced",
    cards: toCards(
      "Experimental Train",
      "Outdated Train",
      "Government Subsidy",
      "Legal Counsel",
      "Recycling Center",
      "Regulations",
      "Roundhouse",
      "Yardmaster"
    )
  }
];
