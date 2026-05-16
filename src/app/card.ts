export const SETS = ['tr', 'rs', 'ct'] as const;
export type Set = typeof SETS[number];

export const TYPES = ["Train", "Action", "Attack", "Rail Laying", "Station Expansion", "Victory Points", "Waste"] as const;
export type Type = typeof TYPES[number];

export type Card = {
  // Stable URL/wire identifier. Format: <SET><NN> where SET is the
  // uppercase first entry in `sets` and NN is a zero-padded ordinal
  // within that prefix. Never displayed in the UI. Don't reorder or
  // reuse existing IDs — that would break shared URLs.
  id: string;
  name: string;
  type: Type;
  sets: Set[];
  // When true, this is one of the base cards included in both Trains and Rising Sun.
  base?: boolean;
}

export const CARDS: Card[] = [
  {id: "TR01", name: "Amusement Park", type: "Action", sets: [ 'tr' ]},
  {id: "TR02", name: "Apartment", type: "Victory Points", sets: [ 'tr' ], base: true},
  {id: "CT01", name: "Banker", type: "Action", sets: [ 'ct' ]},
  {id: "CT02", name: "Barge Terminal", type: "Victory Points", sets: [ 'ct' ]},
  {id: "RS01", name: "BioFuel Train", type: "Train", sets: [ 'rs' ]},
  {id: "CT03", name: "Building Boom", type: "Station Expansion", sets: [ 'ct' ]},
  {id: "TR03", name: "Bullet Train", type: "Train", sets: [ 'tr' ]},
  {id: "RS02", name: "Charitable Support", type: "Action", sets: [ 'rs' ]},
  {id: "TR04", name: "Collaboration", type: "Rail Laying", sets: [ 'tr' ]},
  {id: "TR05", name: "Command Central", type: "Action", sets: [ 'tr' ]},
  {id: "RS03", name: "Commuter Train", type: "Train", sets: [ 'rs' ]},
  {id: "TR06", name: "Conductor’s Station", type: "Action", sets: [ 'tr' ]},
  {id: "CT04", name: "Consolidation", type: "Action", sets: [ 'ct' ]},
  {id: "TR07", name: "Control Room", type: "Action", sets: [ 'tr' ]},
  {id: "CT05", name: "Corporate Rate", type: "Action", sets: [ 'ct' ]},
  {id: "RS04", name: "Dispatcher", type: "Action", sets: [ 'rs' ]},
  {id: "RS05", name: "Distant Partners", type: "Rail Laying", sets: [ 'rs' ]},
  {id: "RS06", name: "Distribution Center", type: "Victory Points", sets: [ 'rs' ], base: true},
  {id: "TR08", name: "Dump Site", type: "Action", sets: [ 'tr' ]},
  {id: "TR09", name: "Early Train", type: "Train", sets: [ 'tr' ]},
  {id: "CT06", name: "Effective Plan", type: "Action", sets: [ 'ct' ]},
  {id: "CT07", name: "Engine Terminal", type: "Victory Points", sets: [ 'ct' ]},
  {id: "RS07", name: "Engineer", type: "Action", sets: [ 'rs' ]},
  {id: "RS08", name: "Experimental Train", type: "Train", sets: [ 'rs' ]},
  {id: "TR10", name: "Express Train", type: "Train", sets: [ 'tr', 'rs' ], base: true},
  {id: "RS09", name: "Extra Laborers", type: "Action", sets: [ 'rs' ]},
  {id: "TR11", name: "Freight Train", type: "Train", sets: [ 'tr' ]},
  {id: "TR12", name: "Garage", type: "Action", sets: [ 'tr' ]},
  {id: "RS10", name: "Government Subsidy", type: "Rail Laying", sets: [ 'rs' ]},
  {id: "CT08", name: "High Demand", type: "Action", sets: [ 'ct' ]},
  {id: "TR13", name: "Holiday Timetable", type: "Action", sets: [ 'tr' ]},
  {id: "RS11", name: "Incinerator", type: "Action", sets: [ 'rs' ]},
  {id: "TR14", name: "Information Central", type: "Action", sets: [ 'tr' ]},
  {id: "RS12", name: "Interchange", type: "Rail Laying", sets: [ 'rs' ]},
  {id: "CT09", name: "Inter-City Train", type: "Train", sets: [ 'ct' ]},
  {id: "TR15", name: "Ironworks", type: "Action", sets: [ 'tr' ]},
  {id: "RS13", name: "Junkyard", type: "Action", sets: [ 'rs' ]},
  {id: "TR16", name: "Landfill", type: "Action", sets: [ 'tr' ]},
  {id: "TR17", name: "Lay Rails", type: "Rail Laying", sets: [ 'tr', 'rs' ], base: true},
  {id: "RS14", name: "Legal Counsel", type: "Attack", sets: [ 'rs' ]},
  {id: "TR18", name: "Limited Express Train", type: "Train", sets: [ 'tr' ], base: true},
  {id: "RS15", name: "Limited Partnership", type: "Action", sets: [ 'rs' ]},
  {id: "CT10", name: "Maglev Train", type: "Train", sets: [ 'ct' ]},
  {id: "TR19", name: "Mail Train", type: "Train", sets: [ 'tr' ]},
  {id: "TR20", name: "Maintenance Factory", type: "Action", sets: [ 'tr' ]},
  {id: "RS16", name: "Mining Train", type: "Train", sets: [ 'rs' ]},
  {id: "RS17", name: "Monorail", type: "Train", sets: [ 'rs' ]},
  {id: "CT11", name: "Multi-Unit Train", type: "Train", sets: [ 'ct' ]},
  {id: "TR21", name: "Normal Train", type: "Train", sets: [ 'tr', 'rs' ], base: true},
  {id: "CT12", name: "Novelty Train", type: "Train", sets: [ 'ct' ]},
  {id: "RS18", name: "Office Building", type: "Victory Points", sets: [ 'rs' ], base: true},
  {id: "RS19", name: "Outdated Train", type: "Train", sets: [ 'rs' ], base: true},
  {id: "CT13", name: "Overbuilding", type: "Station Expansion", sets: [ 'ct' ]},
  {id: "TR22", name: "Passing Station", type: "Action", sets: [ 'tr' ]},
  {id: "RS20", name: "Politician", type: "Attack", sets: [ 'rs' ]},
  {id: "CT14", name: "Productivity", type: "Action", sets: [ 'ct' ]},
  {id: "RS21", name: "Protesters", type: "Attack", sets: [ 'rs' ]},
  {id: "TR23", name: "Pulling", type: "Action", sets: [ 'tr' ]},
  {id: "RS22", name: "Reclamation Depot", type: "Action", sets: [ 'rs' ]},
  {id: "RS23", name: "Recycling Center", type: "Action", sets: [ 'rs' ]},
  {id: "RS24", name: "Regulations", type: "Attack", sets: [ 'rs' ]},
  {id: "CT15", name: "Return Train", type: "Train", sets: [ 'ct' ]},
  {id: "RS25", name: "Roundhouse", type: "Attack", sets: [ 'rs' ]},
  {id: "CT16", name: "Ruralization", type: "Station Expansion", sets: [ 'ct' ]},
  {id: "CT17", name: "Scenic Route", type: "Rail Laying", sets: [ 'ct' ]},
  {id: "CT18", name: "Sea Bridge", type: "Rail Laying", sets: [ 'ct' ]},
  {id: "TR24", name: "Signaling Area", type: "Action", sets: [ 'tr' ]},
  {id: "TR25", name: "Signals", type: "Action", sets: [ 'tr' ]},
  {id: "TR26", name: "Skyscraper", type: "Victory Points", sets: [ 'tr' ], base: true},
  {id: "RS26", name: "Stadium", type: "Victory Points", sets: [ 'rs' ], base: true},
  {id: "TR27", name: "Station Crew", type: "Action", sets: [ 'tr' ]},
  {id: "TR28", name: "Station Expansion", type: "Station Expansion", sets: [ 'tr', 'rs' ], base: true},
  {id: "TR29", name: "Stationmaster Office", type: "Action", sets: [ 'tr' ]},
  {id: "TR30", name: "Steel Bridge", type: "Rail Laying", sets: [ 'tr' ]},
  {id: "RS27", name: "Strategy Meeting", type: "Action", sets: [ 'rs' ]},
  {id: "CT19", name: "Streetcar", type: "Train", sets: [ 'ct' ]},
  {id: "TR31", name: "Subway Excavation", type: "Rail Laying", sets: [ 'tr' ]},
  {id: "RS28", name: "Surveyor", type: "Action", sets: [ 'rs' ]},
  {id: "TR32", name: "Switchback", type: "Action", sets: [ 'tr' ]},
  {id: "TR33", name: "Temporary Timetable", type: "Action", sets: [ 'tr' ]},
  {id: "TR34", name: "Tourist Train", type: "Train", sets: [ 'tr' ]},
  {id: "TR35", name: "Tower", type: "Victory Points", sets: [ 'tr' ], base: true},
  {id: "RS29", name: "Trail Blazer", type: "Rail Laying", sets: [ 'rs' ]},
  {id: "TR36", name: "Tunnel", type: "Rail Laying", sets: [ 'tr' ]},
  {id: "RS30", name: "Unhappy Passengers", type: "Attack", sets: [ 'rs' ]},
  {id: "CT20", name: "Union Contract", type: "Station Expansion", sets: [ 'ct' ]},
  {id: "RS31", name: "Upgrade", type: "Action", sets: [ 'rs' ]},
  {id: "TR37", name: "Viaduct", type: "Rail Laying", sets: [ 'tr' ]},
  {id: "CT21", name: "Vice President", type: "Action", sets: [ 'ct' ]},
  {id: "TR38", name: "Wagon Factory", type: "Action", sets: [ 'tr' ]},
  {id: "TR39", name: "Waste", type: "Waste", sets: [ 'tr', 'rs' ], base: true},
  {id: "RS32", name: "Yardmaster", type: "Action", sets: [ 'rs' ]},
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

export function lookupCardById(id: string): Card | undefined {
  return CARDS.find(x => x.id === id);
}
