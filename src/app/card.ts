export const SETS = ['tr', 'rs', 'ct'] as const;
export type Set = typeof SETS[number];

export const TYPES = ["Train", "Action", "Attack", "Rail Laying", "Station Expansion", "Victory Points", "Waste"] as const;
export type Type = typeof TYPES[number];

export type Card = {
  name: string;
  type: Type;
  sets: Set[];
  // When true, this is one of the base cards included in both Trains and Rising Sun.
  base?: boolean;
}

export const CARDS: Card[] = [
  {name: "Amusement Park", type: "Action", sets: [ 'tr' ]},
  {name: "Apartment", type: "Victory Points", sets: [ 'tr' ], base: true},
  {name: "Banker", type: "Action", sets: [ 'ct' ]},
  {name: "Barge Terminal", type: "Victory Points", sets: [ 'ct' ]},
  {name: "BioFuel Train", type: "Train", sets: [ 'rs' ]},
  {name: "Building Boom", type: "Station Expansion", sets: [ 'ct' ]},
  {name: "Bullet Train", type: "Train", sets: [ 'tr' ]},
  {name: "Charitable Support", type: "Action", sets: [ 'rs' ]},
  {name: "Collaboration", type: "Rail Laying", sets: [ 'tr' ]},
  {name: "Command Central", type: "Action", sets: [ 'tr' ]},
  {name: "Commuter Train", type: "Train", sets: [ 'rs' ]},
  {name: "Conductor’s Station", type: "Action", sets: [ 'tr' ]},
  {name: "Consolidation", type: "Action", sets: [ 'ct' ]},
  {name: "Control Room", type: "Action", sets: [ 'tr' ]},
  {name: "Corporate Rate", type: "Action", sets: [ 'ct' ]},
  {name: "Dispatcher", type: "Action", sets: [ 'rs' ]},
  {name: "Distant Partners", type: "Rail Laying", sets: [ 'rs' ]},
  {name: "Distribution Center", type: "Victory Points", sets: [ 'rs' ], base: true},
  {name: "Dump Site", type: "Action", sets: [ 'tr' ]},
  {name: "Early Train", type: "Train", sets: [ 'tr' ]},
  {name: "Effective Plan", type: "Action", sets: [ 'ct' ]},
  {name: "Engine Terminal", type: "Victory Points", sets: [ 'ct' ]},
  {name: "Engineer", type: "Action", sets: [ 'rs' ]},
  {name: "Experimental Train", type: "Train", sets: [ 'rs' ]},
  {name: "Express Train", type: "Train", sets: [ 'tr', 'rs' ], base: true},
  {name: "Extra Laborers", type: "Action", sets: [ 'rs' ]},
  {name: "Freight Train", type: "Train", sets: [ 'tr' ]},
  {name: "Garage", type: "Action", sets: [ 'tr' ]},
  {name: "Government Subsidy", type: "Rail Laying", sets: [ 'rs' ]},
  {name: "High Demand", type: "Action", sets: [ 'ct' ]},
  {name: "Holiday Timetable", type: "Action", sets: [ 'tr' ]},
  {name: "Incinerator", type: "Action", sets: [ 'rs' ]},
  {name: "Information Central", type: "Action", sets: [ 'tr' ]},
  {name: "Interchange", type: "Rail Laying", sets: [ 'rs' ]},
  {name: "Inter-City Train", type: "Train", sets: [ 'ct' ]},
  {name: "Ironworks", type: "Action", sets: [ 'tr' ]},
  {name: "Junkyard", type: "Action", sets: [ 'rs' ]},
  {name: "Landfill", type: "Action", sets: [ 'tr' ]},
  {name: "Lay Rails", type: "Rail Laying", sets: [ 'tr', 'rs' ], base: true},
  {name: "Legal Counsel", type: "Attack", sets: [ 'rs' ]},
  {name: "Limited Express Train", type: "Train", sets: [ 'tr' ], base: true},
  {name: "Limited Partnership", type: "Action", sets: [ 'rs' ]},
  {name: "Maglev Train", type: "Train", sets: [ 'ct' ]},
  {name: "Mail Train", type: "Train", sets: [ 'tr' ]},
  {name: "Maintenance Factory", type: "Action", sets: [ 'tr' ]},
  {name: "Mining Train", type: "Train", sets: [ 'rs' ], base: true},
  {name: "Monorail", type: "Train", sets: [ 'rs' ], base: true},
  {name: "Multi-Unit Train", type: "Train", sets: [ 'ct' ]},
  {name: "Normal Train", type: "Train", sets: [ 'tr', 'rs' ], base: true},
  {name: "Novelty Train", type: "Train", sets: [ 'ct' ]},
  {name: "Office Building", type: "Victory Points", sets: [ 'rs' ], base: true},
  {name: "Outdated Train", type: "Train", sets: [ 'rs' ], base: true},
  {name: "Overbuilding", type: "Station Expansion", sets: [ 'ct' ]},
  {name: "Passing Station", type: "Action", sets: [ 'tr' ]},
  {name: "Politician", type: "Attack", sets: [ 'rs' ]},
  {name: "Productivity", type: "Action", sets: [ 'ct' ]},
  {name: "Protesters", type: "Attack", sets: [ 'rs' ]},
  {name: "Pulling", type: "Action", sets: [ 'tr' ]},
  {name: "Reclamation Depot", type: "Action", sets: [ 'rs' ]},
  {name: "Recycling Center", type: "Action", sets: [ 'rs' ]},
  {name: "Regulations", type: "Attack", sets: [ 'rs' ]},
  {name: "Return Train", type: "Train", sets: [ 'ct' ]},
  {name: "Roundhouse", type: "Attack", sets: [ 'rs' ]},
  {name: "Ruralization", type: "Station Expansion", sets: [ 'ct' ]},
  {name: "Scenic Route", type: "Rail Laying", sets: [ 'ct' ]},
  {name: "Sea Bridge", type: "Rail Laying", sets: [ 'ct' ]},
  {name: "Signaling Area", type: "Action", sets: [ 'tr' ]},
  {name: "Signals", type: "Action", sets: [ 'tr' ]},
  {name: "Skyscraper", type: "Victory Points", sets: [ 'tr' ], base: true},
  {name: "Stadium", type: "Victory Points", sets: [ 'rs' ], base: true},
  {name: "Station Crew", type: "Action", sets: [ 'tr' ]},
  {name: "Station Expansion", type: "Station Expansion", sets: [ 'tr', 'rs' ], base: true},
  {name: "Stationmaster Office", type: "Action", sets: [ 'tr' ]},
  {name: "Steel Bridge", type: "Rail Laying", sets: [ 'tr' ]},
  {name: "Strategy Meeting", type: "Action", sets: [ 'rs' ]},
  {name: "Streetcar", type: "Train", sets: [ 'ct' ]},
  {name: "Subway Excavation", type: "Rail Laying", sets: [ 'tr' ]},
  {name: "Surveyor", type: "Action", sets: [ 'rs' ]},
  {name: "Switchback", type: "Action", sets: [ 'tr' ]},
  {name: "Temporary Timetable", type: "Action", sets: [ 'tr' ]},
  {name: "Tourist Train", type: "Train", sets: [ 'tr' ]},
  {name: "Tower", type: "Victory Points", sets: [ 'tr' ], base: true},
  {name: "Trail Blazer", type: "Rail Laying", sets: [ 'rs' ]},
  {name: "Tunnel", type: "Rail Laying", sets: [ 'tr' ]},
  {name: "Unhappy Passengers", type: "Attack", sets: [ 'rs' ]},
  {name: "Union Contract", type: "Station Expansion", sets: [ 'ct' ]},
  {name: "Upgrade", type: "Action", sets: [ 'rs' ]},
  {name: "Viaduct", type: "Rail Laying", sets: [ 'tr' ]},
  {name: "Vice President", type: "Action", sets: [ 'ct' ]},
  {name: "Wagon Factory", type: "Action", sets: [ 'tr' ]},
  {name: "Waste", type: "Waste", sets: [ 'tr', 'rs' ], base: true},
  {name: "Yardmaster", type: "Action", sets: [ 'rs' ]},
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

